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
            "path": "/app/exlporar?id=" + carpetas[i]._id
        }

        child_routes.push(hijos);
    }
   


   



    var compartidos = {
        "menu_title": "Compartidos contigo",
        "menu_icon": "ti-share-alt",
        "open": false,
        "child_routes": [
            {
                "path": "/app/dashboard",
                "menu_title": "Toliv"
            }
        ]
    };

    var recientes = {
        "menu_title": "Recientes",
        "menu_icon": "ti-timer",
        "open": false,
        "child_routes": [

            {
                "path": "/app/dashboard",
                "menu_title": "Toliv"
            }
        ]
    };

    var usuarios = {
        "menu_title": "Usuarios",
        "menu_icon": "ti-user",
        "path": "/app/usuarios",
        "child_routes": null
    };

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
        const seccionFavoritos = localStorage.getItem('seccionFavoritos');
    const seccionFavoritosJson = JSON.parse(seccionFavoritos);
    menu.category1.push(seccionFavoritosJson);

    }

   
    menu.category1.push(compartidos);
    menu.category1.push(recientes);
    menu.category1.push(usuarios);
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
            "path": "/app/exlporar?id=" + carpetas[i]._id
        }

        child_routes.push(hijos);
    }
   


   



    var compartidos = {
        "menu_title": "Compartidos contigo",
        "menu_icon": "ti-share-alt",
        "open": false,
        "child_routes": [
            {
                "path": "/app/dashboard",
                "menu_title": "Toliv"
            }
        ]
    };

    var recientes = {
        "menu_title": "Recientes",
        "menu_icon": "ti-timer",
        "open": false,
        "child_routes": [

            {
                "path": "/app/dashboard",
                "menu_title": "Toliv"
            }
        ]
    };

    var usuarios = {
        "menu_title": "Usuarios",
        "menu_icon": "ti-user",
        "path": "/app/usuarios",
        "child_routes": null
    };

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

   
    menu.category1.push(compartidos);
    menu.category1.push(recientes);
    menu.category1.push(usuarios);
    menu.category1.push(configuracion);

    localStorage.setItem("menuLoad", JSON.stringify(menu));
}

export const addFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: ADD_FAVORITOS });
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
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    console.log('daleteFavoritos',caperta);

    instance2.delete('/v1/users/me/clients/' + clienteSelectJson._id + '/workspaces/objects', {
        data: {'target': 'favorites',
        'object': caperta._id}
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

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/workspaces')
        .then((response) => {
            console.log('response getFavoritos', response);
             cargarMenuFavoritos(response.data.favorites);
            dispatch({ type: ADD_FAVORITOS_SUCCES, favoritos: response.data.favorites});
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
            dispatch({ type: GET_FOLDERS_SUCCES, payload: response.data.children });
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