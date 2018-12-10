/**
 * Invite Actions
 */
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import jwtDecode from 'jwt-decode';
import {
    VALIDATE_INVITE,
    VALIDATE_INVITE_FAILURE,
    VALIDATE_INVITE_SUCCES,
    REGISTRO_INVITE,
    REGISTRO_INVITE_FAILURE,
    REGISTRO_INVITE_SUCCES
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get Invite
 */





/**
 * Redux Action To ADD Invite
 */
export const validateInvite = (webToken) => (dispatch) => {
    console.log('validateInvite FORM',webToken);
    dispatch({ type: VALIDATE_INVITE });
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json'}
      });

   
    instance2.post('v1/invitations/validate',{
        'webToken': webToken
    })
        .then((response) => {
            console.log('invite user',response);
           
            var decode = jwtDecode(response.data.accessToken);
            console.log('decode',decode);
            console.log('decode',decode.user);
            var isUsuario = false;
            if(decode && decode.user && decode.user._id){
                console.log('existe');
                isUsuario = true;
                dispatch(responderInvite(response.data.accessToken));
            }else{
                console.log('no existe');
                isUsuario = false;
                dispatch({ type: VALIDATE_INVITE_SUCCES, usuario: decode.user, accessToken: response.data.accessToken });

            }

        })
        .catch(error => {
            dispatch({ type: VALIDATE_INVITE_FAILURE });
        NotificationManager.error(error.message);
        })
}

export const registroInvite = (usuario,accessToken) => (dispatch) => {
    console.log('registroInvite  usuario',usuario);
    console.log('accessToken ',accessToken);
    dispatch({ type: REGISTRO_INVITE });
  
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + accessToken}
      });

   
    instance2.post('v1/auth/sign-up',{
        'name': usuario.name,
        'email': usuario.email,
        'password': usuario.password

    })
        .then((response) => {
            console.log('registro user',response);
           
            
            dispatch(responderInvite(accessToken));

        })
        .catch(error => {
            console.log('error',error.message);
            if(error.message === 'Request failed with status code 409'){
                console.log('el usuario ya existe');
                dispatch(responderInvite(accessToken));
            }else{
                dispatch({ type: REGISTRO_INVITE_FAILURE });
                NotificationManager.error(error.message);
            }
           
        })
}


export const responderInvite = (accessToken) => (dispatch) => {
    console.log('validateInvite FORM',accessToken);
  
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + accessToken}
      });

   
    instance2.post('v1/invitations/answer',{
        'status': 'accepted'
    })
        .then((response) => {
            console.log('responderInvite ',response);
            
            dispatch({ type: REGISTRO_INVITE_SUCCES, validado: true});
            NotificationManager.success('Validado correctamente');
        })
        .catch(error => {
            dispatch({ type: VALIDATE_INVITE_FAILURE });
        NotificationManager.error(error.message);
        })
}