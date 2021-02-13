import React from 'react'
import { countDates } from "../../utils/utils";

interface PropsPrice {
   price: number
   style?: any
   text: string
}
function ChartPriceItem({ text, price, style }: PropsPrice) {
   return (
      <div className="chart-price-item" style={style ? style : null}>
         <span>${price.toFixed(2)}</span>
         <small>{text}</small>
      </div>
   )
}

const presentetion: string[] = ['Bar', 'HorizontalBar']


interface Props {
   handleChangeDate: (event: React.ChangeEvent<HTMLSelectElement>) => void
   currentDateSelected: string
   historyDatesLength: number
   handleChangePresent: (event: React.ChangeEvent<HTMLSelectElement>) => void
   present: string
   lastPriceDaySelected: number
   firstPriceDaySelected: number
   changeDay: number
}

function ChartToolBar({
   handleChangeDate,
   currentDateSelected,
   historyDatesLength,
   handleChangePresent,
   present,
   lastPriceDaySelected,
   firstPriceDaySelected,
   changeDay
}: Props) {

   let posColor = Number(lastPriceDaySelected) > Number(firstPriceDaySelected) ? 'green' : 'red'

   return (
      <div className="chart-bar">
         <div className="chart-selects">
            <select className="form-select-sm" onChange={handleChangeDate} defaultValue={currentDateSelected}>
               {countDates(historyDatesLength).map((date) => {
                  return <option key={date} value={date}>{date}</option>
               })}
               <option value="all">All</option>
            </select>
         &nbsp;
         <select className="form-select-sm" onChange={handleChangePresent} defaultValue={present}>
               {presentetion.map((p) => {
                  return <option key={p} value={p}>{p}</option>
               })}
            </select>
         </div>
         &nbsp;
         <div className="chart-prices">
            <ChartPriceItem price={lastPriceDaySelected} text="Current" />  /
            <ChartPriceItem price={firstPriceDaySelected} text="First" />  /
            <ChartPriceItem price={changeDay} style={{ color: posColor }} text="Change" />
         </div>
      </div>
   )
}




export default ChartToolBar
