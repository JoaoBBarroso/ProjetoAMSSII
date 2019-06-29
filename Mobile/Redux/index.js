
import { combineReducers } from 'redux';
import productReducer from './ProductScanning';


export default combineReducers({
    product: productReducer,
});