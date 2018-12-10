/**
 * Feedbacks Reducers
 */
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';

// action types
import {
    VALIDATE_INVITE,
    VALIDATE_INVITE_FAILURE,
    VALIDATE_INVITE_SUCCES,
    REGISTRO_INVITE,
    REGISTRO_INVITE_FAILURE,
    REGISTRO_INVITE_SUCCES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    loading: false,
    usuario: [],
    accessToken: '',
    validado: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case VALIDATE_INVITE:
            return { ...state, loading: true, validado: false };

        case VALIDATE_INVITE_FAILURE:
            return { ...state, loading: false , validado: false};
        // get Contratos
        case VALIDATE_INVITE_SUCCES:
        console.log('isUsuario4',action.isUsuario);
            return { ...state,
                 loading: false ,
                 usuario: action.usuario,
                 accessToken: action.accessToken,
                  validado: false
                 };

                 case REGISTRO_INVITE:
                 return { ...state, loading: true, validado: false };
     
             case REGISTRO_INVITE_FAILURE:
                 return { ...state, loading: false };
             // get Contratos
             case REGISTRO_INVITE_SUCCES:
                 return { ...state,
                      loading: false ,
                      validado: action.validado
                     
                      };

        default: return { ...state };
    }
}
