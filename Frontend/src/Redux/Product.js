
const FETCH_REQUEST = 'eventsTable/FETCH_REQUEST';
const FETCH_SUCCESS = 'eventsTable/FETCH_SUCCESS';
const FETCH_FAILURE = 'eventsTable/FETCH_FAILURE';
const FETCH_TEST = 'eventsTable/FETCH_TEST';


const initialState = {
    name: "",
    productData: null,
    data: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                error: null,
                fetching: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                [action.propType]: action[action.propType]
            }
        case FETCH_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case FETCH_TEST:
            return {
                ...state,
                fetching: false,
                error: action.payload
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

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
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
                console.log(productData)
                dispatch(fetchSuccess(productData, 'productData'));
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}