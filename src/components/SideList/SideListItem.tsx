import React from 'react'
import { CoinBaseInfo } from '../../models/Coin'
import ImageIcon from '../ImageIcon'

interface Props {
   item: CoinBaseInfo
   onSelectCoin: (coinId: number) => void
   currentCoinSelectes: number
}

function SideListItem({ item, currentCoinSelectes, onSelectCoin }: Props) {
   return (
      <li
         style={{ color: item.color || 'white' }}
         className={`side-list-item ${currentCoinSelectes === item.id ? 'active' : ''} `}
         onClick={() => onSelectCoin(item.id)}
      >
         <span>{item.name}</span>  <ImageIcon path={item.iconUrl} style={{ width: 30, height: 30 }} />
      </li>
   )
}

export default SideListItem
