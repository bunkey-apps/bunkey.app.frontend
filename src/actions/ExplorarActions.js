/**
 * Contratos Actions
 */
import axios from 'axios';
import {
    GET_OBJECT,
    GET_OBJECT_FAILURE,
    GET_OBJECT_SUCCES,
    UPDATE_OBJECT,
    UPDATE_OBJECTS_FAILURE,
    UPDATE_OBJECT_SUCCES,
    DELETE_OBJECT,
    DELETE_OBJECT_FAILURE,
    DELETE_OBJECT_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';






/**
 * Redux Action To Get Contratos
 */
export const getObjects = () => (dispatch) => {
    dispatch({ type: GET_OBJECT });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);

    const folderSelect = localStorage.getItem('folderSelect');
    var   folderSelectJson = JSON.parse(folderSelect);

    console.log('folderSelectJson',folderSelectJson);

    if(!clienteSelectJson){
        clienteSelectJson = {
            _id : '1'
        }
    }
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' +  folderSelectJson._id)
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);
            dispatch({ type: GET_OBJECT_SUCCES, payload: response.data.children, parents: response.data.parents });
            
        })
        .catch(error => {
            // error handling
        })
}

export const createObject = (caperta) => (dispatch) => {
    dispatch({ type: GET_OBJECT });
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
      const folderSelect = localStorage.getItem('folderSelect');
      var   folderSelectJson = JSON.parse(folderSelect);
    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' +  folderSelectJson._id,{
        'name': caperta.name,
        "type": "folder"
    })
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);
            dispatch(getObjects());
                })
        .catch(error => {
            // error handling
        })
}

export const cambiarObject = (caperta) => (dispatch) => {
    dispatch({ type: UPDATE_OBJECT });
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
   
    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' +  caperta._id,{
        'name': caperta.name
    })
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);
            dispatch(getObjects());
        })
        .catch(error => {
            // error handling
        })
}

export const removeObject = (caperta) => (dispatch) => {
    dispatch({ type: DELETE_OBJECT });
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
   
    instance2.delete('/v1/clients/' + clienteSelectJson._id + '/objects/' +  caperta._id,{
       
    })
        .then((response) => {
            console.log('response DELETE_FOLDERS_SUCCES',response);
            dispatch(getObjects());
        })
        .catch(error => {
            // error handling
        })
}






export const uploadArchivo = (detalle, file) => (dispatch) => {
    console.log('GET_URL FORM');
    dispatch({ type: GET_OBJECT });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken},
      });


      console.log('file.type',file.type);
      var tipoArr = file.type.split('/');
   
    instance2.post('/v1/url-signature',{
        clientId: clienteSelectJson._id,
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user',response);
            dispatch(agregarObject(response.data.url,file,response.data.futureFileURL, detalle, tipoArr[0], response.data.uuid))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_OBJECT_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const agregarObject = (urlImage,file,futureFileURL, detalle, tipo, guid) => (dispatch) => {
    console.log('PUT_IMAGE FORM',file);

   // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage',urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: 3000,
        body: file
      });
   
    
      var instance = axios.create();

      instance.put(urlImage, file, {headers: {'Content-Type': file.type}})
          .then(function (result) {
              console.log(result);
              dispatch(updateObject(futureFileURL, detalle, tipo, guid));
              //dispatch({ type: PUT_IMAGE_SUCCES});
          })
          .catch(function (err) {
              console.log(err);
              dispatch({ type: GET_OBJECT_FAILURE})
              NotificationManager.error('A ocurrido un error, intente mas tarde.');

          });
}


export const updateObject = (futureFileURL, detalle, tipo, guid) => (dispatch) => {
    dispatch({ type: GET_OBJECT });
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

      const folderSelect = localStorage.getItem('folderSelect');
      var   folderSelectJson = JSON.parse(folderSelect);
   
    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' +  folderSelectJson._id,{
        'name': detalle.name,
        "type": tipo,
        "originalURL": futureFileURL,
        "guid": guid
    })
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);
            dispatch(getObjects());
                })
        .catch(error => {
            dispatch({ type: GET_OBJECT_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}