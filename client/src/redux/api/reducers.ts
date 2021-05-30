import { ActionsTypesApi, ApiActions } from "./actions.types"


export interface ApiInitialState {
   loading: boolean
   error: string
}

const API_INITIAL_STATE: ApiInitialState = {
   loading: false,
   error: ''
}

export default function apiReducer(state = API_INITIAL_STATE, action: ApiActions): ApiInitialState {
   switch (action.type) {
      case ActionsTypesApi.REQUEST_START:
         return {
            loading: true,
            error: ''
         }
      case ActionsTypesApi.REQUEST_FAIL:
         return {
            loading: true,
            error: action.payload
         }
      case ActionsTypesApi.REQUEST_DONE:
         return {
            loading: false,
            error: ''
         }
      default:
         return state
   }
}