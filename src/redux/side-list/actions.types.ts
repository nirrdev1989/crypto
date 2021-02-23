import { CoinBaseInfo } from "../../models/Coin";

export enum ActionsTypes {
   TOGGLE_SIDE_LIST = 'TOGGLE_SIDE_LIST',
   CURRENT_COIN_SELECTED = 'CURRENT_COIN_SELECTED'
}

export interface ToggleSideListActionType {
   type: ActionsTypes.TOGGLE_SIDE_LIST
}

export interface CurrentCoinSelectedType {
   type: ActionsTypes.CURRENT_COIN_SELECTED,
   payload: CoinBaseInfo

}

export type SideListActions = ToggleSideListActionType | CurrentCoinSelectedType