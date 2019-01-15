/**
 * Contratos Actions
 */
import axios from 'axios';
import {
    GET_TAGS,
    GET_TAGS_FAILURE,
    GET_TAGS_SUCCES,
    ADD_TAGS,
    ADD_TAGS_FAILURE,
    ADD_TAGS_SUCCES,
    UPDATE_TAGS,
    UPDATE_TAGS_FAILURE,
    UPDATE_TAGS_SUCCES,
    DELETE_TAGS,
    DELETE_TAGS_FAILURE,
    DELETE_TAGS_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





/**
 * Redux Action To Get Contratos
 */
export const getTags = () => (dispatch) => {
    dispatch({ type: GET_TAGS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('v1/admin/tags')
        .then((response) => {
            console.log('response tags',response);
            dispatch({ type: GET_TAGS_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
        })
}

export const addTags = (tag) => (dispatch) => {
    console.log('addTags FORM',tag);
    dispatch({ type: ADD_TAGS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.post('v1/admin/tags',{
        name: tag.name
    })
        .then((response) => {
            console.log('response tag',response);
            dispatch({ type: ADD_TAGS_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: ADD_TAGS_FAILURE});
        })
}


export const updateTags = (tag) => (dispatch) => {
    console.log('updateTags FORM',tag);
    dispatch({ type: UPDATE_TAGS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('v1/admin/tags/' + tag._id,{
        name: tag.name
    })
        .then((response) => {
            console.log('response tag',response);
            dispatch({ type: ADD_TAGS_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: UPDATE_TAGS_SUCCES});
        })
}


export const deleteTag = (tag) => (dispatch) => {
    console.log('deleteTag FORM',tag);
    dispatch({ type: DELETE_TAGS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('v1/admin/tags/' + tag._id)
        .then((response) => {
            console.log('response tag',response);
            dispatch({ type: DELETE_TAGS_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: DELETE_TAGS_FAILURE});
        })
}