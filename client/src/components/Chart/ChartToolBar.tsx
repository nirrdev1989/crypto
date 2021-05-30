import React from 'react'
import { chartPresentetion } from '../../localdata/local.data';
import SelectInput from '../SelectInput';
import ChartsPrices from './ChartsPrices';
import { rangesArray } from "../../localdata/local.data";

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
   coinName: string
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
   priceUp,
   coinName,
}: Props) {

   let posColor = priceUp ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)'

   return (
      <React.Fragment>
         <div className="chart-bar">
            <div className="chart-selects">
               <div className="selects">
                  <SelectInput
                     handleChange={handleChangeChartPresent}
                     defaultValue={present}
                     data={chartPresentetion}
                  />
                  <SelectInput
                     handleChange={handleChangeRange}
                     defaultValue={currentRangeSelected}
                     data={rangesArray}
                     extraOption={{ value: 'all', content: 'All' }}
                  />
               </div>
            </div>
            <ChartsPrices
               change={change}
               changePresent={changePresent}
               currentPrice={currentPrice}
               firstPrice={firstPrice}
               posColor={posColor}
            />
         </div>
         <hr />
      </React.Fragment>
   )
}


export default ChartToolBar