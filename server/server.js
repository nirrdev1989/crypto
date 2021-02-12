const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3007

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allCoins = "https://coinranking1.p.rapidapi.com/coins"
const singleCoin = "https://coinranking1.p.rapidapi.com/coin/"
// const singleCoinHistory7Days = "https://coinranking1.p.rapidapi.com/coin/1/history/7d"

const headers = {
   "x-rapidapi-key": "133709e37cmsh2ac18e265ee566ap1c9febjsn760662dabc6e",
   "x-rapidapi-host": "coinranking1.p.rapidapi.com",
   "useQueryString": true
}


app.get('/all-coins', async (request, response) => {
   try {
      const res = await axios.get(allCoins, { headers: headers })

      response.status(200).send(res.data)
   } catch (error) {
      response.status(404).send({
         message: 'Request fail'
      })
   }
})

app.get('/coin/:id', async (request, response) => {
   const { id } = request.params
   console.log(id)


   try {
      const resCoin = await axios.get(singleCoin + id, { headers: headers })
      const res = await axios.get(singleCoin + id + "/history/7d", { headers: headers })

      const arr = res.data.data.history
      let history = {}
      let newArray = []

      for (let i = 0; i < arr.length - 1; i++) {
         let toDate = new Date(arr[i].timestamp).toLocaleDateString()
         let toDateNext = new Date(arr[i + 1].timestamp).toLocaleDateString()
         if (toDate === toDateNext) {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               array: newArray
            }
         } else {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               array: newArray
            }
            newArray = []
         }
      }

      let historyToArray = []

      for (const h of Object.values(history)) {
         historyToArray.push(h)
      }
      // console.log(history)
      // console.log(res)

      response.status(200).send({ coin: resCoin.data.data.coin, history: history })
   } catch (error) {
      console.log(error.response)
      response.status(404).send({
         message: 'Request fail'
      })
   }
})

app.get('/coin-history/:id', async (request, response) => {
   const { id } = request.params
   console.log(id)

   try {
      const res = await axios.get(singleCoin + id + "/history/7d", { headers: headers })

      const arr = res.data.data.history
      let history = {}
      let newArray = []

      for (let i = 0; i < arr.length - 1; i++) {
         let toDate = new Date(arr[i].timestamp).toLocaleDateString()
         let toDateNext = new Date(arr[i + 1].timestamp).toLocaleDateString()
         if (toDate === toDateNext) {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               array: newArray
            }
         } else {
            newArray.push({
               price: arr[i].price,
               date: toDate
            })
            history[toDate.toString()] = {
               array: newArray
            }
            newArray = []
         }
      }

      let historyToArray = []

      for (const h of Object.values(history)) {
         historyToArray.push(h)
      }
      // console.log(history)
      response.status(200).send(history)
   } catch (error) {
      response.status(404).send({
         message: 'Request fail'
      })
   }
})


app.listen(PORT, () => {
   console.log('Server is run at: ' + PORT)
})
