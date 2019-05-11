
const FETCH_REQUEST = 'eventsTable/FETCH_REQUEST';
const FETCH_SUCCESS = 'eventsTable/FETCH_SUCCESS';
const FETCH_FAILURE = 'eventsTable/FETCH_FAILURE';
const FETCH_ALL_EVENTS = 'eventsTable/FETCH_ALL_EVENTS';


const initialState = {
    name: ""
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
        case FETCH_ALL_EVENTS:
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

function fetchSuccess(eventsTableData, prop) {
    return {
        type: FETCH_SUCCESS,
        [prop]: eventsTableData,
        propType: prop
    }
}

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}


export function getAllProducts() {
    return dispatch => {
        dispatch(fetchRequest());
        fetch(`${process.env.PUBLIC_URL}/listapis`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((eventsTableData) => {

                //Accept only active events
                var activeEvents = []
                eventsTableData.map(function (event) {
                    if (event.isEventActive) {
                        activeEvents.push(event)
                    }
                    return false;
                })

                dispatch(fetchSuccess(activeEvents, 'allAcronyms'))
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}

export function searchProducts() {
    return dispatch => {
        dispatch(fetchRequest());
        fetch(`${process.env.PUBLIC_URL}/listapis`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((eventsTableData) => {

                //Accept only active events
                var activeEvents = []
                eventsTableData.map(function (event) {
                    if (event.isEventActive) {
                        activeEvents.push(event)
                    }
                    return false;
                })

                dispatch(fetchSuccess(activeEvents, 'allAcronyms'))
            })
            .catch((error) => dispatch(fetchFailure(error)));
    }
}