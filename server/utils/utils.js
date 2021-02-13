function getRange(valOne, valTwo) {
   return Number(valOne) > Number(valTwo) ?
      Number(valOne) - Number(valTwo) :
      Number(valTwo) - Number(valOne)
}

module.exports = {
   getRange
}