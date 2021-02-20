import { ActionsTypes, TabsActions } from "./actions.types";


interface TabsInitialState {
   currentTab: string
}

const INITIAL_STATE_TABS: TabsInitialState = {
   currentTab: 'prices'
}

export default function tabsReducer(state = INITIAL_STATE_TABS, action: TabsActions) {
   switch (action.type) {
      case ActionsTypes.SET_CURRENT_TAB_ACTIVE:
         return {
            ...state,
            currentTab: action.payload
         }
      default:
         return state
   }
}