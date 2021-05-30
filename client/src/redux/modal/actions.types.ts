export enum ActionsTypesModal {
   TOGGLE_MODAL = 'TOGGLE_MODAL'
}

export interface ToggleModalActionType {
   type: ActionsTypesModal.TOGGLE_MODAL
}

export type ModalActions = ToggleModalActionType