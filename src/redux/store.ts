import { createStore, combineReducers, applyMiddleware } from "redux";
import { coinReducer, updateCoinCurrentPriceSocketReducer } from "./coins/reducers";
import { logger } from "redux-logger";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
   coin: coinReducer,
   updatedCurrentPrice: updateCoinCurrentPriceSocketReducer
})

const middleWeres = [thunk]

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(...middleWeres))