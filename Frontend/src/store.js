import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducers from './Redux';

export default function configureStore(history) {
  return createStore(
    combineReducers({
      routerReducer,
      ...reducers
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  )
}