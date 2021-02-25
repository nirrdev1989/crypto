function getRange(valOne, valTwo) {
   return Number(valOne) > Number(valTwo) ?
      Number(valOne) - Number(valTwo) :
      Number(valTwo) - Number(valOne)
}

function unixTimestampWithType(data) {
   let day = 60 * 1000 * 60 * 24
   let hour = 60 * 1000 * 60
   let minute = 60 * 1000
   let year = day * 365

   let checkFrom = data[0].type === 'minute' ? minute : data[0].type === 'hour' ? hour : data[0].type === 'day' ? day : year
   let checkTo = data[1].type === 'minute' ? minute : data[1].type === 'hour' ? hour : data[1].type === 'day' ? day : year

   let from = new Date().getTime() - (checkFrom * data[0].value)
   let to = new Date().getTime() - (checkTo * data[1].value)

   let F = Math.round(from / 1000);
   let T = Math.round(to / 1000)
   return {
      from: F,
      to: T
   }
}

function unixTimestamp(from, to) {
   let F = Math.round(from / 1000);
   let T = Math.round(to / 1000)
   return {
      from: F,
      to: T
   }
}

function convertToDate(dateOnTimeStamp) {

   let parts = new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Jerusalem'
   })
      .formatToParts(new Date(dateOnTimeStamp))
      .reduce((acc, part) => {
         acc[part.type] = part.value;
         return acc;
      }, Object.create(null))

   // console.log(parts)

   let date = `${parts.day}/${parts.month}/${parts.year}`;
   return date
   // const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
   // return new Date(date).toLocaleDateString('de-DE', options)
}

function convertTotime(dateOnTimeStamp) {
   let time = new Date(dateOnTimeStamp).toLocaleTimeString()
   // console.log(process.env.MODE)
   if (process.env.MODE === 'prod') {
      time = new Date(dateOnTimeStamp + (1000 * 60 * 60 * 2)).toLocaleTimeString()
   }
   return time
}

function fixNumber(val, count) {
   let num = val
   if (typeof val === 'string') {
      num = parseFloat(val)
   } else {
      num = val
   }
   return Number(num.toFixed(count))
}


module.exports = {
   getRange,
   convertToDate,
   convertTotime,
   fixNumber,
   unixTimestamp
}