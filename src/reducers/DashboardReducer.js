/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_USER_DETAILS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_SUCCES,
    GET_USER_BY_ID,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_SUCCES,
    GET_FOLDERS,
    GET_FOLDERS_FAILURE,
    GET_FOLDERS_SUCCES,
    UPDATE_FOLDERS,
    UPDATE_FOLDERS_FAILURE,
    UPDATE_FOLDERS_SUCCES,
    DELETE_FOLDERS,
    DELETE_FOLDERS_FAILURE,
    DELETE_FOLDERS_SUCCES,
    ADD_FAVORITOS,
    ADD_FAVORITOS_SUCCES,
    ADD_FAVORITOS_FAILURE
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    items: [],
    userById: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_USER_DETAILS:
            return { ...state, loading: true };

        case GET_USER_DETAILS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_USER_DETAILS_SUCCES:
            return {
                ...state,
                loading: false
            };
        case GET_USER_BY_ID:
            return { ...state, loading: true };

        case GET_USER_BY_ID_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_USER_BY_ID_SUCCES:
            return {
                ...state,
                userById: action.payload,
                loading: false
            };

        case GET_FOLDERS:
            return { ...state, loading: true };

        case GET_FOLDERS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_FOLDERS_SUCCES:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case UPDATE_FOLDERS:
            return { ...state, loading: true };

        case UPDATE_FOLDERS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case UPDATE_FOLDERS_SUCCES:
            return {
                ...state,
                loading: false
            };

        case DELETE_FOLDERS:
            return { ...state, loading: true };

        case DELETE_FOLDERS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case DELETE_FOLDERS_SUCCES:
            return {
                ...state,
                loading: false
            };

            case ADD_FAVORITOS:
            return { ...state, loading: true };

        case ADD_FAVORITOS_SUCCES:
            return { ...state, loading: false };
        // get Contratos
        case ADD_FAVORITOS_FAILURE:
            return {
                ...state,
                loading: false
            };
        default: return { ...state };
    }
}
