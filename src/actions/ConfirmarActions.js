/**
 * Invite Actions
 */
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';

import {
    GET_PENDING_OBJECT,
    GET_PENDING_OBJECT_FAILURE,
    GET_PENDING_OBJECT_SUCCES
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get PENDING OBJECT
 */





export const getPendingObject = () => (dispatch) => {
    dispatch({ type: GET_PENDING_OBJECT });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    if (!clienteSelectJson) {
        clienteSelectJson = {
            _id: '1'
        }
    }
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects?status=pending')
        .then((response) => {
            console.log('response GET_PENDING_OBJECT_SUCCES', response.data);
           
            
            dispatch({ type: GET_PENDING_OBJECT_SUCCES, payload: response.data  });
            
        })
        .catch(error => {
            dispatch({ type: GET_PENDING_OBJECT_FAILURE });
        })
}


/**
 * Redux Action To ADD Invite
 */
export const confirmPending = (id) => (dispatch) => {
    console.log('confirmPending FORM',id);
    
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

   
    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + id,{
        'action': 'setReadyStatus'
    })
        .then((response) => {
            console.log('response confirmPending', response.data);
          
           
        })
        .catch(error => {
           
       
            
        })
}

