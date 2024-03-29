/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    GET_SEARCH,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCES,
    EDIT_OBJECT_SEARCH,
    CLOSE_OBJECT_SEARCH
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
    editarObjetoSearchModal: false,
    limit: 10,
    totalCount: 1,
    pageActive: 1,
    loadingImg: false
   
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case EDIT_OBJECT_SEARCH:
        return { ...state, editarObjetoSearchModal: true };

        case CLOSE_OBJECT_SEARCH:
        return { ...state, editarObjetoSearchModal: false };

        case GET_SEARCH:
            return { ...state, loading: true, editarObjetoSearchModal: false, loadingImg:action.loadingImg};

        case GET_SEARCH_FAILURE:
            return { ...state, loading: false };
        // get Contratos
        case GET_SEARCH_SUCCES:
            return {
                items: action.payload,
                loading: false,
                parents: action.parents,
                imageVideos: action.imageVideos,
                limit: action.limit, totalCount: action.totalCount, pageActive: action.pageActive,
                loadingImg: action.loadingImg,
            };
        
        default: return { ...state };
    }
}
