import React from 'react'
import { isoDateGetTime } from "../utils/utils";
function CurrentDate() {

   const [date, setDate] = React.useState(isoDateGetTime(new Date().toISOString()))

   React.useEffect(() => {
      setTimeout(() => {
         setDate(() => isoDateGetTime(new Date().toISOString()))
      }, 1000);
   }, [date])

   return (
      <span className="current-date" style={{ color: 'rgb(240, 28, 99)', fontWeight: 500 }}>US TIME: {date}</span>
   )
}

export default CurrentDate
