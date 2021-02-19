import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { coninsBaseInfo } from '../../localdata/local.data'
import { RootState } from '../../redux/store'
import { fixNumber } from '../../utils/utils'
import ImageIcon from '../ImageIcon'


interface Props {
   handleChangeCoin: (event: React.ChangeEvent<HTMLSelectElement>) => void
   loadStatus: boolean
   handleChart: () => void
   handleDescription: () => void
   currentPrice: number
   iconUrl: string
   color: string
   currentPriceUpdated: number
   currentPriceUpdatedChange: number
}

function CoinHeader({
   handleChangeCoin,
   loadStatus,
   handleChart,
   handleDescription,
   currentPrice,
   iconUrl,
   currentPriceUpdated,
   currentPriceUpdatedChange,
   color
}: Props) {

   const [priceChange, setPriceChange] = React.useState(false)

   React.useEffect(() => {
      setPriceChange(() => false)
      return () => {
         setTimeout(() => {
            setPriceChange(() => true)
         }, 10)
      }
   }, [currentPriceUpdated])

   return (
      <h5 className="my-0 fw-normal card-chart-header">
         <div className="coin-actions">
            <div>
               <select className="form-select-sm" onChange={handleChangeCoin} disabled={loadStatus}>
                  {coninsBaseInfo.map((c) => {
                     return <option value={c.id} key={c.name + c.id}>{c.name} </option>
                  })}
               </select>&nbsp;
               <button
                  disabled={loadStatus}
                  onClick={handleDescription}
                  style={{ backgroundColor: color, color: 'white' }}
                  className="btn  btn-sm"
               >
                  Description
               </button>
               &nbsp;
               <button
                  disabled={loadStatus}
                  onClick={handleChart}
                  style={{ backgroundColor: color, color: 'white' }}
                  className="btn  btn-sm"
               >
                  Prices
               </button>
            </div>
            <div>
               <span className={`${priceChange ? 'animate-center' : ''}`}>
                  ${fixNumber(currentPriceUpdated, 2) || currentPrice}/ %{fixNumber(currentPriceUpdatedChange, 2)}
               </span>
               &nbsp;
              <ImageIcon
                  style={{ width: 30, height: 30 }}
                  path={iconUrl}
               />
            </div>
         </div>
      </h5>
   )
}

export default CoinHeader