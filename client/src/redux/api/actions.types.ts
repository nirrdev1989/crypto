export enum ActionsTypesApi {
   REQUEST_START = 'REQUEST_START',
   REQUEST_FAIL = 'REQUEST_FAIL',
   REQUEST_DONE = 'REQUEST_DONE'
}

export interface RequestStartActionType {
   type: ActionsTypesApi.REQUEST_START
}


export interface RequestFailActionType {
   type: ActionsTypesApi.REQUEST_FAIL
   payload: string
}


export interface RequestDoneActionType {
   type: ActionsTypesApi.REQUEST_DONE
}

export type ApiActions =
   RequestStartActionType |
   RequestFailActionType |
   RequestDoneActionType