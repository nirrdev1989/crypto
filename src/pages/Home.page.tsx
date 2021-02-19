import React from 'react'
import CoinItem from '../components/Coin/CoinItem';
import SideList from '../components/SideList/SideList';
import Container from '../components/Wrappers/Container';
import { coninsBaseInfo } from '../localdata/local.data'


function HomePage() {
   return (
      <div className="home-grid">
         <div className="home-grid-side-list">
            <SideList />
         </div>
         <div className="home-grid-main">
            {/* <CoinItem initialCoin={coninsBaseInfo[0]} /> */}
         </div>
      </div>
   )
}

export default HomePage
