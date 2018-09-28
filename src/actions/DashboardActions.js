/**
 * Contratos Actions
 */
import axios from 'axios';
import {
    GET_USER_DETAILS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_SUCCES,
    GET_USER_BY_ID,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_SUCCES,
    GET_FOLDERS,
    GET_FOLDERS_FAILURE,
    GET_FOLDERS_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





/**
 * Redux Action To Get Contratos
 */
export const getUserDetails = () => (dispatch) => {
    dispatch({ type: GET_USER_DETAILS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('v1/users/me')
        .then((response) => {
            console.log('response GET_USER_DETAILS',response);
            dispatch({ type: GET_USER_DETAILS_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
        })
}

/**
 * Redux Action To Get Contratos
 */
export const getUserById = (id) => (dispatch) => {
    dispatch({ type: GET_USER_BY_ID });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('/v1/clients/' + id)
        .then((response) => {
            console.log('response GET_USER_id',response);
            dispatch({ type: GET_USER_BY_ID_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
        })
}

/**
 * Redux Action To Get Contratos
 */
export const getFolders = () => (dispatch) => {
    dispatch({ type: GET_FOLDERS });
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
   
    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' +  clienteSelectJson.root)
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES',response);
            dispatch({ type: GET_FOLDERS_SUCCES, payload: response.data.children });
        })
        .catch(error => {
            // error handling
        })
}

export const createFolder = (caperta) => (dispatch) => {
    dispatch({ type: GET_FOLDERS });
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
   
    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' +  clienteSelectJson.root,{
        'name': caperta.name,
        "type": "folder"
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES',response);
            dispatch({ type: GET_FOLDERS_SUCCES, payload: response.data.children });
        })
        .catch(error => {
            // error handling
        })
}