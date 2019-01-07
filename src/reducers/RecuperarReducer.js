/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    RECUPERAR_CLAVE,
    RECUPERAR_CLAVE_FAILURE,
    RECUPERAR_CLAVE_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case RECUPERAR_CLAVE:
            return { ...state, loading: true };

        case RECUPERAR_CLAVE_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case RECUPERAR_CLAVE_SUCCES:
            return { ...state, loading: false};

        default: return { ...state };
    }
}
