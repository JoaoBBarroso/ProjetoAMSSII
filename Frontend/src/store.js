import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './Redux';

import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers
  
})


export default function configureStore(history) {
  return createStore(
    rootReducer(history),
    applyMiddleware(routerMiddleware(history), thunk),
  )
}