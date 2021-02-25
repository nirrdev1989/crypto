const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path')
const http = require('http')

require('dotenv').config()
const { fixNumber, convertToDate, convertTotime, getRange } = require('./utils/utils')
const { urlError, handleApiError } = require('./middleweres/errorHandler')
const DB_SERVICE = require('./services/db')
const coinsRouter = require('./routes/coins')
const headers = require('./api/headers')

const PORT = process.env.PORT || 3007

const app = express()
const server = http.createServer(app)

const singleCoin = "https://coinranking1.p.rapidapi.com/coin/"

app.set('trust proxy', 1)

if (process.env.MODE === 'production') {
   const helemt = require('helmet')
   app.use(helemt())
   app.disable('x-powered-by')
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')));


const io = require("socket.io")(server, {
   cors: {
      origin: "*",
      //   methods: ["GET", "POST"],
      //   allowedHeaders: ["my-custom-header"],
      //   credentials: true
   }
});


io.on('connection', (socket) => {
   console.log('SOCKET CONNECTED')
   let repeat
   socket.on('coinLastHistory', ({ id, name }, callBack) => {
      console.log(id, name)
      repeat = setInterval(() => {
         axios.get(singleCoin + id, { headers: headers.headersCoinRankingApi })
            .then((result) => {
               let getCurrentCoinDB = DB_SERVICE.getItemByName(name)
               let currentPrice = fixNumber(result.data.data.coin.price, 3)
               // console.log(currentPrice, getCurrentCoinDB)
               let change = getRange(getCurrentCoinDB.price, currentPrice)
               let onePresent = getCurrentCoinDB.price / 100
               let changePresent = change / onePresent
               let priceUp = getCurrentCoinDB < currentPrice

               let now = new Date().getTime()
               let updateDB = {
                  date: convertToDate(now),
                  price: fixNumber(currentPrice, 3),
                  time: convertTotime(now),
                  timeStamp: now
               }

               DB_SERVICE.updateItem(name, updateDB)

               callBack({
                  currentPrice: currentPrice,
                  prevPrice: getCurrentCoinDB.price,
                  change: fixNumber(change, 3),
                  changePresent: fixNumber(changePresent, 3),
                  priceUp: priceUp,
                  isPriceChange: currentPrice !== getCurrentCoinDB.price
               })
            })
      }, 10000);
   })

   socket.on('disconnect', () => {
      clearInterval(repeat)
      console.log('SOCKET DISCONNECT')
   })
})



app.use('/coins', coinsRouter)

if (process.env.MODE === 'prod') {
   app.get('/*', (request, response) => {
      response.sendFile(path.join(__dirname, 'build', 'index.html'));
   })
}

app.use(urlError)
app.use(handleApiError)

server.listen(PORT, () => {
   console.log('Server is run at: ' + PORT)
})