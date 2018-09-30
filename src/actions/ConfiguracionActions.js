/**
 * Contratos Actions
 */
import axios from 'axios';
import {
    GET_URL,
    GET_URL_FAILURE,
    GET_URL_SUCCES,
    PUT_IMAGE,
    PUT_IMAGE_FAILURE,
    PUT_IMAGE_SUCCES,
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





export const getUrlFile = () => (dispatch) => {
    console.log('GET_URL FORM');
    dispatch({ type: GET_URL });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken},
      });
   
    instance2.post('/v1/url-signature',{
        clientId: clienteSelectJson._id,
        extention: 'png',
        mimeType: 'image/png'
    })
        .then((response) => {
            console.log('response user',response);
            dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_URL_FAILURE});
        })
}

export const addImage = (urlImage,file) => (dispatch) => {
    console.log('PUT_IMAGE FORM');
    dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage',urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: 3000,
        body: file
      });
   
    instance2.put()
        .then((response) => {
            console.log('response bod',response);
            dispatch({ type: PUT_IMAGE_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: PUT_IMAGE_FAILURE});
        })
}


