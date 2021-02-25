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
   const currentTab = useSelector((state: RootState) => state.tabs.currentTab)

   console.log('COIN ITEM')

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
            content = <Chart coinName={status.coin.name} color={status.coin.color} />
            break
         case 'live':
            content = <CoinLive />
            break
         case 'description':
            content = <CoinDescription coin={status.coin} />
            break
         // case 'custom-dates':
         //    content = <Chart customRange={true} coinName={status.coin.name} color={status.coin.color} />
         //    break
         default:
            content = <p>Some problem</p>
            break;
      }
   }


   return (
      <Card extraClass="card-coin">
         <div className="card-header">
            <CoinHeader
               loadStatus={status.loading}
               iconUrl={status.coin.iconUrl}
               color={status.coin.color}
               currentPrice={status.currentPrice}
            />
         </div>
         <div className="card-body">
            {content}
         </div>
         <div className="card-footer">

         </div>
      </Card>
   )
}


export default CoinItem