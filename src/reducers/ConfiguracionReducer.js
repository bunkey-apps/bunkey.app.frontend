/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_URL,
    GET_URL_FAILURE,
    GET_URL_SUCCES,
    PUT_IMAGE,
    PUT_IMAGE_FAILURE,
    PUT_IMAGE_SUCCES,
    PUT_SETTING,
    PUT_SETTING_FAILURE,
    PUT_SETTING_SUCCES
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

        case GET_URL:
            return { ...state, loading: true };

        case GET_URL_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_URL_SUCCES:
            return {
                ...state,
                loading: false
            };
        case PUT_IMAGE:
            return { ...state, loading: true };

        case PUT_IMAGE_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case PUT_IMAGE_SUCCES:
            return {
                ...state,
                loading: false
            };

        case PUT_SETTING:
            return { ...state, loading: true };

        case PUT_SETTING_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case PUT_SETTING_SUCCES:
            return {
                ...state,
                loading: false
            };
        default: return { ...state };
    }
}
