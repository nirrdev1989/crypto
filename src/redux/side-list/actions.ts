import { CoinBaseInfo } from "../../models/Coin";
import { ActionsTypes } from "./actions.types";

export function toggleSideListAction() {
   return {
      type: ActionsTypes.TOGGLE_SIDE_LIST
   }
}

export function currentCoinSelectedAction(currentCoin: CoinBaseInfo) {
   return {
      type: ActionsTypes.CURRENT_COIN_SELECTED,
      payload: currentCoin
   }
}