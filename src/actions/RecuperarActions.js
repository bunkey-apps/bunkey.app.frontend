/**
 * Invite Actions
 */
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import jwtDecode from 'jwt-decode';
import {
    RECUPERAR_CLAVE,
    RECUPERAR_CLAVE_FAILURE,
    RECUPERAR_CLAVE_SUCCES
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get Invite
 */





/**
 * Redux Action To ADD Invite
 */
export const recuperarClave = (email) => (dispatch) => {
    console.log('validateInvite FORM',email);
    dispatch({ type: RECUPERAR_CLAVE });
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json'}
      });

   
    instance2.post('v1/recovery-password',{
        'email': email
    })
        .then((response) => {
            
            dispatch({ type: RECUPERAR_CLAVE_SUCCES});
            NotificationManager.success('Se a enviado a tu correo la nueva clave');


        })
        .catch(error => {
            dispatch({ type: RECUPERAR_CLAVE_FAILURE });
        NotificationManager.error(error.message);
        })
}
