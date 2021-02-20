import React from 'react'
import CoinItem from '../components/Coin/CoinItem';
import SideList from '../components/SideList/SideList';


function HomePage() {
   return (
      <div className="home-grid">
         <div className="home-grid-side-list">
            <SideList />
         </div>
         <div className="home-grid-main">
            <CoinItem />
         </div>
      </div>
   )
}

export default HomePage