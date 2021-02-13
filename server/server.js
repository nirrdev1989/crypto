const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { getRange } = require('./utils/utils')
const { urlError, handleApiError } = require('./middleweres/errorHandler')
const app = express()

const PORT = process.env.PORT || 3007

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allCoins = "https://coinranking1.p.rapidapi.com/coins"
const singleCoin = "https://coinranking1.p.rapidapi.com/coin/"
// const singleCoinHistory7Days = "https://coinranking1.p.rapidapi.com/coin/1/history/7d"

const headers = {
   "x-rapidapi-key": "",
   "x-rapidapi-host": "coinranking1.p.rapidapi.com",
   "useQueryString": true
}


app.get('/all-coins', async (request, response, next) => {
   try {
      const res = await axios.get(allCoins, { headers: headers })

      response.status(200).send(res.data)
   } catch (error) {
      next(error)
   }
})



app.get('/coin/:id', async (request, response, next) => {
   const { id } = request.params

   try {
      const resCoin = await axios.get(singleCoin + id, { headers: headers })
      const res = await axios.get(singleCoin + id + "/history/7d", { headers: headers })

      const arr = res.data.data.history
      let history = {}
      let newArray = []
      let currentPrice = Number(arr[arr.length - 1].price)

      let lastPrice = Number(arr[0].price)
      let change = getRange(currentPrice, lastPrice)

      for (let i = 0; i < arr.length; i++) {
         let toDate = new Date(arr[i].timestamp).toLocaleDateString()

         let toDateNext = i === arr.length - 1 ? toDate : new Date(arr[i + 1].timestamp).toLocaleDateString()
         if (toDate === toDateNext) {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               array: newArray,
               firstPriceOfDay: Number(newArray[0].price),
               lastPriceOfDay: Number(newArray[newArray.length - 1].price),
               change: getRange(newArray[0].price, newArray[newArray.length - 1].price)
            }
         } else {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               firstPriceOfDay: Number(newArray[0].price),
               lastPriceOfDay: Number(newArray[newArray.length - 1].price),
               array: newArray,
               change: getRange(newArray[0].price, newArray[newArray.length - 1].price)
            }
            newArray = []
         }
      }
      response.status(200).send({
         coin: resCoin.data.data.coin,
         history: history,
         currentPrice: Number(currentPrice),
         lastPrice: Number(lastPrice),
         change: change
      })
   } catch (error) {
      next(error)
   }
})

app.use(urlError)
app.use(handleApiError)


app.listen(PORT, () => {
   console.log('Server is run at: ' + PORT)
})