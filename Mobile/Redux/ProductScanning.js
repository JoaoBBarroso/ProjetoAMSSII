
import { writeSearchedProduct } from "./storage/productScanning";

const FETCH_REQUEST = 'ProductScanning/FETCH_REQUEST';
const FETCH_SUCCESS = 'ProductScanning/FETCH_SUCCESS';
const FETCH_FAILURE = 'ProductScanning/FETCH_FAILURE';
const ADD_HISTORY = 'ProductScanning/ADD_HISTORY';
const ADD_FAVOURITES = 'ProductScanning/ADD_FAVOURITES';
const REMOVE_FAVOURITES = 'ProductScanning/REMOVE_FAVOURITES';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';

const initialState = {
    searchHistory: [],
    searchRecommendations: [],
    favourites: [],
    productData: null,
    isLoading: true,
    isLoaded: false,
    error: null
}

export default function reducer(state = initialState, action) {

    const { searchRecommendations, searchHistory, favourites } = state;
    let newSearchRecommendations = JSON.parse(JSON.stringify(searchRecommendations));
    let newFavourites = JSON.parse(JSON.stringify(favourites));

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

            let newProduct = action.payload;
            let historyCheck = JSON.parse(JSON.stringify(searchHistory));

            let check = false;
            historyCheck.map((elem) => {
                if (elem.upc === newProduct.upc) {
                    check = true;
                }
            })

            if (!check) {
                historyCheck.push(newProduct);
            }

            return {
                ...state,
                searchHistory: historyCheck
            }
        case ADD_FAVOURITES:
            
            let newProductToAdd = action.payload;
            let checkAdd = false;

            newFavourites.map((elem) => {
                if (elem.upc === newProductToAdd.upc) {
                    checkAdd = true;
                }
            })
            if (!checkAdd) {
                newFavourites.push(newProductToAdd);
            }

            return {
                ...state,
                favourites: newFavourites
            }

        case REMOVE_FAVOURITES:

            let toDeleteProduct = action.payload;
            let indexToDelete = null;
            let removedArray = [];

            newFavourites.map((elem, index) => {
                if (elem.upc === toDeleteProduct.upc) {
                    indexToDelete = index;
                }
            })
            if (indexToDelete) {
                removedArray = newFavourites.splice(indexToDelete, 1);
            }

            return {
                ...state,
                favourites: removedArray
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
    return {
        type: ADD_HISTORY,
        payload: data
    }
}

function addToFavouritesAction(data) {
    return {
        type: ADD_FAVOURITES,
        payload: data
    }
}

export function addToFavourites(data) {
    return dispatch => {
        dispatch(addToFavouritesAction(data));
    }
}

function removeFromFavouritesAction(data) {
    return {
        type: REMOVE_FAVOURITES,
        payload: data
    }
}

export function removeFromFavourites(data) {
    return dispatch => {
        dispatch(removeFromFavouritesAction(data));
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

export function recommendedProducts(upc) {
    return dispatch => {
        dispatch(fetchRequest());
        fetch(`http://89.115.148.193/api/recommend/${upc}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((searchRecommendations) => {
                dispatch(fetchSuccess(searchRecommendations, 'searchRecommendations'));
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}




