import React from 'react'
import { chartPresentetion } from '../../localdata/local.data';
import { countDates } from "../../utils/utils";
import Button from '../Button';
import SelectInput from '../SelectInput';

interface PropsPrice {
   price: number
   style?: any
   text: string
   symbol?: string
}

export function PriceItem({ text, price, style, symbol }: PropsPrice) {
   return (
      <div className="chart-price-item" style={style ? style : null}>
         <span>{symbol}{price.toFixed(3)}</span>
         <small>{text}</small>
      </div>
   )
}


const rangesArray = [
   '1h', '24h', 'week', 'mount', 'year'
]

interface Props {
   handleChangeRange: (event: React.ChangeEvent<HTMLSelectElement>) => void
   currentRangeSelected: string
   handleChangeChartPresent: (event: React.ChangeEvent<HTMLSelectElement>) => void
   present: string
   change: number
   changePresent: number
   currentPrice: number
   firstPrice: number
   priceUp: boolean
}

function ChartToolBar({
   handleChangeRange,
   currentRangeSelected,
   handleChangeChartPresent,
   present,
   change,
   changePresent,
   currentPrice,
   firstPrice,
   priceUp
   // historyDatesLength,
   // lastPriceDaySelected,
   // firstPriceDaySelected,
   // changeDay,
   // changePresent
}: Props) {

   const [customDate, setCistomDate] = React.useState(false)

   let posColor = priceUp ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)'

   return (
      <>
         <div className="chart-bar">
            <div className="chart-selects">
               <div>
                  <Button
                     active={customDate}
                     content={"Cuostom date"}
                     handleClick={() => setCistomDate((prev) => !prev)}
                     extraClass="btn-info"
                  />
               </div>
               <div className="selects">
                  {/* {customDate ? */}
                  <>
                     <SelectInput
                        handleChange={handleChangeRange}
                        defaultValue={currentRangeSelected}
                        data={rangesArray}
                        extraOption={{ value: 'all', content: 'All' }}
                     />
                     <SelectInput
                        handleChange={handleChangeChartPresent}
                        defaultValue={present}
                        data={chartPresentetion}
                     /></>

                  {/* <input style={{ width: '40px' }} type="datetime-local" className="form-control form-control-sm" />
                        <input type="datetime-local" className="form-control form-control-sm" /></>} */}
               </div>
            </div>
            <div className="chart-prices">
               <PriceItem price={currentPrice} text="Current" symbol="$" />  /
               <PriceItem price={firstPrice} text="First" symbol="$" />  /
               <PriceItem price={change} style={{ color: posColor }} text="Change" symbol="$" />/
               <PriceItem price={changePresent} style={{ color: posColor }} text="Present" symbol="%" />
            </div>
         </div>
         <hr />
      </>
   )
}


export default ChartToolBar