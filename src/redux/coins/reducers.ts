import { Coin, CoinHistory, CoinHistoryItem } from "../../models/Coin";
import { ActionsTypes, CoinActions } from "./actions.types";

interface CoinInitialState {
   coin: Coin,
   loading: boolean
   error: string
   coinHistory: CoinHistory
   datesCount: number
   dateSelectedItems: CoinHistoryItem[]
   currentDateSelected: string
}

const INITIAL_STATE_COIN: CoinInitialState = {
   coin: {} as Coin,
   loading: false,
   error: '',
   coinHistory: {} as CoinHistory,
   datesCount: 0,
   dateSelectedItems: [],
   currentDateSelected: ''
}

export function coinReducer(state = INITIAL_STATE_COIN, action: CoinActions): CoinInitialState {
   switch (action.type) {
      case ActionsTypes.FETCH_COIN_START:
         return {
            ...state,
            loading: true
         }
      case ActionsTypes.FETCH_COIN_SUCCESS:
         let historyKeysLength = Object.keys(action.payload.history).length

         return {
            ...state,
            loading: false,
            coin: action.payload.coin,
            coinHistory: action.payload.history,
            datesCount: historyKeysLength,
            dateSelectedItems: Object.values(action.payload.history)[historyKeysLength - 1].array,
            error: '',
            currentDateSelected: Object.keys(action.payload.history)[historyKeysLength - 1]
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
            currentDateSelected: action.payload
         }
      default:
         return state
   }
}

