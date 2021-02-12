import React from 'react'
import { coninsBaseInfo } from '../../localdata/local.data'
import Chart from '../Chart'
import Card from '../Wrappers/Card'
import { CoinBaseInfo, CoinHistory } from '../../models/Coin';
import Loader from '../Loader';
import { RootState } from '../../redux/store';
import { fetchCoinAction, selectCoinHistoryAction } from '../../redux/coins/actions';
import { useDispatch, useSelector } from 'react-redux';
import CoinDescription from './CoinDescription';

interface Props {
   initialCoin: CoinBaseInfo
}

let allHistory = {} as CoinHistory

function CoinItem({ initialCoin }: Props) {
   const status = useSelector((state: RootState) => state.coin)
   const dispatch = useDispatch()

   const [coinSelectedId, setCoinSelectedId] = React.useState<number>(initialCoin.id)
   const [mainStatus, setMainStatus] = React.useState<boolean>(true)

   function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setCoinSelectedId(() => Number(value))
   }


   function handleChangeDate(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      dispatch(selectCoinHistoryAction(value))
   }

   React.useEffect(() => {
      dispatch(fetchCoinAction(coinSelectedId))

      // fetchCoin(coinSelectedId)
   }, [coinSelectedId])


   let content

   if (status.loading) {
      content = <Loader />
   }

   if (status.error !== '') {
      content = <p>Error</p>
   }

   if (!status.loading && status.error === '') {
      content = <CoinDescription coin={status.coin} />
   }


   return (
      <Card>
         <div className="card-header">
            <h5 className="my-0 fw-normal card-chart-header">
               <div className="coin-actions">
                  <select className="form-select-sm" onChange={handleChange} disabled={status.loading}>
                     {coninsBaseInfo.map((c) => {
                        return <option
                           value={c.id}
                           key={c.name + c.id}
                        >
                           {c.name}
                        </option>
                     })}
                  </select>&nbsp;
                  <button
                     disabled={status.loading}
                     onClick={() => setMainStatus(() => false)}
                     style={{ backgroundColor: status.coin?.color, color: 'white' }}
                     className="btn  btn-sm"
                  >
                     History
                  </button>
               </div>
               <img
                  style={{ cursor: 'pointer' }}
                  onClick={() => setMainStatus(() => true)}
                  src={status.coin?.iconUrl}
                  width="30"
                  height="30"
                  alt="Coin"
               />
            </h5>
         </div>
         <div className="card-body">
            {!mainStatus ?
               <Chart
                  coinHistory={status.dateSelectedItems}
                  coinName={status.coin.name}
                  color={status.coin.color}
                  handleChangeDate={handleChangeDate}
                  historyDatesLength={status.datesCount}
               /> : content
            }
         </div>
      </Card>
   )
}


export default CoinItem