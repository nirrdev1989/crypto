import { Coin, CoinHistory } from "../../models/Coin";

export enum ActionsTypes {
   FETCH_COIN_START = 'FETCH_COIN_START',
   FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS',
   FETCH_COIN_FAIL = 'FETCH_COIN_FAIL',
   SELECT_DATE_HISTORY_COIN = 'SELECT_DATE_HISTORY_COIN'
}

export interface FetchCoinStartAsyncAction {
   type: ActionsTypes.FETCH_COIN_START
}

export interface FetchCoinSeccessAsyncAction {
   type: ActionsTypes.FETCH_COIN_SUCCESS
   payload: {
      coin: Coin,
      history: CoinHistory
   }
}

export interface FetchCoinFailAsyncAction {
   type: ActionsTypes.FETCH_COIN_FAIL
   payload: string
}

export interface SelectDateHistoryCoinAction {
   type: ActionsTypes.SELECT_DATE_HISTORY_COIN
   payload: string
}


export type CoinActions =
   FetchCoinFailAsyncAction |
   FetchCoinSeccessAsyncAction |
   FetchCoinStartAsyncAction |
   SelectDateHistoryCoinAction