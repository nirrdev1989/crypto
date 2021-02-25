const db = require('../db/coins.json')
const fs = require('fs')

const DB_SERVICE = {
   DATABASE_JSON: db,
   getItemByName: function (name) {
      return this.DATABASE_JSON[name]
   },
   updateItem: function (name, newData) {
      this.DATABASE_JSON[name] = newData
      // fs.writeFileSync('../db/coins.json', JSON.stringify(this.DATABASE_JSON));
   }
}

module.exports = DB_SERVICE