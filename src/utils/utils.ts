export function countDates(count: number): string[] {
   // console.log(parts)
   // let date = `${parts.day}/${parts.month}/${parts.year}`;
   const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
   let datesArray: string[] = []
   let day = 1000 * 60 * 60 * 24
   let today = new Date().getTime()

   for (let i = 0; i < count; i++) {
      let parts = dateTimeFormat(today)

      // let date = new Date(today).toLocaleDateString('de-DE', options)
      // datesArray.push()
      datesArray.push(`${parts.day}/${parts.month}/${parts.year}`)
      // datesArray.push(new Date(today).toLocaleDateString('de-DE', options))
      today -= day
   }

   console.log(datesArray)
   return datesArray
}

export function dateTimeFormat(timeStemp: number) {
   return new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Jerusalem'
   })
      .formatToParts(new Date(timeStemp))
      .reduce((acc, part) => {
         acc[part.type] = part.value;
         return acc;
      }, Object.create(null))
}

export function fixNumber(val: number | string, count: number): number {
   let num = val
   if (typeof val === 'string') {
      num = parseFloat(val)
   } else {
      num = val
   }
   return Number(num.toFixed(count))
}

export function getRange(valOne: number | string, valTwo: number | string): number {
   return Number(valOne) > Number(valTwo) ?
      Number(valOne) - Number(valTwo) :
      Number(valTwo) - Number(valOne)
}

export function unixTimestamp(from: number, to: number) {
   let F = Math.round(from / 1000);
   let T = Math.round(to / 1000)
   return {
      from: F,
      to: T
   }
}


