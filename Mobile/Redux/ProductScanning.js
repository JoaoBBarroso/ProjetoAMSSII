


const FETCH_REQUEST = 'ProductScanning/FETCH_REQUEST';
const FETCH_SUCCESS = 'ProductScanning/FETCH_SUCCESS';
const FETCH_FAILURE = 'ProductScanning/FETCH_FAILURE';
const SEARCH_PRODUCT = 'ProductScanning/SEARCH_PRODUCT';


const initialState = {
    productData: null,
    isLoading: false,
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
        case SEARCH_PRODUCT:
            const { productData } = state;
            const upc = action.payload;

            productData = fetch(`http://192.168.1.92:3001/api/food/${upc}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data;
                })
                .catch((error) => dispatch(fetchFailure(error)));

            const newState = { productData }
            return newState;
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

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

export function searchProduct(upc) {
    return dispatch => {
        dispatch(fetchRequest());
        fetch(`http://192.168.1.92:3001/api/food/${upc}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((productData) => {
                console.log(productData)
                dispatch(fetchSuccess(productData, 'productData'))
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}


