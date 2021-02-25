import { CoinBaseInfo } from "../../models/Coin";

export enum ActionsTypesSideList {
   TOGGLE_SIDE_LIST = 'TOGGLE_SIDE_LIST',
   CURRENT_COIN_SELECTED = 'CURRENT_COIN_SELECTED'
}

export interface ToggleSideListActionType {
   type: ActionsTypesSideList.TOGGLE_SIDE_LIST
}

export interface CurrentCoinSelectedType {
   type: ActionsTypesSideList.CURRENT_COIN_SELECTED,
   payload: CoinBaseInfo

}

export type SideListActions = ToggleSideListActionType | CurrentCoinSelectedType