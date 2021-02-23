import { Dispatch } from "react";
import { singleCoin } from "../../api/api";
import { Range } from "../../localdata/local.data";
import { CoinBaseInfo, CoinHistory } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";


export function selectCoinHistoryDateAction(date: string) {
   return {
      type: ActionsTypes.SELECT_DATE_HISTORY_COIN,
      payload: date
   }
}

export function setCoinHistoryRangeAction(coinHistory: CoinHistory) {
   return {
      type: ActionsTypes.SET_COIN_RANGE_HOSTORY,
      payload: coinHistory
   }
}

export function updateCoinCurrentPriceSocketAction(updatedCurrentPrice: number, change: number) {
   return {
      type: ActionsTypes.UPDATE_COIN_CURRENT_PRICE_SOCKET,
      payload: {
         updatedCurrentPrice: updatedCurrentPrice,
         change: change
      }
   }
}

export function fetchCoinAction(currentCoin: CoinBaseInfo, range: Range) {
   return async function (dispatch: Dispatch<CoinActions>) {

      dispatch({ type: ActionsTypes.FETCH_COIN_START })
      // dispatch({ type: ActionsTypes.RESET_COIN_UPDATED_SOCKET })
      dispatch({ type: ActionsTypes.RESET_COIN })

      const { type, from, to } = range

      // console.log('From: ', from, 'To: ', to)
      // / coin - range / bitcoin ? from = "" & to=""
      // http://localhost:3007/coins/coin-range/${id}?from=${from}&to=${to}

      try {
         const response = await fetch(
            `http://localhost:3007/coins/coin-range/${currentCoin.id}/${currentCoin.name}?from=${from}&to=${to}&type=${type}`
         )
         if (response.ok) {
            const data = await response.json()
            // console.log(data)
            dispatch({ type: ActionsTypes.FETCH_COIN_SUCCESS, payload: data })
            dispatch({ type: ActionsTypes.SET_COIN_RANGE_HOSTORY, payload: data.history })
         } else {
            throw new Error('Error')
         }
      } catch (error) {
         dispatch({ type: ActionsTypes.FETCH_COIN_FAIL, payload: 'Error' })
      }
   }
}

export function fetchCoinHistoryChangeAction(coinName: string, range: Range, coinHistory: CoinHistory) {
   return async function (dispatch: Dispatch<CoinActions>) {
      const { type, from, to } = range

      if (coinHistory[type] !== undefined) {
         let updateHistory = {
            type: {
               ...coinHistory[type]
            }
         }
         dispatch({ type: ActionsTypes.SET_COIN_RANGE_HOSTORY, payload: updateHistory })
         // console.log(coinHistory[type])
      } else {
         dispatch({ type: ActionsTypes.FETCH_COIN_HISTORY_CHANGE_START })

         try {
            const response = await fetch(
               `http://localhost:3007/coins/coin-range-change/${coinName}?from=${from}&to=${to}&type=${type}`
            )
            if (response.ok) {
               const data = await response.json()
               // console.log(data)
               dispatch({ type: ActionsTypes.SET_COIN_RANGE_HOSTORY, payload: data.history })
            } else {
               throw new Error('Error')
            }
         } catch (error) {
            dispatch({ type: ActionsTypes.FETCH_COIN_HISTORY_CHANGE_FAIL, payload: 'Error' })
         }
      }
   }
}

