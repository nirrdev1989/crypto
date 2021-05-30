import { ActionsTypesTabs, TabsActions } from "./actions.types";


interface TabsInitialState {
   currentTab: string
}

const INITIAL_STATE_TABS: TabsInitialState = {
   currentTab: 'prices'
}

export default function tabsReducer(state = INITIAL_STATE_TABS, action: TabsActions): TabsInitialState {
   switch (action.type) {
      case ActionsTypesTabs.SET_CURRENT_TAB_ACTIVE:
         return {
            ...state,
            currentTab: action.payload
         }
      default:
         return state
   }
}