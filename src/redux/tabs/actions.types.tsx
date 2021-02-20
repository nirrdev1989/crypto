export enum ActionsTypes {
   SET_CURRENT_TAB_ACTIVE = 'SET_CURRENT_TAB_ACTIVE',
}

export interface SetCurrentTabActiveAction {
   type: ActionsTypes.SET_CURRENT_TAB_ACTIVE
   payload: string
}

export type TabsActions = SetCurrentTabActiveAction
