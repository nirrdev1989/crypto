import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coninsBaseInfo, tabsArray } from '../../localdata/local.data'
import { RootState } from '../../redux/store'
import { setCurrentTabAction } from '../../redux/tabs/actions'
import { fixNumber } from '../../utils/utils'
import Button from '../Button'
import ImageIcon from '../ImageIcon'


interface Props {
   loadStatus: boolean
   currentPrice: number
   iconUrl: string
   color: string
   currentPriceUpdated: number
   currentPriceUpdatedChange: number
}

function CoinHeader({
   loadStatus,
   currentPrice,
   iconUrl,
   currentPriceUpdated,
   currentPriceUpdatedChange,
   color
}: Props) {

   const dispatch = useDispatch()
   const currentTab = useSelector((state: RootState) => state.tabs.currentTab)


   return (
      <h5 className="my-0 fw-normal card-chart-header">
         <div className="coin-header ">
            <div className="coin-header-btns">
               {tabsArray.map((tab) => {
                  return <Button
                     key={tab.value}
                     handleClick={() => dispatch(setCurrentTabAction(tab.value))}
                     active={currentTab === tab.value}
                     disabled={loadStatus}
                     content={tab.content}
                     color={color}
                  />
               })}
            </div>
            <div>
               <span style={{ marginRight: '0.3rem' }}>
                  ${fixNumber(currentPriceUpdated, 3) || currentPrice}
               </span>
               <ImageIcon
                  style={{ width: 30, height: 30 }}
                  path={iconUrl}
               />
            </div>
         </div>
      </h5>
   )
}

export default CoinHeader