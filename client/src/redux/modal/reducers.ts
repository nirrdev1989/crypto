import { ActionsTypesModal, ModalActions } from "./actions.types";

interface ModalInitialState {
   open: boolean
}

const INITIAL_STATE_MODAL: ModalInitialState = {
   open: false,
}

export default function modalReducer(state = INITIAL_STATE_MODAL, action: ModalActions) {
   switch (action.type) {
      case ActionsTypesModal.TOGGLE_MODAL:
         return {
            ...state,
            open: !state.open
         }
      default:
         return state
   }
}