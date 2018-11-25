/**
 * Contratos Actions
 */
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    GET_USER_DETAILS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_SUCCES,
    GET_USER_BY_ID,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_SUCCES,
    GET_FOLDERS,
    GET_FOLDERS_FAILURE,
    GET_FOLDERS_SUCCES,
    UPDATE_FOLDERS,
    UPDATE_FOLDERS_FAILURE,
    UPDATE_FOLDERS_SUCCES,
    DELETE_FOLDERS,
    DELETE_FOLDERS_FAILURE,
    DELETE_FOLDERS_SUCCES,
    ADD_FAVORITOS,
    ADD_FAVORITOS_SUCCES,
    ADD_FAVORITOS_FAILURE

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

    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('v1/users/me')
        .then((response) => {
            console.log('response GET_USER_DETAILS', response);
            localStorage.setItem("user_me", JSON.stringify(response.data));
            dispatch({ type: GET_USER_DETAILS_SUCCES });
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

    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/clients/' + id)
        .then((response) => {
            console.log('response GET_USER_id', response);
            dispatch({ type: GET_USER_BY_ID_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
        })
}

function cargarMenu(carpetas) {
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
            "path": "/app/exlporar?id=" + carpetas[i]._id + '?name=' + carpetas[i].name
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
            "menu_title": clienteSelectJson.name,
            "menu_icon": "ti-folder",
            "open": false,
            "child_routes": child_routes
        }
        localStorage.setItem("seccionCliente", JSON.stringify(seccion));
        menu.category1.push(seccion);
        try{
            const seccionFavoritos = localStorage.getItem('seccionFavoritos');
            const seccionFavoritosJson = JSON.parse(seccionFavoritos);
            if(seccionFavoritosJson){
                menu.category1.push(seccionFavoritosJson);
            }
        }catch(e){
            
        }
        
   

    }

   
   
    menu.category1.push(configuracion);

    localStorage.setItem("menuLoad", JSON.stringify(menu));
}


function cargarMenuFavoritos(carpetas) {
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
            "path": "/app/exlporar?id=" + carpetas[i]._id + '?name=' + carpetas[i].name
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
        try{
            const seccionCliente = localStorage.getItem('seccionCliente');
            const seccionClienteJson = JSON.parse(seccionCliente);
        if(seccionClienteJson){
            menu.category1.push(seccionClienteJson);
        }
        }catch(e){}
        
       
        localStorage.setItem("seccionFavoritos", JSON.stringify(seccion));
        menu.category1.push(seccion);

    }

   
    
    menu.category1.push(configuracion);

    localStorage.setItem("menuLoad", JSON.stringify(menu));
}

export const addFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: ADD_FAVORITOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    const objectFavorites = localStorage.getItem('objectFavorites');
    var cobjectFavoritesJson = JSON.parse(objectFavorites);

    
    console.log('clienteSelectJson._id', clienteSelectJson._id);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.post('/v1/users/me/clients/' + clienteSelectJson._id + '/favorites/' + cobjectFavoritesJson._id, {
        'name': caperta.name,
        'object': caperta._id
    })
        .then((response) => {
            console.log('response ADD_FAVORITOS', response);
            dispatch(getFavoritos());
        })
        .catch(error => {
            dispatch({ type: ADD_FAVORITOS_FAILURE});
        })
}

export const daleteFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: ADD_FAVORITOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    const objectFavorites = localStorage.getItem('objectFavorites');
    var cobjectFavoritesJson = JSON.parse(objectFavorites);
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    console.log('daleteFavoritos',caperta);

    instance2.delete('/v1/users/me/clients/' + clienteSelectJson._id + '/favorites/' + cobjectFavoritesJson._id, {
        data: {'target': caperta._id}
    })
        .then((response) => {
            console.log('response daleteFavoritos', response);
            dispatch(getFavoritos());
        })
        .catch(error => {
            dispatch({ type: ADD_FAVORITOS_FAILURE});
        })
}


export const getFavoritos = () => (dispatch) => {
    dispatch({ type: ADD_FAVORITOS });
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

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/favorites')
        .then((response) => {
            console.log('response getFavoritos', response);
             cargarMenuFavoritos(response.data.children);
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
             localStorage.setItem("objectFavorites", JSON.stringify(response.data));
             dispatch({ type: ADD_FAVORITOS_SUCCES, favoritos: response.data.children, parentsFavoritos: response.data.parents, imageVideosFavoritos: arrImageVideo  });
             
        })
        .catch(error => {
            dispatch({ type: ADD_FAVORITOS_FAILURE });
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

    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root)
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            cargarMenu(response.data.children);
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
            dispatch({ type: GET_FOLDERS_SUCCES, payload: response.data.children, parents: response.data.parents, imageVideos: arrImageVideo  });
            
        })
        .catch(error => {
            dispatch({ type: GET_FOLDERS_FAILURE });
        })
}

export const createFolder = (caperta) => (dispatch) => {
    dispatch({ type: GET_FOLDERS });
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

    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root, {
        'name': caperta.name,
        "type": "folder"
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            dispatch(getFolders());
        })
        .catch(error => {
            // error handling
        })
}

export const cambiarNombreObject = (caperta) => (dispatch) => {
    dispatch({ type: UPDATE_FOLDERS });
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

    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + caperta._id, {
        'name': caperta.name
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            dispatch(getFolders());
        })
        .catch(error => {
            // error handling
        })
}

export const daleteObject = (caperta) => (dispatch) => {
    dispatch({ type: DELETE_FOLDERS });
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

    instance2.delete('/v1/clients/' + clienteSelectJson._id + '/objects/' + caperta._id, {

    })
        .then((response) => {
            console.log('response DELETE_FOLDERS_SUCCES', response);
            dispatch(getFolders());
        })
        .catch(error => {
            // error handling
        })
}






export const subirArchivo = (detalle, file) => (dispatch) => {
    console.log('GET_URL FORM');
    dispatch({ type: GET_FOLDERS });
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
            dispatch(addObject(response.data.url, file, response.data.futureFileURL, detalle, tipoArr[0], response.data.uuid))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_FOLDERS_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addObject = (urlImage, file, futureFileURL, detalle, tipo, guid) => (dispatch) => {
    console.log('PUT_IMAGE FORM', file);

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
            dispatch(updateObjeto(futureFileURL, detalle, tipo, guid));
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
            dispatch({ type: GET_FOLDERS_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const updateObjeto = (futureFileURL, detalle, tipo, guid) => (dispatch) => {
    dispatch({ type: GET_FOLDERS });
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

    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root, {
        'name': detalle.name,
        "type": tipo,
        "originalURL": futureFileURL,
        "guid": guid
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            dispatch(getFolders());
        })
        .catch(error => {
            dispatch({ type: GET_FOLDERS_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}