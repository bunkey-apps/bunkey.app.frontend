/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_USUARIOS,
    GET_USUARIOS_FAILURE,
    GET_USUARIOS_SUCCES,
    ADD_USUARIOS,
    ADD_USUARIOS_FAILURE,
    ADD_USUARIOS_SUCCES,
    UPDATE_USUARIOS,
    UPDATE_USUARIOS_FAILURE,
    UPDATE_USUARIOS_SUCCES,
    DELETE_USUARIOS,
    DELETE_USUARIOS_FAILURE,
    DELETE_USUARIOS_SUCCES
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

        case GET_USUARIOS:
            return { ...state, loading: true };

        // get Usuarios
        case GET_USUARIOS_SUCCES:
            return {
                ...state,
                items: action.payload.data,
                loading: false,
                // count: action.payload.count,
                // limit:action.payload.limit,
                // activePage: action.payload.activePage
            };

        case ADD_USUARIOS:
            return { ...state, loading: false };
         case ADD_USUARIOS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case ADD_USUARIOS_SUCCES:
            return {
                ...state,
                
                loading: true
            };

            case UPDATE_USUARIOS:
            return { ...state, loading: false };
         case UPDATE_USUARIOS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case UPDATE_USUARIOS_SUCCES:
            return {
                ...state,
                
                loading: true
            };

            case DELETE_USUARIOS:
            return { ...state, loading: false };
         case DELETE_USUARIOS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case DELETE_USUARIOS_SUCCES:
            return {
                ...state,
                
                loading: true
            };
        default: return { ...state };
    }
}
