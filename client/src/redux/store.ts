import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import { coinHostoryReducer, coinReducer, updateCoinCurrentPriceSocketReducer } from "./coins/reducers";
import { logger } from "redux-logger";
import thunk from 'redux-thunk'
import tabsReducer from "./tabs/reducers";
import sideListReducer from "./side-list/reducers";
import modalReducer from "./modal/reducers";
import themeReducer from "./theme/reducer";
import { Dispatch } from "react";
import apiReducer from "./api/reducers";

const rootReducer = combineReducers({
   coin: coinReducer,
   coinHistory: coinHostoryReducer,
   updatedCurrentPrice: updateCoinCurrentPriceSocketReducer,
   tabs: tabsReducer,
   sideList: sideListReducer,
   modal: modalReducer,
   theme: themeReducer,
   apiRequest: apiReducer
})

function myLogger(store: any) {
   return function (next: Dispatch<any>) {
      return function (action: Action) {
         console.log(action)
         next(action)
      }
   }
}

function apiRequest(store: any) {
   return function (next: Dispatch<any>) {
      return function (action: any) {

      }
   }
}

const middleWeres = [myLogger, thunk]

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(...middleWeres))