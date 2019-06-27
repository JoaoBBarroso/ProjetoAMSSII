import axios from 'axios';
const FETCH_REQUEST = 'eventsTable/FETCH_REQUEST';
const FETCH_REQUEST_RECOMMENDATION = 'eventsTable/FETCH_REQUEST_RECOMMENDATION';
const FETCH_SUCCESS = 'eventsTable/FETCH_SUCCESS';
const FETCH_SUCCESS_RECOMMENDATION = 'eventsTable/FETCH_SUCCESS_RECOMMENDATION';
const FETCH_FAILURE = 'eventsTable/FETCH_FAILURE';
const FETCH_FAILURE_RECOMMENDATION = 'eventsTable/FETCH_FAILURE_RECOMMENDATION';
const ADD_HISTORY = 'eventsTable/ADD_HISTORY';
const ADD_FAVOURITES = 'eventsTable/ADD_FAVOURITES';
const REMOVE_FAVOURITES = 'eventsTable/REMOVE_FAVOURITES';


const initialState = {
    searchHistory: [],
    searchRecommendations: [],
    favourites: [],
    productData: null,
    isLoading: false,
    isLoadingRecommendation: false,
    isLoaded: false,
    error: null,
    errorRecommendation: null,
}

export default function reducer(state = initialState, action) {

    const { searchHistory, favourites } = state;
    let newFavourites = JSON.parse(JSON.stringify(favourites));

    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                searchRecommendations: [],
            }
        case FETCH_REQUEST_RECOMMENDATION:
            return {
                ...state,
                error: null,
                isLoadingRecommendation: true,
                searchRecommendations: [],
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                [action.propType]: action[action.propType]
            }
        case FETCH_SUCCESS_RECOMMENDATION:
            return {
                ...state,
                isLoadingRecommendation: false,
                [action.propType]: action[action.propType]
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            }
        case FETCH_FAILURE_RECOMMENDATION:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
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

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

function fetchFailureRecommendation(error) {
    return {
        type: FETCH_FAILURE_RECOMMENDATION,
        payload: error
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

export function searchProduct(upc) {
    return dispatch => {
        dispatch(fetchRequest());
        axios({
            method: 'get',
            url: `http://localhost:3001/api/Food/${upc}`,
            responseType: 'application/json',

        })
            .then(function (response) {
                // handle success
                let productData = response.data;
                dispatch(recommendedProducts(upc));
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
            responseType: 'application/json',

        }).then(function (response) {
            let searchRecommendations = response.data;
            dispatch(fetchSuccessRecommendation(searchRecommendations, 'searchRecommendations'));
        })
            .catch((error) => dispatch(fetchFailureRecommendation(error)));
    }
}