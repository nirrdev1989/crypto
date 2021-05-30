const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path')
const http = require('http')
const session = require('express-session')

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

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   // cookie: { secure: true },
   sameSite: 'strict'
}))

if (process.env.MODE === 'production') {
   // const helemt = require('helmet')
   const compression = require('compression')
   // app.use(helemt())
   app.use(compression())
   app.disable('x-powered-by')
}

app.use(cors())
app.use(express.json({ limit: '15kb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')));


app.use((request, response, next) => {
   console.log(new Date().toISOString())

   request.session.user = 'ok'
   next()
})

const io = require("socket.io")(server, {
   cors: {
      origin: process.env.MOD === 'production' ? process.env.PROD_URL : "*",
      methods: ["GET"],
      //   allowedHeaders: ["my-custom-header"],
      credentials: true
   }
});


io.on('connection', (socket) => {
   console.log('SOCKET CONNECTED', socket)
   let repeat
   socket.on('coinLastHistory', ({ id, name }, callBack) => {
      // console.log(id, name)
      repeat = setInterval(() => {
         axios.get(singleCoin + id, { headers: headers.headersCoinRankingApi })
            .then((result) => {

               let getCurrentCoinDB = DB_SERVICE.getItemByName(name)
               let currentPrice = fixNumber(result.data.data.coin.price, 3)
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

if (process.env.MODE === 'production') {
   app.get('/*', (request, response) => {
      response.sendFile(path.join(__dirname, 'build', 'index.html'));
   })
}

app.use(urlError)
app.use(handleApiError)

server.listen(PORT, () => {
   console.log('Server is run at: ' + PORT)
})