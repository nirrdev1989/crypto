import { Coin, CoinHistory, CoinHistoryItem } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";
import { fixNumber } from "../../utils/utils";

interface CoinInitialState {
   coin: Coin,
   loading: boolean
   error: string
   coinHistory: CoinHistory
   datesCount: number
   dateSelectedItems: CoinHistoryItem[]
   currentDateSelected: string,
   currentPrice: number,
   lastChange: number,
   lastPrice: number
   lastPriceDaySelected: number
   firstPriceDaySelected: number
   changeAllDays: number,
   changeDay: number
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
   lastChange: 0,
   lastPrice: 0,
   lastPriceDaySelected: 0,
   firstPriceDaySelected: 0,
   changeAllDays: 0,
   changeDay: 0
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

         console.log(historyValues)
         console.log(historyValues[historyKeysLength - 1])


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
            currentPrice: fixNumber(action.payload.currentPrice, 2),
            lastPrice: action.payload.lastPrice,
            changeDay: historyValues[historyKeysLength - 1].change,
            changeAllDays: action.payload.change,

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
            listHistgory = [...state.coinHistory[date].array]
         }

         return {
            ...state,
            dateSelectedItems: listHistgory,
            currentDateSelected: action.payload,
            lastPriceDaySelected: date === 'all' ? state.currentPrice : state.coinHistory[date].lastPriceOfDay,
            firstPriceDaySelected: date === 'all' ? state.lastPrice : state.coinHistory[date].firstPriceOfDay,
            changeDay: date === 'all' ? state.changeAllDays : state.coinHistory[date].change
         }
      default:
         return state
   }
}

