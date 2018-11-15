/**
 * Contratos Actions
 */
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    GET_OBJECT,
    GET_OBJECT_FAILURE,
    GET_OBJECT_SUCCES,
    UPDATE_OBJECT,
    UPDATE_OBJECTS_FAILURE,
    UPDATE_OBJECT_SUCCES,
    DELETE_OBJECT,
    DELETE_OBJECT_FAILURE,
    DELETE_OBJECT_SUCCES,
    AGREGAR_FAVORITOS,
    AGREGAR_FAVORITOS_FAILURE,
    AGREGAR_FAVORITOS_SUCCES
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';




export const getObjectsByID = (idUrl) => (dispatch) => {
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
   
    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' +  idUrl)
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);

            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data.children){
                for(var i=0;i<response.data.children.length;i++){
                    if(response.data.children[i].type !== 'folder'){
                        console.log('response.data.children[i]',response.data.children[i]);
                        
                        if(cont === 4){
                            cont = 0;
                            collapseRows ++;
                        }


                        if(cont === 0){
                            response.data.children[i].marginLeft = '0%';
                            response.data.children[i].paddingLeft = '10%';
                            response.data.children[i].createRowCollapse = true;
                            
                        }
                        if(cont === 1){
                            response.data.children[i].marginLeft = '-110%';
                            response.data.children[i].paddingLeft = '36%';
                        }
                        if(cont === 2){
                            response.data.children[i].marginLeft = '-220%';
                            response.data.children[i].paddingLeft = '62%';
                        }
                        if(cont === 3){
                            response.data.children[i].marginLeft = '-330%';
                            response.data.children[i].paddingLeft = '87%';
                        }
                        response.data.children[i].rowCollapse = 'collapse' + collapseRows;

                        arrImageVideo.push(response.data.children[i]);
                        cont++;
                    }
                }
                
            }


            dispatch({ type: GET_OBJECT_SUCCES, payload: response.data.children, parents: response.data.parents, imageVideos: arrImageVideo });
            
        })
        .catch(error => {
            dispatch({ type: GET_OBJECT_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}


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
            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data.children){
                for(var i=0;i<response.data.children.length;i++){
                    if(response.data.children[i].type !== 'folder'){
                        console.log('response.data.children[i]',response.data.children[i]);
                        
                        if(cont === 4){
                            cont = 0;
                            collapseRows ++;
                        }


                        if(cont === 0){
                            response.data.children[i].marginLeft = '0%';
                            response.data.children[i].paddingLeft = '10%';
                            response.data.children[i].createRowCollapse = true;
                            
                        }
                        if(cont === 1){
                            response.data.children[i].marginLeft = '-110%';
                            response.data.children[i].paddingLeft = '36%';
                        }
                        if(cont === 2){
                            response.data.children[i].marginLeft = '-220%';
                            response.data.children[i].paddingLeft = '62%';
                        }
                        if(cont === 3){
                            response.data.children[i].marginLeft = '-330%';
                            response.data.children[i].paddingLeft = '87%';
                        }
                        response.data.children[i].rowCollapse = 'collapse' + collapseRows;

                        arrImageVideo.push(response.data.children[i]);
                        cont++;
                    }
                }
                
            }
            dispatch({ type: GET_OBJECT_SUCCES, payload: response.data.children, parents: response.data.parents, imageVideos: arrImageVideo  });
            
        })
        .catch(error => {
            dispatch({ type: GET_OBJECT_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
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





function cargarMenuFavoritosExplorar(carpetas) {
    console.log('Carga el menu');

    var menu = {
        'category1': []
    };

    console.log('carpetas', carpetas);

    var child_routes = [];
    for (var i = 0; i < carpetas.length; i++) {
        console.log('carpetas[i]', carpetas[i].name);

        var hijos = {
            'menu_title': carpetas[i].name,
            "path": "/app/exlporar?id=" + carpetas[i]._id
        }

        child_routes.push(hijos);
    }
   


   



    var configuracion = {
        "menu_title": "Configuracion",
        "menu_icon": "ti-settings",
        "path": "/app/configuracion",
        "child_routes": null
    };

    var seccion;
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    if(clienteSelectJson){
         seccion = {
            "menu_title": 'Favoritos',
            "menu_icon": "ti-star",
            "open": false,
            "child_routes": child_routes
        }
        const seccionCliente = localStorage.getItem('seccionCliente');
        const seccionClienteJson = JSON.parse(seccionCliente);
        menu.category1.push(seccionClienteJson);
        localStorage.setItem("seccionFavoritos", JSON.stringify(seccion));
        menu.category1.push(seccion);

    }

   
    
    menu.category1.push(configuracion);

    localStorage.setItem("menuLoad", JSON.stringify(menu));
}



export const obtenerFavoritos = () => (dispatch) => {
    dispatch({ type: AGREGAR_FAVORITOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    if (!clienteSelectJson) {
        clienteSelectJson = {
            _id: '1'
        }
    }
    console.log('clienteSelectJson getFavoritos', clienteSelectJson);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/workspaces')
        .then((response) => {
            console.log('response getFavoritos', response);
            cargarMenuFavoritosExplorar(response.data.favorites);
            dispatch({ type: AGREGAR_FAVORITOS_SUCCES});
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE });
        })
}

export const agregarFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: AGREGAR_FAVORITOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    
    console.log('clienteSelectJson._id', clienteSelectJson._id);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.put('/v1/users/me/clients/' + clienteSelectJson._id + '/workspaces/objects', {
        'target': 'favorites',
        'object': caperta._id
    })
        .then((response) => {
            console.log('response ADD_FAVORITOS', response);
            dispatch(obtenerFavoritos());
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE});
        })
}