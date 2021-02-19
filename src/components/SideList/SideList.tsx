import React from 'react'
import { coninsBaseInfo } from '../../localdata/local.data'
import SideListItem from './SideListItem'

function SideList() {

   const [currentCoinSelectes, setCurrentCoinSelected] = React.useState<number>(coninsBaseInfo[0].id)

   function onSelectCoin(coinId: number) {
      setCurrentCoinSelected(() => coinId)
   }

   return (
      <div className="side-list">
         <ul className="side-list-list">
            {coninsBaseInfo.map((item) => {
               return (
                  <SideListItem
                     key={item.symbol}
                     item={item}
                     currentCoinSelectes={currentCoinSelectes}
                     onSelectCoin={onSelectCoin}
                  />
               )
            })}
         </ul>
      </div>
   )
}

export default SideList
