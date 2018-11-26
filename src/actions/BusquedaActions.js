/**
 * Contratos Actions
 */
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    GET_SEARCH,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCES,
   
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';



export const getSearch = () => (dispatch) => {
    dispatch({ type: GET_SEARCH });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);

    const folderSelect = localStorage.getItem('folderSelect');
    var   folderSelectJson = JSON.parse(folderSelect);

    console.log('folderSelectJson',folderSelectJson);

    const textoBusqeuda = localStorage.getItem('textoBusqeuda');
    
    console.log('textoBusqeuda',textoBusqeuda);

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
   
      instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects?search=' + textoBusqeuda)
      .then((response) => {
            console.log('response search',response);
            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data){
                for(var i=0;i<response.data.length;i++){
                    if(response.data[i].type !== 'folder'){
                        console.log('response.data[i]',response.data[i]);
                        
                        if(cont === 4){
                            cont = 0;
                            collapseRows ++;
                        }


                        if(cont === 0){
                            response.data[i].marginLeft = '0%';
                            response.data[i].paddingLeft = '10%';
                            response.data[i].createRowCollapse = true;
                            
                        }
                        if(cont === 1){
                            response.data[i].marginLeft = '-110%';
                            response.data[i].paddingLeft = '36%';
                        }
                        if(cont === 2){
                            response.data[i].marginLeft = '-220%';
                            response.data[i].paddingLeft = '62%';
                        }
                        if(cont === 3){
                            response.data[i].marginLeft = '-330%';
                            response.data[i].paddingLeft = '87%';
                        }
                        response.data[i].rowCollapse = 'collapse' + collapseRows;

                        arrImageVideo.push(response.data[i]);
                        cont++;
                    }
                }
                
            }
            dispatch({ type: GET_SEARCH_SUCCES, payload: response.data, parents: response.data.parents, imageVideos: arrImageVideo  });
            
        })
        .catch(error => {
            dispatch({ type: GET_SEARCH_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}


export const cambiarObjectSearch = (caperta) => (dispatch) => {
    dispatch({ type: GET_SEARCH });
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
            NotificationManager.success('Actualizado correctamente.');

            dispatch(getSearch());

        })
        .catch(error => {
            // error handling
        })
}


export const removeObjectSearch = (caperta) => (dispatch) => {
    dispatch({ type: GET_SEARCH });
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
            NotificationManager.success('Eliminado correctamente.');
            dispatch(getSearch());
        })
        .catch(error => {
            // error handling
        })
}