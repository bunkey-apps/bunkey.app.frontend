/**
 * Contratos Actions
 */
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    GET_USUARIOS,
    GET_USUARIOS_FAILURE,
    GET_USUARIOS_SUCCES,
    ADD_USUARIOS,
    ADD_USUARIOS_FAILURE,
    ADD_USUARIOS_SUCCES,
    UPDATE_USUARIOS,
    UPDATE_USUARIOS_FAILURE,
    UPDATE_USUARIOS_SUCCES,
    DELETE_USUARIOS,
    DELETE_USUARIOS_FAILURE,
    DELETE_USUARIOS_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





/**
 * Redux Action To Get Contratos
 */
export const getUsuarios = (activePage) => (dispatch) => {
    dispatch({ type: GET_USUARIOS });
    const token = localStorage.getItem('user_id');

    if(!activePage){
        activePage = 1
    }

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get(`v1/clients/${clienteSelectJson._id}/workspaces?page=${activePage}`)
        .then((response) => {
            console.log('headers',response.headers);
            
            const data ={
                data: response.data,
                limit: response.headers['x-pagination-limit'], 
                count: response.headers['x-pagination-total-count'], 
                activePage:activePage
            }
            dispatch({ type: GET_USUARIOS_SUCCES, payload: data });
        })
        .catch(error => {
            // error handling
        })
}

export const addUsuario = (user) => (dispatch) => {
    console.log('addUsuario FORM',user);
    dispatch({ type: ADD_USUARIOS });
    

        console.log('inviteUser FORM',user);
   
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

   
    instance2.post('v1/invitations',{
        'fullname': user.name,
        'email': user.email,
        'client': clienteSelectJson._id
    })
        .then((response) => {
            console.log('invite user',response);
            dispatch(getUsuarios());
            NotificationManager.success('Invitado correctamente');
        })
        .catch(error => {
            dispatch({ type: ADD_USUARIOS_FAILURE});
        NotificationManager.error(error.message);
        })
}

export const updateUserWorkspaceRole = (client, user, role, cb) => (dispatch) => {
    NotificationManager.info('Actualizando el Rol');
    dispatch({ type: UPDATE_USUARIOS });
    const token = localStorage.getItem('user_id');
    const tokenJson = JSON.parse(token);
    axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
        }).put(`v1/users/${user}/workspaces/${client}`,{
            action: 'updateRole',
            role,
        }).then((response) => {
            if (cb) {
                dispatch(getUsuarios());
                cb(response);
                NotificationManager.success('Rol actualizado correctamente.');
            }
        })
        .catch(error => {
            // error handling
            NotificationManager.error(error.message);
        })
}


export const updateUsuario = (user) => (dispatch) => {
    console.log('updateUsuario FORM',user);
    dispatch({ type: UPDATE_USUARIOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('v1/users/' + user._id,{
        email: user.email,
        
        name: user.name,
        role: user.role,
        clietntOwner: ''
    })
        .then((response) => {
            console.log('response user',response);
            dispatch(getUsuarios());
        })
        .catch(error => {
            // error handling
            dispatch({ type: UPDATE_USUARIOS_SUCCES});
        })
}


export const deleteUsuario = (user) => (dispatch) => {
    console.log('deleteUsuario FORM',user);
    dispatch({ type: DELETE_USUARIOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('v1/users/' + user._id + '/workspaces/' + clienteSelectJson._id)
        .then((response) => {
            console.log('response user',response);
            dispatch(getUsuarios());
        })
        .catch(error => {
            // error handling
            dispatch({ type: DELETE_USUARIOS_FAILURE});
        })
}