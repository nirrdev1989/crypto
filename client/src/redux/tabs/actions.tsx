import { ActionsTypesTabs } from "./actions.types";

export function setCurrentTabAction(tabName: string) {
   return {
      type: ActionsTypesTabs.SET_CURRENT_TAB_ACTIVE,
      payload: tabName
   }
}