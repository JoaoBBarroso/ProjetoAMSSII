
import { writeSearchedProduct } from "./storage/productScanning";

const FETCH_REQUEST = 'ProductScanning/FETCH_REQUEST';
const FETCH_SUCCESS = 'ProductScanning/FETCH_SUCCESS';
const FETCH_FAILURE = 'ProductScanning/FETCH_FAILURE';
const ADD_HISTORY = 'ProductScanning/ADD_HISTORY';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';

const initialState = {
    searchHistory: [],
    productData: null,
    isLoading: true,
    isLoaded: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                [action.propType]: action[action.propType]
            }
        case FETCH_FAILURE:
            return {
                ...state,
                fetching: false,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            }
        case ADD_HISTORY:

            const { searchHistory } = state;
            let newProduct = action.payload;
            let historyCheck = JSON.parse(JSON.stringify(searchHistory));

            let check = false;
            historyCheck.map((elem) => {
                if (elem.upc === newProduct.upc) {
                    check = true;
                }
            })

            if (!check) {
                console.log(newProduct)
                historyCheck.push(newProduct);
            }

            return {
                ...state,
                searchHistory: historyCheck
            }

        default:
            return state;
    }
}

function fetchRequest() {
    return {
        type: FETCH_REQUEST,
    }
}

function fetchSuccess(data, prop) {
    return {
        type: FETCH_SUCCESS,
        [prop]: data,
        propType: prop
    }
}

function addToHistory(data) {
    console.log(data)
    return {
        type: ADD_HISTORY,
        payload: data
    }
}

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

function saveSearchedProduct(state) {
    writeSearchedProduct(state);
    return state;
}

export function searchProduct(upc) {
    return dispatch => {
        dispatch(fetchRequest());
        fetch(`http://89.115.148.193/api/Food/${upc}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((productData) => {
                dispatch(addToHistory(productData));
                dispatch(fetchSuccess(productData, 'productData'));
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}



