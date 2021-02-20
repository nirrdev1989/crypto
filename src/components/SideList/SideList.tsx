import React from 'react'
import { useDispatch } from 'react-redux'
import { coninsBaseInfo } from '../../localdata/local.data'
import { fetchCoinAction } from '../../redux/coins/actions'
import SideListItem from './SideListItem'

function SideList() {
   const dispatch = useDispatch()

   const [currentCoinSelectes, setCurrentCoinSelected] = React.useState<number>(coninsBaseInfo[0].id)

   function onSelectCoin(coinId: number) {
      setCurrentCoinSelected(() => coinId)
   }

   React.useEffect(() => {
      dispatch(fetchCoinAction(currentCoinSelectes))
   }, [currentCoinSelectes])

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
