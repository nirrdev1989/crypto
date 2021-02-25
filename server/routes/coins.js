const router = require('express').Router()
const axios = require('axios')
const { getRange, convertToDate, convertTotime, fixNumber, unixTimestamp } = require('../utils/utils')
const apiService = require('../api/api.service')
const headers = require('../api/headers')
const COIN_INFO = require('../services/coins')
const DB_SERVICE = require('../services/db')


router.get('/coin-range/:id/:name', async (request, response, next) => {
   const name = request.params.name.toLowerCase().replace(/\s/g, '')
   const id = request.params.id
   const qurey = request.query
   // console.log(qurey, id, name)

   const { from, to } = unixTimestamp(Number(qurey.from), Number(qurey.to))

   // const currentCoin = DB_SERVICE.getItemByName(request.params.name)
   // console.log(currentCoin)

   try {
      const coin = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}`, { headers: headers.headersCoinRankingApi })

      const result = await apiService.get(
         `https://coingecko.p.rapidapi.com/coins/${name}/market_chart/range`,
         headers.headersGeckoApi,
         {
            "from": from,
            "vs_currency": "usd",
            "to": to
         }
      )

      let history = {}
      let newArray = COIN_INFO.mapDates(result.data.prices)
      let now = new Date().getTime()

      // newArray.push({
      //    date: convertToDate(now),
      //    price: fixNumber(coin.data.data.coin.price, 3),
      //    time: convertTotime(now),
      //    timeStamp: now
      // })

      const currentCoin = {
         date: convertToDate(now),
         price: fixNumber(coin.data.data.coin.price, 3),
         time: convertTotime(now),
         timeStamp: now
      }

      const prices = COIN_INFO.prices(newArray)

      DB_SERVICE.updateItem(request.params.name, currentCoin)

      history[qurey.type] = {
         data: newArray,
         firstPrice: prices.firstPrice,
         currentPrice: prices.currentPrice,
         change: prices.change,
         changePresent: prices.changePresent,
         priceUp: prices.priceUp,
      }

      response.status(201).send({
         history: history,
         coin: coin.data.data.coin
      })

   } catch (error) {
      next(error)
   }
})

router.get('/coin-range-change/:name', async (request, response, next) => {
   const name = request.params.name.toLowerCase().replace(/\s/g, '')
   const qurey = request.query
   console.log(qurey, name)

   const { from, to } = unixTimestamp(Number(qurey.from), Number(qurey.to))
   // const currentCoin = DB_SERVICE.getItemByName(request.params.name)
   // console.log(currentCoin)

   try {
      const result = await apiService.get(
         `https://coingecko.p.rapidapi.com/coins/${name}/market_chart/range`,
         headers.headersGeckoApi,
         {
            "from": from,
            "vs_currency": "usd",
            "to": to
         }
      )

      let history = {}
      let newArray = COIN_INFO.mapDates(result.data.prices)

      // newArray.push({
      //    date: currentCoin.date,
      //    price: currentCoin.price,
      //    time: currentCoin.time,
      //    timeStamp: currentCoin.timeStamp
      // })

      const prices = COIN_INFO.prices(newArray)

      history[qurey.type] = {
         data: newArray,
         firstPrice: prices.firstPrice,
         currentPrice: prices.currentPrice,
         change: prices.change,
         changePresent: prices.changePresent,
         priceUp: prices.priceUp,
      }

      response.status(201).send({
         history: history,
         // coin: coin.data.data.coin
      })

   } catch (error) {
      next(error)
   }
})

module.exports = router