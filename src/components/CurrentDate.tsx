import React from 'react'

function CurrentDate() {
   const [date, setDate] = React.useState(new Date().toLocaleTimeString())

   React.useEffect(() => {
      setTimeout(() => {
         setDate(() => new Date().toLocaleTimeString())
      }, 1000);
   }, [date])

   return (
      <span className="current-date" style={{ color: 'white', fontWeight: 500 }}>{date}</span>
   )
}

export default CurrentDate
