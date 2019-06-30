
import { writeSearchedProduct } from "./storage/productScanning";
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const FETCH_REQUEST = 'ProductScanning/FETCH_REQUEST';
const FETCH_SUCCESS = 'ProductScanning/FETCH_SUCCESS';
const FETCH_FAILURE = 'ProductScanning/FETCH_FAILURE';
const FETCH_REQUEST_RECOMMENDATION = 'ProductScanning/FETCH_REQUEST_RECOMMENDATION';
const FETCH_SUCCESS_RECOMMENDATION = 'ProductScanning/FETCH_SUCCESS_RECOMMENDATION';
const FETCH_FAILURE_RECOMMENDATION = 'ProductScanning/FETCH_FAILURE_RECOMMENDATION';
const ADD_HISTORY = 'ProductScanning/ADD_HISTORY';
const ADD_FAVOURITES = 'ProductScanning/ADD_FAVOURITES';
const REMOVE_FAVOURITES = 'ProductScanning/REMOVE_FAVOURITES';
const SET_HISTORY_PERSISTED = 'ProductScanning/SET_HISTORY_PERSISTED';
const SET_FAVOURITES_PERSISTED = 'ProductScanning/SET_FAVOURITES_PERSISTED';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';

const initialState = {
    searchHistory: [],
    searchRecommendations: [],
    isLoadingRecommendation: false,
    errorRecommendation: null,
    favourites: [],
    productData: null,
    isLoading: true,
    isLoaded: false,
    error: null
}

export default function reducer(state = initialState, action) {

    const { searchHistory, favourites } = state;
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
        case FETCH_REQUEST_RECOMMENDATION:
            return {
                ...state,
                errorRecommendation: null,
                searchRecommendations: [],
                isLoadingRecommendation: true,
            }
        case FETCH_SUCCESS_RECOMMENDATION:
            return {
                ...state,
                isLoadingRecommendation: false,
                [action.propType]: action[action.propType]
            }

        case FETCH_FAILURE_RECOMMENDATION:
            return {
                ...state,
                isLoadingRecommendation: false,
                isLoaded: true,
                searchRecommendations: [],
                errorRecommendation: action.payload
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
                historyCheck.splice(0, 0, newProduct);
                storeSearchHistory(historyCheck);
            }

            return {
                ...state,
                searchHistory: historyCheck
            }
        case ADD_FAVOURITES:

            let newProductToAdd = action.payload;
            let checkAdd = false;

            newFavourites.map((elem, index) => {
                if (elem.upc === newProductToAdd.upc) {
                    checkAdd = true;
                }
            })
            if (!checkAdd) {
                newFavourites.splice(0, 0, newProductToAdd);
                storeFavourites(newFavourites)
            }

            return {
                ...state,
                favourites: newFavourites
            }

        case REMOVE_FAVOURITES:

            let toDeleteProduct = action.payload;
            let indexToDelete = null;

            newFavourites.map((elem, index) => {
                if (elem.upc === toDeleteProduct.upc) {
                    indexToDelete = index;
                }
            })

            if (indexToDelete) {
                newFavourites.splice(indexToDelete, 1);
                storeFavourites(newFavourites)
            }

            return {
                ...state,
                favourites: newFavourites
            }

        case SET_FAVOURITES_PERSISTED:

            let persistedFavourites = action.payload;

            return {
                ...state,
                favourites: persistedFavourites
            }
        case SET_HISTORY_PERSISTED:

            let persistedHistory = action.payload;

            return {
                ...state,
                searchHistory: persistedHistory
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

function fetchRequestRecommendation() {
    return {
        type: FETCH_REQUEST_RECOMMENDATION,
    }
}

function fetchSuccess(data, prop) {
    return {
        type: FETCH_SUCCESS,
        [prop]: data,
        propType: prop
    }
}

function fetchSuccessRecommendation(data, prop) {
    return {
        type: FETCH_SUCCESS_RECOMMENDATION,
        [prop]: data,
        propType: prop
    }
}

function fetchFailureRecommendation(error) {
    return {
        type: FETCH_FAILURE_RECOMMENDATION,
        payload: error
    }
}

export function addToHistory(data) {
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

function setFavouritesAction(data) {
    return {
        type: SET_FAVOURITES_PERSISTED,
        payload: data
    }
}

function setHistoryAction(data) {
    return {
        type: SET_HISTORY_PERSISTED,
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

storeSearchHistory = async (array) => {
    try {
        await AsyncStorage.setItem('@history', JSON.stringify(array));
    } catch (error) {
        console.log(error)
    }
};

storeFavourites = async (array) => {
    try {
        await AsyncStorage.setItem('@favourites', JSON.stringify(array));
    } catch (error) {
        // Error saving data
        console.log(error)
    }
};

export function setHistoryPersisted(data) {
    return dispatch => {
        dispatch(setHistoryAction(data));
    }
}

export function setFavouritesPersisted(data) {
    return dispatch => {
        dispatch(setFavouritesAction(data));
    }
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
        dispatch(fetchRequestRecommendation());
        axios({
            method: 'get',
            url: `http://89.115.148.193/api/recommend/${upc}`,
            responseType: 'json',

        }).then(function (response) {
            let searchRecommendations = response.data;
            storeFavourites(searchRecommendations);
            dispatch(fetchSuccessRecommendation(searchRecommendations, 'searchRecommendations'));
        })
            .catch((error) => dispatch(fetchFailureRecommendation(error)));
    }
}






