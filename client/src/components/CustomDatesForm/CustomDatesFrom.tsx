import React, { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
// import { fetchCoinHistoryCustomDates } from '../../redux/coins/actions'

interface Props {
   coinName: string
}

function CustomDatesFrom({ coinName }: Props) {

   const dispatch = useDispatch()

   const [dates, setDates] = React.useState({
      from: '',
      to: ''
   })

   function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target

      setDates((prev) => {
         return {
            ...prev,
            [name]: value
         }
      })
   }

   function handleSubmit(event: FormEvent) {
      event.preventDefault()

      let from = new Date(dates.from).getTime()
      let to = new Date(dates.to).getTime()

      // dispatch(fetchCoinHistoryCustomDates(coinName, { from: from, to: to, type: '' }))
      // console.log(dates)
   }


   return (
      <form onSubmit={handleSubmit} className="custom-dates-from" >
         <div className="inputs">
            <div>
               <label style={{ float: 'left' }} className="form-label">From:</label>
            </div>
            <div >
               <input
                  required
                  type="datetime-local"
                  className="form-control form-control-sm"
                  value={dates.from}
                  name="from"
                  onChange={handleOnChange}
               />
               {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div>
               <label style={{ float: 'left' }} className="form-label">To:</label>
            </div>
            <div >
               <input
                  required
                  type="datetime-local"
                  className="form-control form-control-sm"
                  value={dates.to}
                  name="to"
                  onChange={handleOnChange}
               />
            </div>
            <div>
               <button type="submit" className="btn btn-info btn-sm">Submit</button>
            </div>
         </div>
      </form>
   )
}

export default CustomDatesFrom
