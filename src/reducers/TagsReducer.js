/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_TAGS,
    GET_TAGS_FAILURE,
    GET_TAGS_SUCCES,
    ADD_TAGS,
    ADD_TAGS_FAILURE,
    ADD_TAGS_SUCCES,
    UPDATE_TAGS,
    UPDATE_TAGS_FAILURE,
    UPDATE_TAGS_SUCCES,
    DELETE_TAGS,
    DELETE_TAGS_FAILURE,
    DELETE_TAGS_SUCCES
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

        case GET_TAGS:
            return { ...state, loading: true };

        // get TAGS
        case GET_TAGS_SUCCES:
            return {
                ...state,
                items: action.payload,
                loading: false
            };

        case ADD_TAGS:
            return { ...state, loading: false };
         case ADD_TAGS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case ADD_TAGS_SUCCES:
            return {
                ...state,
                
                loading: true
            };

            case UPDATE_TAGS:
            return { ...state, loading: false };
         case UPDATE_TAGS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case UPDATE_TAGS_SUCCES:
            return {
                ...state,
                
                loading: true
            };

            case DELETE_TAGS:
            return { ...state, loading: false };
         case DELETE_TAGS_FAILURE:
            return { ...state, loading: false };
        // ADD Client
        case DELETE_TAGS_SUCCES:
            return {
                ...state,
                
                loading: true
            };
        default: return { ...state };
    }
}
