/**
 * Invite Actions
 */
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';

import {
    ADD_INVITE,
    ADD_INVITE_FAILURE,
    ADD_INVITE_SUCCES
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get Invite
 */





/**
 * Redux Action To ADD Invite
 */
export const inviteUser = (usuario) => (dispatch) => {
    console.log('inviteUser FORM',usuario);
    dispatch({ type: ADD_INVITE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

   
    instance2.post('v1/invitations',{
        'fullname': usuario.name,
        'email': usuario.email,
        'client': clienteSelectJson._id
    })
        .then((response) => {
            console.log('invite user',response);
            dispatch({ type: ADD_INVITE_SUCCES});
            NotificationManager.success('Invitado correctamente');
        })
        .catch(error => {
            dispatch({ type: ADD_INVITE_FAILURE });
        NotificationManager.error(error.message);
        })
}


