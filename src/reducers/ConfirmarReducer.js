/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_PENDING_OBJECT,
    GET_PENDING_OBJECT_FAILURE,
    GET_PENDING_OBJECT_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    items: [],
    limit: 10,
    totalCount: 1,
    pageActive: 1
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_PENDING_OBJECT:
            return { ...state, loading: true, items: [] };

        case GET_PENDING_OBJECT_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_PENDING_OBJECT_SUCCES:
            return { ...state, loading: false, items: action.payload, limit: action.limit, totalCount: action.totalCount, pageActive: action.pageActive };

        default: return { ...state };
    }
}
