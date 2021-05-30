import { ActionsTypesApi } from "./actions.types";


export function requestStartAction() {
   return {
      type: ActionsTypesApi.REQUEST_START
   }
}

export function requestFailAction(error: string) {
   return {
      type: ActionsTypesApi.REQUEST_FAIL,
      payload: error
   }
}

export function requestDoneAction() {
   return {
      type: ActionsTypesApi.REQUEST_DONE
   }
}