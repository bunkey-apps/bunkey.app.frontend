/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_OBJECT,
    GET_OBJECT_FAILURE,
    GET_OBJECT_SUCCES,
    UPDATE_OBJECT,
    UPDATE_OBJECTS_FAILURE,
    UPDATE_OBJECT_SUCCES,
    DELETE_OBJECT,
    DELETE_OBJECT_FAILURE,
    DELETE_OBJECT_SUCCES,
    AGREGAR_FAVORITOS,
    AGREGAR_FAVORITOS_FAILURE,
    AGREGAR_FAVORITOS_SUCCES,
    EDIT_OBJECT_EXPLORAR,
    CLOSE_OBJECT_EXPLORAR
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    items: [],
    userById: [],
    parents: [],
    imageVideos: [],
    editarObjetoModal: false
    
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case EDIT_OBJECT_EXPLORAR:
        return { ...state, editarObjetoModal: true };

        case CLOSE_OBJECT_EXPLORAR:
        return { ...state, editarObjetoModal: false };


        case GET_OBJECT:
            return { ...state, loading: true };

        case GET_OBJECT_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_OBJECT_SUCCES:
        console.log('imageVideos',action.imageVideos);
            return {
                ...state,
                items: action.payload,
                loading: false,
                parents: action.parents,
                imageVideos: action.imageVideos
            };
        case UPDATE_OBJECT:
            return { ...state, loading: true, editarObjetoModal: false };

        case UPDATE_OBJECTS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case UPDATE_OBJECT_SUCCES:
            return {
                ...state,
                loading: false
            };

        case DELETE_OBJECT:
            return { ...state, loading: true };

        case DELETE_OBJECT_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case DELETE_OBJECT_SUCCES:
            return {
                ...state,
                loading: false
            };

            case AGREGAR_FAVORITOS:
            return { ...state, loading: true };

        case AGREGAR_FAVORITOS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case AGREGAR_FAVORITOS_SUCCES:
            return {
                ...state,
                loading: false
            };
        default: return { ...state };
    }
}
