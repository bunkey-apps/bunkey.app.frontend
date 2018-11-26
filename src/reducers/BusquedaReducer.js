/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_SEARCH,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    items: [],
    userById: [],
    parents: [],
    imageVideos: []
   
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

   
        case GET_SEARCH:
            return { ...state, loading: true };

        case GET_SEARCH_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_SEARCH_SUCCES:
            return {
                items: action.payload,
                loading: false,
                parents: action.parents,
                imageVideos: action.imageVideos
            };
        
        default: return { ...state };
    }
}
