/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_COMPARTIDOS_INVITADOS,
    GET_COMPARTIDOS_INVITADOS_FAILURE,
    GET_COMPARTIDOS_INVITADOS_SUCCES,
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

        case GET_COMPARTIDOS_INVITADOS:
            return { ...state, loading: true, validado: false };

        case GET_COMPARTIDOS_INVITADOS_FAILURE:
            return { ...state, loading: false , validado: false};
        // get Contratos
        case GET_COMPARTIDOS_INVITADOS_SUCCES:
        return {
            ...state,
            items: action.payload,
            loading: false,
            parents: action.parents,
            imageVideos: action.imageVideos
        };

        default: return { ...state };
    }
}
