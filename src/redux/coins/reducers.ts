import { Coin, CoinHistory, CoinHistoryItem, UpdateCoinPriceSocket } from "../../models/Coin";
import { ActionsTypesCoin, CoinActions } from "./actions.types";
import { fixNumber, getLocalStorage, getRange, removeLocalStorageWithTimer, saveLocalStorage } from "../../utils/utils";

interface CoinInitialState {
   coin: Coin,
   loading: boolean
   error: string
   currentPrice: number
   currentRangeSelected: string
   coinChange: boolean
}

const INITIAL_STATE_COIN: CoinInitialState = {
   coin: {} as Coin,
   loading: false,
   error: '',
   currentPrice: 0,
   currentRangeSelected: '1h',
   coinChange: false
}

export function coinReducer(state = INITIAL_STATE_COIN, action: CoinActions): CoinInitialState {
   switch (action.type) {
      case ActionsTypesCoin.FETCH_COIN_START:
         return {
            ...state,
            loading: true
         }
      case ActionsTypesCoin.FETCH_COIN_SUCCESS:

         let currentRange = Object.keys(action.payload.history)[0]
         let currentPrice = fixNumber(action.payload.coin.price, 3)

         if (action.payload.coin.color === null) {
            action.payload.coin.color = '#808080'
         }
         return {
            ...state,
            error: '',
            loading: false,
            coin: action.payload.coin,
            currentRangeSelected: currentRange,
            currentPrice: currentPrice
         }
      case ActionsTypesCoin.FETCH_COIN_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      default:
         return state
   }
}


interface CoinHistoryState {
   coinHistory: CoinHistory,
   currentRangeSelected: string,
   priceEndOfRange: number
   priceStartOfRange: number
   change: number
   changePresent: number
   historyItems: CoinHistoryItem[],
   priceUp: boolean
   loadingHistory: boolean
   error: string
}

const INITIAL_STATE_COIN_HISTORY: CoinHistoryState = {
   coinHistory: {} as CoinHistory,
   change: 0,
   currentRangeSelected: '1h',
   changePresent: 0,
   priceEndOfRange: 0,
   priceStartOfRange: 0,
   historyItems: [],
   priceUp: false,
   loadingHistory: false,
   error: ''
}

export function coinHostoryReducer(state = INITIAL_STATE_COIN_HISTORY, action: CoinActions) {
   switch (action.type) {
      case ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_START:
         return {
            ...state,
            loadingHistory: true
         }
      case ActionsTypesCoin.SET_COIN_RANGE_HOSTORY:
         let currentRange = Object.keys(action.payload)[0]
         // let cacheHistory = state.coinHistory
         let cacheHistory = getLocalStorage('history-cache') || {}

         let coinHistory = state.coinHistory

         coinHistory[currentRange] = action.payload[currentRange]

         cacheHistory[currentRange] = { type: currentRange }

         // cacheHistory[currentRange].lastCache = new Date().getTime()
         saveLocalStorage('history-cache', cacheHistory)
         removeLocalStorageWithTimer('history-cache', 300)

         console.log(state.coinHistory)

         return {
            ...state,
            coinHistory: coinHistory,
            loadingHistory: false,
            error: '',
            change: action.payload[currentRange].change,
            changePresent: action.payload[currentRange].changePresent,
            priceEndOfRange: action.payload[currentRange].currentPrice,
            priceStartOfRange: action.payload[currentRange].firstPrice,
            historyItems: action.payload[currentRange].data,
            priceUp: action.payload[currentRange].priceUp,
            currentRangeSelected: currentRange
         }
      case ActionsTypesCoin.FETCH_COIN_HISTORY_CHANGE_FAIL:
         return {
            ...state,
            loadingHistory: false,
            error: action.payload
         }
      case ActionsTypesCoin.RESET_COIN:
         return {
            coinHistory: {} as CoinHistory,
            change: 0,
            currentRangeSelected: '1h',
            changePresent: 0,
            priceEndOfRange: 0,
            priceStartOfRange: 0,
            historyItems: [],
            priceUp: false,
            loadingHistory: false,
            error: ''
         }
      default:
         return state
   }
}


interface UpdateCoinCurrentPriceSocketState extends UpdateCoinPriceSocket { }

const INITIAL_STATE_UPDATE_COIN_CURRENT_PRICE_SOCKET: UpdateCoinCurrentPriceSocketState = {
   change: 0,
   changePresent: 0,
   currentPrice: 0,
   prevPrice: 0,
   priceUp: false,
   isPriceChange: false
}

export function updateCoinCurrentPriceSocketReducer(
   state = INITIAL_STATE_UPDATE_COIN_CURRENT_PRICE_SOCKET,
   action: CoinActions
): UpdateCoinCurrentPriceSocketState {
   switch (action.type) {
      case ActionsTypesCoin.UPDATE_COIN_CURRENT_PRICE_SOCKET:
         console.log(action.payload)
         let changePresent = action.payload.isPriceChange ? action.payload.changePresent : state.changePresent
         let change = action.payload.isPriceChange ? action.payload.change : state.change

         return {
            ...state,
            change: change,
            changePresent: changePresent,
            currentPrice: action.payload.currentPrice,
            prevPrice: action.payload.prevPrice,
            priceUp: action.payload.priceUp,
            isPriceChange: action.payload.isPriceChange
         }
      case ActionsTypesCoin.RESET_COIN_UPDATED_SOCKET:
         return {
            change: 0,
            changePresent: 0,
            currentPrice: 0,
            prevPrice: 0,
            priceUp: false,
            isPriceChange: false
         }
      default:
         return state
   }
}