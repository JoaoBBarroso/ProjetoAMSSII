import isProd from '../config/index';
import path from '../config/path';
const FETCH_REQUEST = 'user/FETCH_REQUEST';
const FETCH_SUCCESS = 'user/FETCH_SUCCESS';
const FETCH_FAILURE = 'user/FETCH_FAILURE';

const initialState = {
    user: {
        name: '',
    },
    error: undefined,
    fetching: true,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case FETCH_SUCCESS:
            var { user } = action.payload
            return {
                ...state,
                fetching: false,
                user: user
            }
        case FETCH_FAILURE:
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

function fetchSuccess(user) {
    return {
        type: FETCH_SUCCESS,
        payload: {
            user
        }
    }
}

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

export let getUser

if(isProd){
    getUser = function getUser(role, idList, callback) {
        return dispatch => {
            dispatch(fetchRequest());
            fetch( path + '/api/login', {
                mode: 'cors'
            })
                .then((response) => {
                    if (response.status === 401){
                        callback();
                    }
                        
                    if (!response.ok){
                        dispatch(fetchFailure(response.statusText));
                    }
                    return response.json();
                })
                .then((data) => {
                    dispatch(fetchSuccess(JSON.parse(data)))
                })
                .catch((error) => {
                    dispatch(fetchFailure(error))
                });
        }
    }
}else{
    getUser = function getUserDEV(role, idList, callback) {
        return dispatch => {
            dispatch(fetchRequest());
            dispatch(fetchSuccess({ID: "1", Name: 'João Barroso', Email: 'joaodb.barroso@gmail.com', ActiveRole: {Role: {Name: 'administrator'}, Event: null}}))
            dispatch(fetchSuccess({ID: "2", Name: 'Rui Borges', Email: '.@gmail.com', ActiveRole: {Role: {Name: 'administrator'}, Event: null}}))
        }
    }
}
