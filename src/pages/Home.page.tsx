import React from 'react'
import CoinItem from '../components/Coin/CoinItem';
import { coninsBaseInfo } from '../localdata/local.data'


function HomePage() {
   return (
      <div className="row">
         <CoinItem initialCoin={coninsBaseInfo[0]} />
      </div>
   )
}

export default HomePage
