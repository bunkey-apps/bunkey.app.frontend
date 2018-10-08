/**
 * Contratos Actions
 */
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    GET_URL,
    GET_URL_FAILURE,
    GET_URL_SUCCES,
    PUT_IMAGE,
    PUT_IMAGE_FAILURE,
    PUT_IMAGE_SUCCES,
    PUT_SETTING,
    PUT_SETTING_FAILURE,
    PUT_SETTING_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





export const getUrlFile = (file, tipo) => (dispatch) => {
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


      console.log('file.type',file.type);
      var tipoArr = file.type.split('/');
   
    instance2.post('/v1/url-signature',{
        clientId: clienteSelectJson._id,
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user',response);
            dispatch(addImage(response.data.url,file,tipo,response.data.futureFileURL))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_URL_FAILURE});
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addImage = (urlImage,file,tipo,futureFileURL) => (dispatch) => {
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
              dispatch(updateAcountSetting(tipo,futureFileURL));
              //dispatch({ type: PUT_IMAGE_SUCCES});
          })
          .catch(function (err) {
              console.log(err);
              dispatch({ type: GET_URL_FAILURE})
              NotificationManager.error('A ocurrido un error, intente mas tarde.');

          });
}


export const updateAcountSetting = (tipo, rutaImagen) => (dispatch) => {
    console.log('PUT_SETTING FORM');
    dispatch({ type: PUT_SETTING });
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
      var logo;
      var background;
      if(tipo === 'logo'){
            logo = rutaImagen;
            background = clienteSelectJson.acountSetting.background;
      }else{
        background = rutaImagen;
        logo = clienteSelectJson.acountSetting.logo;
      }
   
    instance2.put('v1/clients/' + clienteSelectJson._id,{
        acountSetting: {
            logo: logo,
            background: background,
            language: 'es'
        }
       
    })
        .then((response) => {
            console.log('response user',response);
            clienteSelectJson.acountSetting =  {
                logo: logo,
                background: background,
                language: 'es'
            };

            console.log('clienteSelectJson',clienteSelectJson);


            localStorage.setItem("clienteSelect", JSON.stringify(clienteSelectJson));


            dispatch({ type: GET_URL_SUCCES });
            NotificationManager.success('Actualizado correctamente');
        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_URL_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}


