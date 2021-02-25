import { createStore, combineReducers, applyMiddleware } from "redux";
import { coinHostoryReducer, coinReducer, updateCoinCurrentPriceSocketReducer } from "./coins/reducers";
import { logger } from "redux-logger";
import thunk from 'redux-thunk'
import tabsReducer from "./tabs/reducers";
import sideListReducer from "./side-list/reducers";
import modalReducer from "./modal/reducers";

const rootReducer = combineReducers({
   coin: coinReducer,
   coinHistory: coinHostoryReducer,
   updatedCurrentPrice: updateCoinCurrentPriceSocketReducer,
   tabs: tabsReducer,
   sideList: sideListReducer,
   modal: modalReducer
})

const middleWeres = [thunk]

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(...middleWeres))