/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_CONTRATOS,
    GET_CONTRATOS_FAILURE,
    GET_CONTRATOS_SUCCES,
    ADD_CONTRATOS,
    ADD_CONTRATOS_SUCCES,
    ADD_CONTRATOS_FAILURE,
    UPDATE_CONTRATOS,
    UPDATE_CONTRATOS_SUCCES,
    UPDATE_CONTRATOS_FAILURE,
    DELETE_CONTRATOS,
    DELETE_CONTRATOS_SUCCES,
    DELETE_CONTRATOS_FAILURE
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

        case GET_CONTRATOS:
            return { ...state, loading: true };

            case GET_CONTRATOS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_CONTRATOS_SUCCES:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case ADD_CONTRATOS:
            return { ...state, loading: true };

        // get Contratos
        case ADD_CONTRATOS_SUCCES:
            return {
                ...state,
                loading: false
            };

        case UPDATE_CONTRATOS:
            return { ...state, loading: true };

        // get Contratos
        case UPDATE_CONTRATOS_SUCCES:
            return {
                ...state,
                loading: false
            };
        
        case DELETE_CONTRATOS:
            return { ...state, loading: true };

        // get Contratos
        case DELETE_CONTRATOS_SUCCES:
            return {
                ...state,
                loading: false
            };
        default: return { ...state };
    }
}
