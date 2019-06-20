import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import reducer from './Redux/reducers/index'
import reducer from './Redux/index' //JUST FOR TESTING
import productReducer from './Redux/ProductScanning'; //JUST FOR TESTING

const persistConfig = {
    key: 'root',
    storage,
    hardSet
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createReduxStore();
const persistor = persistStore(store)

export function createReduxStore() {
    return createStore(persistedReducer, applyMiddleware(thunk))
}

export function persistedReduxStore() {
    return persistor;
}

//SIMPLER FOR TESTING THUNK
export function createSimpleStore(){
    return createStore(productReducer, applyMiddleware(thunk))
}