import React from 'react'
import { CoinBaseInfo } from '../../models/Coin'
import ImageIcon from '../ImageIcon'

interface Props {
   item: CoinBaseInfo
   onSelectCoin: (currentCoin: CoinBaseInfo) => void
   currentCoinSelected: CoinBaseInfo
}

function SideListItem({ item, currentCoinSelected, onSelectCoin }: Props) {
   return (
      <li
         style={{ color: item.color || 'white' }}
         className={`side-list-item ${currentCoinSelected.name === item.name ? 'active' : ''} `}
         onClick={() => onSelectCoin(item)}
      >
         <span>{item.name}</span>
         <ImageIcon
            path={item?.iconUrl || ''}
            style={{ width: 30, height: 30 }}
         />
      </li>
   )
}

export default SideListItem
