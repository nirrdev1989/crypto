export function countDates(count: number): string[] {
   const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
   let datesArray: string[] = []
   let day = 1000 * 60 * 60 * 24
   let today = new Date().getTime()

   for (let i = 0; i < count; i++) {
      // console.log(new Date(today).toLocaleDateString('de-DE', options).split('/').join('.'))
      // console.log(new Date(today).toLocaleDateString('de-DE', options).split('/').join('.'))
      // if (process.env.NODE_ENV === 'production') {
      //    datesArray.push(new Date(today).toLocaleDateString('de-DE', options).split('.').join('/'))
      // } else {
      datesArray.push(new Date(today).toLocaleDateString('de-DE', options).split('/').join('.'))
      // }
      today -= day
   }
   return datesArray
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

