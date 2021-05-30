import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coninsBaseInfo, ranges } from '../../localdata/local.data'
import { fetchCoinAction } from '../../redux/coins/actions'
import SideListItem from './SideListItem'
import { CoinBaseInfo } from '../../models/Coin'
import { currentCoinSelectedAction } from '../../redux/side-list/actions'
import { RootState } from '../../redux/store'



function SideList() {
   const dispatch = useDispatch()

   const [currentCoinSelected, setCurrentCoinSelected] = React.useState<CoinBaseInfo>(coninsBaseInfo[0])
   const currentRangeSelected = useSelector((state: RootState) => state.coin.currentRangeSelected)

   function onSelectCoin(currentCoin: CoinBaseInfo) {
      setCurrentCoinSelected(() => currentCoin)
   }

   React.useEffect(() => {
      dispatch(currentCoinSelectedAction(currentCoinSelected))
      dispatch(fetchCoinAction(currentCoinSelected, ranges[currentRangeSelected]))
   }, [currentCoinSelected])

   return (
      <div className="side-list">
         <ul className="side-list-list">
            {coninsBaseInfo.map((item) => {
               return (
                  <SideListItem
                     key={item.symbol}
                     item={item}
                     currentCoinSelected={currentCoinSelected}
                     onSelectCoin={onSelectCoin}
                  />
               )
            })}
         </ul>
      </div>
   )
}

export default SideList
