import { ActionsTypes } from "./actions.types";

export function setCurrentTabAction(tabName: string) {
   return {
      type: ActionsTypes.SET_CURRENT_TAB_ACTIVE,
      payload: tabName
   }
}