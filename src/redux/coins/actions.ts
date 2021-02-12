import { Dispatch } from "react";
import { singleCoin } from "../../api/api";
import { ActionsTypes, CoinActions } from "./actions.types";


export function selectCoinHistoryAction(date: string) {
   return {
      type: ActionsTypes.SELECT_DATE_HISTORY_COIN,
      payload: date
   }
}

export function fetchCoinAction(id: number) {
   return async function (dispatch: Dispatch<CoinActions>) {
      dispatch({ type: ActionsTypes.FETCH_COIN_START })

      try {
         const response = await fetch(singleCoin + id)
         if (response.ok) {
            const data = await response.json()

            console.log(data)
            dispatch({ type: ActionsTypes.FETCH_COIN_SUCCESS, payload: data })
         } else {
            throw new Error('Error')
         }
      } catch (error) {
         dispatch({ type: ActionsTypes.FETCH_COIN_FAIL, payload: 'Error' })
      }
   }
}

