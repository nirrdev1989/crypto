import React from 'react'
import { useSelector } from 'react-redux';
import CoinItem from '../components/Coin/CoinItem';
import SideList from '../components/SideList/SideList';
import { RootState } from '../redux/store';

function HomePage() {

   const open = useSelector((state: RootState) => state.sideList.open)

   return (
      <div className="home-grid">
         <div
            style={{ display: `${open ? 'block' : 'none'}` }}
            className='home-grid-side-list'
         >
            <SideList />
         </div>
         <div
            className='home-grid-main'
            style={{ gridColumn: `${open ? '' : '5 span'}`, width: '100%' }}
         >
            <CoinItem />
         </div>
      </div>
   )
}

export default HomePage