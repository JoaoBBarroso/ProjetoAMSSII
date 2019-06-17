import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import reducer from './Redux/reducers/index'

const persistConfig = {
    key: 'root',
    storage,
    hardSet
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createReduxStore();
const persistor = persistStore(store)


export function createReduxStore() {
    return createStore(persistedReducer)
}

export function persistedReduxStore() {
    return persistor;
}