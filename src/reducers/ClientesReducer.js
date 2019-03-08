/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_CLIENTES,
    GET_CLIENTES_FAILURE,
    GET_CLIENTES_SUCCES,
    ADD_CLIENTES,
    ADD_CLIENTES_SUCCES,
    ADD_CLIENTES_FAILURE,
    UPDATE_CLIENTES,
    UPDATE_CLIENTES_FAILURE,
    UPDATE_CLIENTES_SUCCES,
    DELETE_CLIENTES,
    DELETE_CLIENTES_FAILURE,
    DELETE_CLIENTES_SUCCES,
    GET_CLIENTES_BY_ID_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    items: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_CLIENTES:
            return { ...state, loading: true };
        case GET_CLIENTES_FAILURE:
            return { ...state, loading: false };

        // get Client
        case GET_CLIENTES_SUCCES:
        console.log('client reducer', action.payload);
        
            return {
                ...state,
                items: action.payload.data,
                loading: false,
                count: action.payload.count,
                limit:action.payload.limit,
                activePage: action.payload.activePage
            };
            case GET_CLIENTES_BY_ID_SUCCES:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case ADD_CLIENTES:
            return { ...state, loading: false };
         case GET_CLIENTES_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case ADD_CLIENTES_SUCCES:
            return {
                ...state,
                items: [],
                loading: true
            };

        case UPDATE_CLIENTES:
            return { ...state, loading: false };
         case UPDATE_CLIENTES_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case UPDATE_CLIENTES_SUCCES:
            return {
                ...state,
                items: [],
                loading: true
            };

            case DELETE_CLIENTES:
            return { ...state, loading: false };
         case DELETE_CLIENTES_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case DELETE_CLIENTES_SUCCES:
            return {
                ...state,
                loading: true
            };
        default: return { ...state };
    }
}
