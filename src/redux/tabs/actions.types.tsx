export enum ActionsTypes {
   SET_CURRENT_TAB_ACTIVE = 'SET_CURRENT_TAB_ACTIVE',
}

export interface SetCurrentTabActiveActionType {
   type: ActionsTypes.SET_CURRENT_TAB_ACTIVE
   payload: string
}

export type TabsActions = SetCurrentTabActiveActionType
