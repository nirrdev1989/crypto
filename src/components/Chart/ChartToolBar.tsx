import React from 'react'
import { chartPresentetion } from '../../localdata/local.data';
import { countDates } from "../../utils/utils";
import SelectInput from '../SelectInput';

interface PropsPrice {
   price: number
   style?: any
   text: string
   symbol?: string
}

function ChartPriceItem({ text, price, style, symbol }: PropsPrice) {
   return (
      <div className="chart-price-item" style={style ? style : null}>
         <span>{symbol}{price.toFixed(3)}</span>
         <small>{text}</small>
      </div>
   )
}


interface Props {
   handleChangeDate: (event: React.ChangeEvent<HTMLSelectElement>) => void
   currentDateSelected: string
   historyDatesLength: number
   handleChangePresent: (event: React.ChangeEvent<HTMLSelectElement>) => void
   present: string
   lastPriceDaySelected: number
   firstPriceDaySelected: number
   changeDay: number
   changePresent: number
}

function ChartToolBar({
   handleChangeDate,
   currentDateSelected,
   historyDatesLength,
   handleChangePresent,
   present,
   lastPriceDaySelected,
   firstPriceDaySelected,
   changeDay,
   changePresent
}: Props) {

   let posColor = Number(lastPriceDaySelected) > Number(firstPriceDaySelected) ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)'

   return (
      <div className="chart-bar">
         <div className="chart-selects">
            <SelectInput
               handleChange={handleChangeDate}
               defaultValue={currentDateSelected}
               data={countDates(historyDatesLength)}
               extraOption={{ value: 'all', content: 'All' }}
            />
            <SelectInput
               handleChange={handleChangePresent}
               defaultValue={present}
               data={chartPresentetion}
            />
         </div>
         <div className="chart-prices">
            <ChartPriceItem price={lastPriceDaySelected} text="Current" symbol="$" />  /
            <ChartPriceItem price={firstPriceDaySelected} text="First" symbol="$" />  /
            <ChartPriceItem price={changeDay} style={{ color: posColor }} text="Change" symbol="$" />/
            <ChartPriceItem price={changePresent} style={{ color: posColor }} text="Present" symbol="%" />
         </div>
      </div>
   )
}


export default ChartToolBar