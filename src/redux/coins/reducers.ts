import { Coin, CoinHistory, CoinHistoryItem } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";
import { fixNumber, getRange } from "../../utils/utils";

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
      case ActionsTypes.FETCH_COIN_START:
         return {
            ...state,
            loading: true
         }
      case ActionsTypes.FETCH_COIN_SUCCESS:

         let currentRange = Object.keys(action.payload.history)[0]
         let currentPrice = fixNumber(action.payload.coin.price, 3)

         console.log(currentRange)

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
      case ActionsTypes.FETCH_COIN_FAIL:
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
      case ActionsTypes.FETCH_COIN_HISTORY_CHANGE_START:
         return {
            ...state,
            loadingHistory: true
         }
      case ActionsTypes.SET_COIN_RANGE_HOSTORY:
         let currentRange = Object.keys(action.payload)[0]

         let chaheHistory = state.coinHistory

         chaheHistory[currentRange] = action.payload[currentRange]

         console.log(state.coinHistory)

         return {
            ...state,
            coinHistory: chaheHistory,
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
      case ActionsTypes.FETCH_COIN_HISTORY_CHANGE_FAIL:
         return {
            ...state,
            loadingHistory: false,
            error: action.payload
         }
      case ActionsTypes.RESET_COIN:
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


interface UpdateCoinCurrentPriceSocketState {
   coinId: number
   currentPriceUpdated: number
   error: string
   change: number
   time: string
   presentChange: number
   priceUp: boolean
   isPriceChange: boolean
   prevPrice: number
}

const INITIAL_STATE_UPDATE_COIN_CURRENT_PRICE_SOCKET: UpdateCoinCurrentPriceSocketState = {
   coinId: 0,
   currentPriceUpdated: 0,
   error: '',
   change: 0,
   time: '',
   presentChange: 0,
   priceUp: false,
   isPriceChange: false,
   prevPrice: 0
}

export function updateCoinCurrentPriceSocketReducer(
   state = INITIAL_STATE_UPDATE_COIN_CURRENT_PRICE_SOCKET,
   action: CoinActions
): UpdateCoinCurrentPriceSocketState {
   switch (action.type) {
      case ActionsTypes.UPDATE_COIN_CURRENT_PRICE_SOCKET:
         let changeCurrentPricePresent: number = 0
         let changeCurrentPrice: number = 0
         // let currentPriceChange: number = state.currentPriceUpdated || 0
         let isPriceUp: boolean = false
         let priceChange: boolean = false


         console.log('STATE CURRENT PICE: ', state.currentPriceUpdated)
         console.log('NEW CURRENT PRICE: : ', action.payload.updatedCurrentPrice)

         if (state.currentPriceUpdated === action.payload.updatedCurrentPrice) {
            isPriceUp = state.priceUp
         }

         else if (state.currentPriceUpdated !== 0) {
            let onePresent = state.currentPriceUpdated / 100
            changeCurrentPrice = fixNumber(getRange(state.currentPriceUpdated, action.payload.updatedCurrentPrice), 3)
            // console.log('CHANGE PIRCE RANGE: ', changeCurrentPrice)
            changeCurrentPricePresent = fixNumber(changeCurrentPrice / onePresent, 3)
            // console.log('CHANGE PIRCE PRESENT: ', changeCurrentPricePresent)
            isPriceUp = action.payload.updatedCurrentPrice > state.currentPriceUpdated
            priceChange = true
         }

         return {
            ...state,
            currentPriceUpdated: action.payload.updatedCurrentPrice,
            time: new Date().toLocaleTimeString(),
            presentChange: changeCurrentPricePresent || state.presentChange,
            change: changeCurrentPrice || state.change,
            priceUp: isPriceUp,
            isPriceChange: priceChange,
            prevPrice: state.prevPrice
         }
      case ActionsTypes.RESET_COIN_UPDATED_SOCKET:
         return {
            coinId: 0,
            currentPriceUpdated: 0,
            error: '',
            change: 0,
            time: '',
            presentChange: 0,
            priceUp: false,
            isPriceChange: false,
            prevPrice: 0
         }
      default:
         return state
   }
}