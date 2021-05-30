import { Coin, CoinHistory, UpdateCoinPriceSocket } from "../../models/Coin";

export enum ActionsTypesCoin {
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
   type: ActionsTypesCoin.UPDATE_COIN_CURRENT_PRICE_SOCKET,
   payload: UpdateCoinPriceSocket
}


export interface FetchCoinStartAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_START
}


export interface FetchCoinSeccessAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_SUCCESS
   payload: {
      coin: Coin,
      history: CoinHistory
   }
}

export interface FetchCoinFailAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_FAIL
   payload: string
}

export interface SelectDateHistoryCoinActionType {
   type: ActionsTypesCoin.SELECT_DATE_HISTORY_COIN
   payload: string
}

export interface ResetCoinUpdatedSocketActionType {
   type: ActionsTypesCoin.RESET_COIN_UPDATED_SOCKET,
}

export interface SetCoinHistoryRangeActionType {
   type: ActionsTypesCoin.SET_COIN_RANGE_HOSTORY,
   payload: CoinHistory
}

export interface FetchCoinHistoryChangeSatrtAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_START
}

export interface FecthCoinHistoryChangeFailAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_FAIL,
   payload: string
}

export interface FecthCoinHistoryChangeSuccessAsyncActionType {
   type: ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_SUCCESS,
   payload: CoinHistory
}

export interface ResetCoinActionType {
   type: ActionsTypesCoin.RESET_COIN

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
