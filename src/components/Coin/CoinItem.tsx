import React from 'react'
import Chart from '../Chart/Chart'
import Card from '../Wrappers/Card'
import Loader from '../Loader';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import CoinDescription from './CoinDescription';
import CoinHeader from './CoinHeader';
import CoinLive from './CoinLive';

interface Props { }

function CoinItem({ }: Props) {

   const status = useSelector((state: RootState) => state.coin)
   const updatedPrice = useSelector((state: RootState) => state.updatedCurrentPrice)
   const currentTab = useSelector((state: RootState) => state.tabs.currentTab)

   let content

   if (status.loading) {
      content = <Loader />
   }

   if (status.error !== '') {
      content = <p style={{ textAlign: 'center' }}>Error</p>
   }

   if (!status.loading && status.error === '') {
      switch (currentTab) {
         case 'prices':
            content = <Chart
               coinName={status.coin.name}
               color={status.coin.color}
            />
            break
         case 'live':
            content = <CoinLive />
            break
         case 'description':
            content = <CoinDescription coin={status.coin} />
            break
         default:
            break;
      }
   }


   return (
      <Card extraClass="card-coin">
         <div className="card-header">
            <CoinHeader
               currentPriceUpdated={updatedPrice.currentPriceUpdated}
               currentPriceUpdatedChange={updatedPrice.change}
               loadStatus={status.loading}
               currentPrice={status.currentPrice}
               iconUrl={status.coin.iconUrl}
               color={status.coin.color}
            />
         </div>
         <div className="card-body">
            {content}
         </div>
      </Card>
   )
}


export default CoinItem