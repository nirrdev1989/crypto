import { Coin, CoinHistory } from "../../models/Coin";

export enum ActionsTypes {
   FETCH_COIN_START = 'FETCH_COIN_START',
   FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS',
   FETCH_COIN_FAIL = 'FETCH_COIN_FAIL',
   SELECT_DATE_HISTORY_COIN = 'SELECT_DATE_HISTORY_COIN',
   UPDATE_COIN_CURRENT_PRICE_SOCKET = 'UPDATE_COIN_CURRENT_PRICE_SOCKET',
   RESET_COIN_UPDATED_SOCKET = 'RESET_COIN_UPDATED_SOCKET',
   SET_COIN_RANGE_HOSTORY = 'SET_COIN_RANGE_HOSTORY',
   FETCH_COIN_HISTORY_CHANGE_START = 'FETCH_COIN_HISTORY_CHANGE_START',
   FETCH_COIN_HISTORY_CHANGE_FAIL = 'FETCH_COIN_HISTORY_CHANGE_FAIL',
   FETCH_COIN_HISTORY_CHANGE_SUCCESS = 'FETCH_COIN_HISTORY_CHANGE_SUCCESS',
   RESET_COIN = 'RESET_COIN'
}

export interface UpdateCoinCurrentPriceSocketActionType {
   type: ActionsTypes.UPDATE_COIN_CURRENT_PRICE_SOCKET,
   payload: {
      // change: number
      updatedCurrentPrice: number
      // time: string
   }
}


export interface FetchCoinStartAsyncActionType {
   type: ActionsTypes.FETCH_COIN_START
}


export interface FetchCoinSeccessAsyncActionType {
   type: ActionsTypes.FETCH_COIN_SUCCESS
   payload: {
      coin: Coin,
      history: CoinHistory
      // currentPrice: number,
      // lastPrice: number
      // change: number
      // changePresent: number
   }
}

export interface FetchCoinFailAsyncActionType {
   type: ActionsTypes.FETCH_COIN_FAIL
   payload: string
}

export interface SelectDateHistoryCoinActionType {
   type: ActionsTypes.SELECT_DATE_HISTORY_COIN
   payload: string
}

export interface ResetCoinUpdatedSocketActionType {
   type: ActionsTypes.RESET_COIN_UPDATED_SOCKET,
}

export interface SetCoinHistoryRangeActionType {
   type: ActionsTypes.SET_COIN_RANGE_HOSTORY,
   payload: CoinHistory
}

export interface FetchCoinHistoryChangeSatrtAsyncActionType {
   type: ActionsTypes.FETCH_COIN_HISTORY_CHANGE_START
}

export interface FecthCoinHistoryChangeFailAsyncActionType {
   type: ActionsTypes.FETCH_COIN_HISTORY_CHANGE_FAIL,
   payload: string
}

export interface FecthCoinHistoryChangeSuccessAsyncActionType {
   type: ActionsTypes.FETCH_COIN_HISTORY_CHANGE_SUCCESS,
   payload: CoinHistory
}

export interface ResetCoinActionType {
   type: ActionsTypes.RESET_COIN

}

export type CoinActions =
   FetchCoinFailAsyncActionType |
   FetchCoinSeccessAsyncActionType |
   FetchCoinStartAsyncActionType |
   SelectDateHistoryCoinActionType |
   UpdateCoinCurrentPriceSocketActionType |
   ResetCoinUpdatedSocketActionType |
   SetCoinHistoryRangeActionType |
   FetchCoinHistoryChangeSatrtAsyncActionType |
   FecthCoinHistoryChangeSuccessAsyncActionType |
   FecthCoinHistoryChangeFailAsyncActionType |
   ResetCoinActionType
