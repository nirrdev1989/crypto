import { CoinBaseInfo } from "../../models/Coin";
import { ActionsTypesSideList, SideListActions } from "./actions.types";

interface SideListInitialState {
   open: boolean
   currentCoinSelected: CoinBaseInfo
}

const INITIAL_STATE_SIDE_LIST: SideListInitialState = {
   open: true,
   currentCoinSelected: {} as CoinBaseInfo
}

export default function sideListReducer(state = INITIAL_STATE_SIDE_LIST, action: SideListActions): SideListInitialState {
   switch (action.type) {
      case ActionsTypesSideList.TOGGLE_SIDE_LIST:
         return {
            ...state,
            open: !state.open
         }
      case ActionsTypesSideList.CURRENT_COIN_SELECTED:
         return {
            ...state,
            currentCoinSelected: { ...action.payload }
         }
      default:
         return state
   }
}