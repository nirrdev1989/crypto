import { Dispatch } from "react";
import { coinHistoryRange, coinHistoryRangeChange } from "../../api/api";
import { Range } from "../../localdata/local.data";
import { CoinBaseInfo, CoinHistory, CacheHistory, UpdateCoinPriceSocket } from "../../models/Coin";
import { getLocalStorage, removeLocalStorage, saveLocalStorage } from "../../utils/utils";
import { ActionsTypesCoin, CoinActions } from "./actions.types";


export function selectCoinHistoryDateAction(date: string) {
   return {
      type: ActionsTypesCoin.SELECT_DATE_HISTORY_COIN,
      payload: date
   }
}

export function setCoinHistoryRangeAction(coinHistory: CoinHistory) {
   return {
      type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY,
      payload: coinHistory
   }
}

export function updateCoinCurrentPriceSocketAction(updatedInfo: UpdateCoinPriceSocket) {
   return {
      type: ActionsTypesCoin.UPDATE_COIN_CURRENT_PRICE_SOCKET,
      payload: updatedInfo
   }
}

export function fetchCoinAction(currentCoin: CoinBaseInfo, range: Range) {
   return async function (dispatch: Dispatch<CoinActions>) {
      removeLocalStorage('history-cache')
      dispatch({ type: ActionsTypesCoin.FETCH_COIN_START })
      dispatch({ type: ActionsTypesCoin.RESET_COIN })
      // dispatch({ type: ActionsTypesCoin.RESET_COIN_UPDATED_SOCKET })

      const { type, from, to } = range

      try {
         const response = await fetch(
            `${coinHistoryRange}/${currentCoin.id}/${currentCoin.name}?from=${from}&to=${to}&type=${type}`
         )
         if (response.ok) {
            const data = await response.json()
            // console.log(data)
            dispatch({ type: ActionsTypesCoin.FETCH_COIN_SUCCESS, payload: data })
            dispatch({ type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY, payload: data.history })
         } else {
            throw new Error('Error')
         }
      } catch (error) {
         dispatch({ type: ActionsTypesCoin.FETCH_COIN_FAIL, payload: 'Error' })
      }
   }
}

// export function fetchCoinHistoryCustomDates(coinName: string, range: Range) {
//    return async function (dispatch: Dispatch<CoinActions>) {
//       dispatch({ type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_START })

//       const { type, from, to } = range

//       try {
//          const response = await fetch(
//             `http://localhost:3007/coins/coin-range-change/${coinName}?from=${from}&to=${to}&type=${type}`
//          )
//          if (response.ok) {
//             const data = await response.json()
//             console.log(data)
//             dispatch({ type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY, payload: data.history })

//             // dispatch()
//          } else {
//             throw new Error('Error')
//          }
//       } catch (error) {
//          dispatch({ type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_FAIL, payload: 'Error' })
//       }
//    }
// }

export function fetchCoinHistoryChangeAction(coinName: string, range: Range, coinHistory: CoinHistory) {
   return async function (dispatch: Dispatch<CoinActions>) {
      const { type, from, to } = range
      const cacheHistory = getLocalStorage('history-cache') || {}

      if (coinHistory[type] !== undefined && cacheHistory[type]) {
         let updateHistory = {
            type: {
               ...coinHistory[type]
            }
         }
         dispatch({ type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY, payload: updateHistory })
      } else {
         dispatch({ type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_START })

         try {
            const response = await fetch(
               `${coinHistoryRangeChange}/${coinName}?from=${from}&to=${to}&type=${type}`
            )
            if (response.ok) {
               const data = await response.json()
               // console.log(data)
               dispatch({ type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY, payload: data.history })
            } else {
               throw new Error('Error')
            }
         } catch (error) {
            dispatch({ type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_FAIL, payload: 'Error' })
         }
      }
   }
}

