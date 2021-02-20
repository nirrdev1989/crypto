import { Dispatch } from "react";
import { singleCoin } from "../../api/api";
import { ActionsTypes, CoinActions } from "./actions.types";


export function selectCoinHistoryDateAction(date: string) {
   return {
      type: ActionsTypes.SELECT_DATE_HISTORY_COIN,
      payload: date
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

export function fetchCoinAction(id: number) {
   return async function (dispatch: Dispatch<CoinActions>) {
      dispatch({ type: ActionsTypes.FETCH_COIN_START })
      dispatch({ type: ActionsTypes.RESET_COIN_UPDATED_SOCKET })
      try {
         const response = await fetch(singleCoin + id)
         if (response.ok) {
            const data = await response.json()
            // console.log(data)
            dispatch({ type: ActionsTypes.FETCH_COIN_SUCCESS, payload: data })
         } else {
            throw new Error('Error')
         }
      } catch (error) {
         dispatch({ type: ActionsTypes.FETCH_COIN_FAIL, payload: 'Error' })
      }
   }
}

