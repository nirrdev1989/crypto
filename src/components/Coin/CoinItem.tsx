import React from 'react'
import Chart from '../Chart/Chart'
import Card from '../Wrappers/Card'
import { CoinBaseInfo } from '../../models/Coin';
import Loader from '../Loader';
import { RootState } from '../../redux/store';
import { fetchCoinAction } from '../../redux/coins/actions';
import { useDispatch, useSelector } from 'react-redux';
import CoinDescription from './CoinDescription';
import CoinHeader from './CoinHeader';

interface Props {
   initialCoin: CoinBaseInfo
}

function CoinItem({ initialCoin }: Props) {
   const status = useSelector((state: RootState) => state.coin)
   const dispatch = useDispatch()

   const [coinSelectedId, setCoinSelectedId] = React.useState<number>(initialCoin.id)
   const [mainStatus, setMainStatus] = React.useState<boolean>(true)

   function handleChangeCoin(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setCoinSelectedId(() => Number(value))
   }

   function handleChart() {
      setMainStatus(() => false)
   }

   function handleDescription() {
      setMainStatus(() => true)
   }

   React.useEffect(() => {
      dispatch(fetchCoinAction(coinSelectedId))
   }, [coinSelectedId])

   let content

   if (status.loading) {
      content = <Loader />
   }

   if (status.error !== '') {
      content = <p style={{ textAlign: 'center' }}>Error</p>
   }

   if (!status.loading && status.error === '') {
      content = <CoinDescription coin={status.coin} />
   }


   return (
      <Card>
         <div className="card-header">
            <CoinHeader
               loadStatus={status.loading}
               currentPrice={status.currentPrice}
               handleChangeCoin={handleChangeCoin}
               handleChart={handleChart}
               handleDescription={handleDescription}
               iconUrl={status.coin.iconUrl}
               color={status.coin.color}
            />
         </div>
         <div className="card-body">
            {!mainStatus ?
               <Chart
                  coinName={status.coin.name}
                  color={status.coin.color}
               /> : content
            }
         </div>
      </Card>
   )
}


export default CoinItem