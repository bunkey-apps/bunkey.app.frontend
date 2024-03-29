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
    ADD_FAVORITOS_FAILURE,
    GET_RECIENTES,
    GET_RECIENTES_FAILURE,
    GET_RECIENTES_SUCCES,
    GET_COMPARTIDOS,
    GET_COMPARTIDOS_FAILURE,
    GET_COMPARTIDOS_SUCCES,
    EDIT_OBJECT_FOLDER,
    CLOSE_OBJECT_FOLDER
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    loadingFavoritos: false,
    loadingRecientes: false,
    items: [],
    userById: [],
    favoritos: [],
    parents: [],
    imageVideos: [],
    parentsFavoritos: [],
    imageVideosFavoritos: [],
    recientes: [],
    loadingCompartidos: false,
    compartidos: [],
    parentsCompartidos: [],
    imageVideosCompartidos: [],
    editarObjetoFolderModal: false
};

export default (state = INIT_STATE, action) => {
    console.log('action type', action);
    
    switch (action.type) {
        case EDIT_OBJECT_FOLDER:
        return { ...state, editarObjetoFolderModal: true };

        case CLOSE_OBJECT_FOLDER:
        return { ...state, editarObjetoFolderModal: false };
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
            return { ...state, loading: true, editarObjetoFolderModal: false };

        case GET_FOLDERS_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_FOLDERS_SUCCES:
            return {
                ...state,
                items: action.payload,
                loading: false,
                parents: action.parents,
                imageVideos: action.imageVideos
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
            return { ...state, loadingFavoritos: true };

        case ADD_FAVORITOS_SUCCES:
            return { ...state,
                 loadingFavoritos: false,
                 favoritos: action.favoritos,
                 parentsFavoritos: action.parentsFavoritos,
                 imageVideosFavoritos: action.imageVideosFavoritos
                 };
        // get Contratos
        case ADD_FAVORITOS_FAILURE:
            return {
                ...state,
                loadingFavoritos: false
                
            };

            case GET_RECIENTES:
            return { ...state, loadingRecientes: true };

        case GET_RECIENTES_SUCCES:
            return { ...state,
                loadingRecientes: false,
                recientes: action.recientes
                 };
        // get Contratos
        case GET_RECIENTES_FAILURE:
            return {
                ...state,
                loadingRecientes: false
                
            };


            case GET_COMPARTIDOS:
            return { ...state, loadingCompartidos: true };

        case GET_COMPARTIDOS_SUCCES:
            
            return { ...state,
                 loadingCompartidos: false,
                 compartidos: action.compartidos,
                 parentsCompartidos: action.parentsCompartidos,
                 imageVideosCompartidos: action.imageVideosCompartidos
                 };
        // get Contratos
        case GET_COMPARTIDOS_FAILURE:
            return {
                ...state,
                loadingCompartidos: false
                
            };




        default: return { ...state };
    }
}
