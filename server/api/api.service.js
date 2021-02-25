const axios = require('axios')

module.exports.get = async function (url, headers, params) {
   try {
      const result = await axios.get(
         url,
         {
            headers: headers,
            params: params
         },
      )
      return result
   } catch (error) {
      throw error
   }
}