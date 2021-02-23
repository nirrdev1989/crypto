import { Coin, CoinHistory, CoinHistoryItem } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";
import { fixNumber, getRange } from "../../utils/utils";

interface CoinInitialState {
   coin: Coin,
   loading: boolean
   error: string
   // coinHistory: CoinHistory
   currentPrice: number
   currentRangeSelected: string
   // datesCount: number
   // dateSelectedItems: CoinHistoryItem[]
   // currentPrice: number,
   // lastPrice: number
   // lastPriceDaySelected: number
   // firstPriceDaySelected: number
   // changeAllDays: number,
   // changeDay: number,
   // changePresentDay: number,
   // lastDate: string,
   // changeAllDaysPresent: number,
   // currentCoinId: number
}

const INITIAL_STATE_COIN: CoinInitialState = {
   coin: {} as Coin,
   loading: false,
   error: '',
   currentPrice: 0,
   // coinHistory: {} as CoinHistory,
   currentRangeSelected: '1h',
   // datesCount: 0,
   // dateSelectedItems: [],
   // currentPrice: 0,
   // lastPrice: 0,
   // lastPriceDaySelected: 0,
   // firstPriceDaySelected: 0,
   // changeAllDays: 0,
   // changeDay: 0,
   // lastDate: '',
   // changeAllDaysPresent: 0,
   // changePresentDay: 0,
   // currentCoinId: 0
}

export function coinReducer(state = INITIAL_STATE_COIN, action: CoinActions): CoinInitialState {
   switch (action.type) {
      case ActionsTypes.FETCH_COIN_START:
         return {
            ...state,
            loading: true
         }
      case ActionsTypes.FETCH_COIN_SUCCESS:
         // let historyValues = Object.values(action.payload.history)
         // let historyKeys = Object.keys(action.payload.history)
         // let historyKeysLength = Object.keys(action.payload.history).length

         let currentRange = Object.keys(action.payload.history)[0]
         let currentPrice = fixNumber(action.payload.coin.price, 3)

         console.log(currentRange)

         if (action.payload.coin.color === null) {
            action.payload.coin.color = '#808080'
         }
         return {
            ...state,
            loading: false,
            coin: action.payload.coin,
            // coinHistory: action.payload.history,
            currentRangeSelected: currentRange,
            currentPrice: currentPrice
            // dateSelectedItems: action.payload.history[currentDate]
         }

      // console.log

      // return {
      //    ...state,
      //    loading: false,
      //    coin: action.payload.coin,
      //    coinHistory: action.payload.history,
      //    datesCount: historyKeysLength,
      //    dateSelectedItems: historyValues[historyKeysLength - 1].array,
      //    lastPriceDaySelected: historyValues[historyKeysLength - 1].currentPrice,
      //    firstPriceDaySelected: historyValues[historyKeysLength - 1].firstPrice,
      //    error: '',
      //    currentDateSelected: historyKeys[historyKeysLength - 1],
      //    currentPrice: fixNumber(action.payload.currentPrice, 3),
      //    lastPrice: action.payload.lastPrice,
      //    changeDay: historyValues[historyKeysLength - 1].change,
      //    changeAllDays: action.payload.change,
      //    lastDate: historyKeys[historyKeysLength - 1],
      //    changeAllDaysPresent: action.payload.changePresent,
      //    changePresentDay: historyValues[historyKeysLength - 1].changePresent,
      //    currentCoinId: action.payload.coin.id
      // }
      case ActionsTypes.FETCH_COIN_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      case ActionsTypes.SELECT_DATE_HISTORY_COIN:
         // let date = action.payload

         // let listHistgory: CoinHistoryItem[] = []

         // if (date === 'all') {
         //    for (const h of Object.values(state.coinHistory)) {
         //       listHistgory.push(...h.array)
         //    }
         // } else {
         //    // console.log(state.coinHistory)
         //    console.log(Object.keys(state.coinHistory)[0])
         //    console.log(date)
         //    listHistgory = [...state.coinHistory[date].array]
         // }

         // return {
         //    ...state,
         //    dateSelectedItems: listHistgory,
         //    currentDateSelected: action.payload,
         //    lastPriceDaySelected: date === 'all' ? state.currentPrice : state.coinHistory[date].currentPrice,
         //    firstPriceDaySelected: date === 'all' ? state.lastPrice : state.coinHistory[date].firstPrice,
         //    changeDay: date === 'all' ? state.changeAllDays : state.coinHistory[date].change,
         //    changePresentDay: date === 'all' ? state.changeAllDaysPresent : state.coinHistory[date].changePresent
         // }
         return state
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
}

const INITIAL_STATE_COIN_HISTORY: CoinHistoryState = {
   coinHistory: {} as CoinHistory,
   change: 0,
   currentRangeSelected: '1h',
   changePresent: 0,
   priceEndOfRange: 0,
   priceStartOfRange: 0,
   historyItems: [],
   priceUp: false
}

export function coinHostoryReducer(state = INITIAL_STATE_COIN_HISTORY, action: CoinActions) {
   switch (action.type) {
      case ActionsTypes.SET_COIN_RANGE_HOSTORY:
         let currentRange = Object.keys(action.payload)[0]

         return {
            ...state,
            change: action.payload[currentRange].change,
            changePresent: action.payload[currentRange].changePresent,
            priceEndOfRange: action.payload[currentRange].currentPrice,
            priceStartOfRange: action.payload[currentRange].firstPrice,
            historyItems: action.payload[currentRange].data,
            priceUp: action.payload[currentRange].priceUp,
            currentRangeSelected: currentRange
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