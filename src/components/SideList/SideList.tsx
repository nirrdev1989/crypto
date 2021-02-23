import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coninsBaseInfo, ranges } from '../../localdata/local.data'
import { fetchCoinAction } from '../../redux/coins/actions'
import SideListItem from './SideListItem'
import { unixTimestamp } from "../../utils/utils";
import { CoinBaseInfo } from '../../models/Coin'
import { currentCoinSelectedAction } from '../../redux/side-list/actions'
import { RootState } from '../../redux/store'

let now = new Date().getTime()
let day = new Date().getTime() - (1000 * 60 * 60 * 24)

function SideList() {
   const dispatch = useDispatch()

   const [currentCoinSelected, setCurrentCoinSelected] = React.useState<CoinBaseInfo>(coninsBaseInfo[0])
   const curretDate = useSelector((state: RootState) => state.coin.currentRangeSelected)

   function onSelectCoin(currentCoin: CoinBaseInfo) {
      setCurrentCoinSelected(() => currentCoin)
   }

   React.useEffect(() => {
      // const { from, to } = unixTimestamp(day, now)
      dispatch(currentCoinSelectedAction(currentCoinSelected))
      dispatch(fetchCoinAction(currentCoinSelected, ranges[curretDate]))
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
