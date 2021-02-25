const { convertToDate, convertTotime, fixNumber, getRange } = require("../utils/utils")

const COIN_INFO = {
   mapDates: function (array) {
      return array.map(([timestamp, price]) => {
         return {
            price: fixNumber(price, 3),
            timeStamp: timestamp,
            date: convertToDate(timestamp),
            time: convertTotime(timestamp)
         }
      })
   },
   prices: function (array) {
      let firstPrice = array[0].price
      let currentPrice = array[array.length - 1].price
      let change = getRange(firstPrice, currentPrice)
      let onePresent = firstPrice / 100
      return {
         firstPrice: firstPrice,
         currentPrice: currentPrice,
         change: change,
         onePresent: firstPrice / 100,
         changePresent: change / onePresent,
         priceUp: firstPrice < currentPrice
      }
   }
}

module.exports = COIN_INFO
