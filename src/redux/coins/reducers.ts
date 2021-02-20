import { Coin, CoinHistory, CoinHistoryItem } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";
import { fixNumber, getRange } from "../../utils/utils";

interface CoinInitialState {
   coin: Coin,
   loading: boolean
   error: string
   coinHistory: CoinHistory
   datesCount: number
   dateSelectedItems: CoinHistoryItem[]
   currentDateSelected: string,
   currentPrice: number,
   lastPrice: number
   lastPriceDaySelected: number
   firstPriceDaySelected: number
   changeAllDays: number,
   changeDay: number,
   changePresentDay: number,
   lastDate: string,
   changeAllDaysPresent: number,
   currentCoinId: number
}

const INITIAL_STATE_COIN: CoinInitialState = {
   coin: {} as Coin,
   loading: false,
   error: '',
   coinHistory: {} as CoinHistory,
   datesCount: 0,
   dateSelectedItems: [],
   currentDateSelected: '',
   currentPrice: 0,
   lastPrice: 0,
   lastPriceDaySelected: 0,
   firstPriceDaySelected: 0,
   changeAllDays: 0,
   changeDay: 0,
   lastDate: '',
   changeAllDaysPresent: 0,
   changePresentDay: 0,
   currentCoinId: 0
}

export function coinReducer(state = INITIAL_STATE_COIN, action: CoinActions): CoinInitialState {
   switch (action.type) {
      case ActionsTypes.FETCH_COIN_START:
         return {
            ...state,
            loading: true
         }
      case ActionsTypes.FETCH_COIN_SUCCESS:
         let historyValues = Object.values(action.payload.history)
         let historyKeys = Object.keys(action.payload.history)
         let historyKeysLength = Object.keys(action.payload.history).length

         return {
            ...state,
            loading: false,
            coin: action.payload.coin,
            coinHistory: action.payload.history,
            datesCount: historyKeysLength,
            dateSelectedItems: historyValues[historyKeysLength - 1].array,
            lastPriceDaySelected: historyValues[historyKeysLength - 1].lastPriceOfDay,
            firstPriceDaySelected: historyValues[historyKeysLength - 1].firstPriceOfDay,
            error: '',
            currentDateSelected: historyKeys[historyKeysLength - 1],
            currentPrice: fixNumber(action.payload.currentPrice, 3),
            lastPrice: action.payload.lastPrice,
            changeDay: historyValues[historyKeysLength - 1].change,
            changeAllDays: action.payload.change,
            lastDate: historyKeys[historyKeysLength - 1],
            changeAllDaysPresent: action.payload.changePresent,
            changePresentDay: historyValues[historyKeysLength - 1].changePresentDay,
            currentCoinId: action.payload.coin.id
         }
      case ActionsTypes.FETCH_COIN_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      case ActionsTypes.SELECT_DATE_HISTORY_COIN:
         let date = action.payload

         let listHistgory: CoinHistoryItem[] = []

         if (date === 'all') {
            for (const h of Object.values(state.coinHistory)) {
               listHistgory.push(...h.array)
            }
         } else {
            // console.log(state.coinHistory)
            console.log(Object.keys(state.coinHistory)[0])
            console.log(date)
            listHistgory = [...state.coinHistory[date].array]
         }

         return {
            ...state,
            dateSelectedItems: listHistgory,
            currentDateSelected: action.payload,
            lastPriceDaySelected: date === 'all' ? state.currentPrice : state.coinHistory[date].lastPriceOfDay,
            firstPriceDaySelected: date === 'all' ? state.lastPrice : state.coinHistory[date].firstPriceOfDay,
            changeDay: date === 'all' ? state.changeAllDays : state.coinHistory[date].change,
            changePresentDay: date === 'all' ? state.changeAllDaysPresent : state.coinHistory[date].changePresentDay
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
}

const INITIAL_STATE_UPDATE_COIN_CURRENT_PRICE_SOCKET: UpdateCoinCurrentPriceSocketState = {
   coinId: 0,
   currentPriceUpdated: 0,
   error: '',
   change: 0,
   time: '',
   presentChange: 0,
   priceUp: false,
   isPriceChange: false
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
            console.log('CHANGE PIRCE RANGE: ', changeCurrentPrice)
            changeCurrentPricePresent = fixNumber(changeCurrentPrice / onePresent, 3)
            console.log('CHANGE PIRCE PRESENT: ', changeCurrentPricePresent)
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
            isPriceChange: priceChange
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
            isPriceChange: false
         }
      default:
         return state
   }
}