import React from 'react'
import { coninsBaseInfo } from '../../localdata/local.data'
import ImageIcon from '../ImageIcon'


interface Props {
   handleChangeCoin: (event: React.ChangeEvent<HTMLSelectElement>) => void
   loadStatus: boolean
   handleChart: () => void
   handleDescription: () => void
   currentPrice: number
   iconUrl: string
   color: string
}

function CoinHeader({
   handleChangeCoin,
   loadStatus,
   handleChart,
   handleDescription,
   currentPrice,
   iconUrl,
   color }: Props) {
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
                  onClick={handleChart}
                  style={{ backgroundColor: color, color: 'white' }}
                  className="btn  btn-sm"
               >
                  History
               </button>
            </div>
            <div>
               <span className="main-price">${currentPrice}</span>
              &nbsp;
              <ImageIcon
                  style={{ cursor: ` ${loadStatus ? 'not-allowed' : 'pointer'}`, width: 30, height: 30 }}
                  onClick={handleDescription}
                  path={iconUrl}
               />
            </div>
         </div>
      </h5>
   )
}

export default CoinHeader
