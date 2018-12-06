/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    ADD_INVITE,
    ADD_INVITE_FAILURE,
    ADD_INVITE_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case ADD_INVITE:
            return { ...state, loading: true };

        case ADD_INVITE_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case ADD_INVITE_SUCCES:
            return { ...state, loading: false };

        default: return { ...state };
    }
}
