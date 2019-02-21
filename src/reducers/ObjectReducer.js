


// action types
import {
    GET_FAVORITES,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE,
} from '../actions/types';



export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_FAVORITES:
            return { ...state, gettingFavorites: true };

        case GET_FAVORITES_SUCCESS:
            return { ...state, gettingFavorites: false, favorites: action.payload.data };
        // get Contratos
        case GET_FAVORITES_FAILURE:
            return { ...state, gettingFavorites: false, error: action.payload.error};

        default: return { ...state };
    }
}

/**
 * initial state
 */
const INIT_STATE = {
    gettingFavorites: false,
    favorites: [],
};