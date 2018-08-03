/**
 * Contratos Actions
 */
import axios from 'axios';
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
export const getUsuarios = () => (dispatch) => {
    dispatch({ type: GET_USUARIOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('v1/admin/users')
        .then((response) => {
            console.log('response usuarios2',response);
            dispatch({ type: GET_USUARIOS_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
        })
}

export const addUsuario = (user) => (dispatch) => {
    console.log('addUsuario FORM',user);
    dispatch({ type: ADD_USUARIOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.post('v1/admin/users',{
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        clietntOwner: ''
    })
        .then((response) => {
            console.log('response user',response);
            dispatch({ type: ADD_USUARIOS_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: ADD_USUARIOS_FAILURE});
        })
}


export const updateUsuario = (user) => (dispatch) => {
    console.log('updateUsuario FORM',user);
    dispatch({ type: UPDATE_USUARIOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('v1/admin/users/' + user._id,{
        email: user.email,
        
        name: user.name,
        role: user.role,
        clietntOwner: ''
    })
        .then((response) => {
            console.log('response user',response);
            dispatch({ type: ADD_USUARIOS_SUCCES });
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

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('v1/admin/users/' + user._id)
        .then((response) => {
            console.log('response user',response);
            dispatch({ type: DELETE_USUARIOS_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: DELETE_USUARIOS_FAILURE});
        })
}