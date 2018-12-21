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
export const confirmPending = (objeto) => (dispatch) => {
    console.log('confirmPending FORM',objeto);
    
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

   
    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + objeto.id,{
        'action': 'setReadyStatus'
    })
        .then((response) => {
            console.log('response confirmPending', response.data);
            dispatch(getPendingObject());
           
        })
        .catch(error => {
           
       
            
        })
}

export const updatePendingObject = (objeto) => (dispatch) => {
   
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + objeto.id, {
        'name': objeto.name,
        'metadata':{
            'copyRight': objeto.metadata.copyRight,
            'licenseFile': objeto.metadata.licenseFile,
            'descriptiveTags' : objeto.metadata.descriptiveTags,
            'createdDate': objeto.metadata.createdDate
        }
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            dispatch(confirmPending(objeto));
        })
        .catch(error => {
            // error handling
        })
}







export const changePendingPDF = (file, objetoDesc) => (dispatch) => {
    console.log('changePendingPDF FORM');
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    
    
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    console.log('file.type', file.type);
    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addPendingPDF(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_AVATAR_FAILURE });
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addPendingPDF = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {
    console.log('addPendingPDF FORM', file);

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage', urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: 3000,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type } })
        .then(function (result) {
            console.log(result);
            console.log('antes d33  imagenes', objetoDesc);

            objetoDesc.metadata.licenseFile = futureFileURL;
            console.log('antes de enviara objetoDesc  imagenes', objetoDesc);
            dispatch(updatePendingObject(objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
            dispatch({ type: CHANGE_AVATAR_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}




export const updatePendingRouting = (objectChange) => (dispatch) => {
    console.log('updatePendingRouting');
   
    
    
    
    if(objectChange.isChangePDF){
        dispatch(changePendingPDF(objectChange.filePDF, objectChange))
    }else{
        dispatch(updatePendingObject(objectChange))
    }
   



}



export const confirmAllPending = (objeto) => (dispatch) => {
    console.log('confirmPending FORM',objeto);
    
    dispatch({ type: GET_PENDING_OBJECT })

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

   
    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects' ,{
        'action': 'setReadyStatus',
        'objects': objeto
    })
        .then((response) => {
            console.log('response confirmPending', response.data);
          dispatch(getPendingObject());
           
        })
        .catch(error => {
           
            dispatch(getPendingObject());
            
        })
}