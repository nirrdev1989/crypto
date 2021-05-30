import { CoinBaseInfo } from "../../models/Coin";
import { ActionsTypesSideList } from "./actions.types";

export function toggleSideListAction() {
   return {
      type: ActionsTypesSideList.TOGGLE_SIDE_LIST
   }
}

export function currentCoinSelectedAction(currentCoin: CoinBaseInfo) {
   return {
      type: ActionsTypesSideList.CURRENT_COIN_SELECTED,
      payload: currentCoin
   }
}