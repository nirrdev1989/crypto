const express = require('express')
const unirest = require('unirest')
const axios = require('axios')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3007

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/all-coins', async (request, response) => {

   try {
      const res = await axios.get("https://coinranking1.p.rapidapi.com/coins", {
         headers: {
            "x-rapidapi-key": "133709e37cmsh2ac18e265ee566ap1c9febjsn760662dabc6e",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "useQueryString": true
         }
      });
      response.status(200).send(res.data)
   } catch (error) {
      response.status(400).send({
         message: 'Request fail'
      })
   }
})


app.listen(PORT, () => {
   console.log('Server is run at: ' + PORT)
})
