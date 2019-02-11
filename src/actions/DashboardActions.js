/**
 * Contratos Actions
 */
import axios from 'axios';
import fileExtension from 'file-extension';
import moment from 'moment';

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
    ADD_FAVORITOS_FAILURE,
    GET_RECIENTES,
    GET_RECIENTES_FAILURE,
    GET_RECIENTES_SUCCES,
    GET_COMPARTIDOS,
    GET_COMPARTIDOS_FAILURE,
    GET_COMPARTIDOS_SUCCES,
    EDIT_OBJECT_FOLDER,
    CLOSE_OBJECT_FOLDER,
    GET_COUNT_PENDING

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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
async function cargarMenu(carpetas, dispatch) {
    console.log('Carga el menu the maximo');
    var menu = {
        'category1': []
    };
    console.log('carpetas', carpetas);
    var child_routes = [];
    for (var i = 0; i < carpetas.length; i++) {
        if (carpetas[i].type === 'folder') {
            var hijos = {
                'menu_title': carpetas[i].name,
                "path": "/app/exlporar?id=" + carpetas[i]._id + '?name=' + carpetas[i].name
            }
            child_routes.push(hijos);   
        }
    }
    var usuarios = {
        "menu_title": "Usuarios",
        "menu_icon": "ti-user",
        "path": "/app/usuarios",
        "child_routes": null
    };
    var configuracion = {
        "menu_title": "Configuración",
        "menu_icon": "ti-settings",
        "path": "/app/configuracion",
        "child_routes": null
    };
    var invite = {
        "menu_title": "Invite",
        "menu_icon": "ti-plus",
        "path": "/app/invite",
        "child_routes": null
    };
    var seccion;
    let clienteSelect = localStorage.getItem('clienteSelect');
    let clienteSelectJson = JSON.parse(clienteSelect);
     console.log('client name',clienteSelectJson.name);
    const { accessToken } = JSON.parse(localStorage.getItem('user_id'));


    if (clienteSelectJson.name) {
        seccion = {
            "menu_title": clienteSelectJson.name,
            "menu_icon": "ti-folder",
            "open": false,
            "child_routes": child_routes
        }
        localStorage.setItem("seccionCliente", JSON.stringify(seccion));
        menu.category1.push(seccion);
    }

    const request = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });

   const responseFav = await request.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/favorites');
   console.log('responseFav', responseFav.data);

   var child_routes_favorites = [];
   const { data: { children : childrenFav } } = responseFav;

   childrenFav.map(child => {
        if(child.type === 'folder'){
            child_routes_favorites.push({
                'menu_title': child.name,
                "path": "/app/exlporar?id=" +child._id + '?name=' + child.name
            });
        }
   });

    menu.category1.push({
        "menu_title": 'Favoritos',
        "menu_icon": "ti-star",
        "open": false,
        "child_routes": child_routes_favorites
    });

    var tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'operator') {
        request.get(`/v1/users/me/workspaces/${clienteSelectJson._id}`)
            .then((response) => {
                console.log('---X> response', response);
                const { data: { role } } = response;
                if (role === 'admin') {
                    menu.category1.push(configuracion);
                    menu.category1.push(invite);
                    menu.category1.push(usuarios);
                }
                localStorage.setItem("menuLoad", JSON.stringify(menu));
                console.log('dashboard action menu operator',menu);
                dispatch({ type: 'NO_SIRVE' });
            })
            .catch(error => {
                // error handling
            });
    } else if (tipoUsuario === 'admin') {
        menu.category1.push(configuracion);
        menu.category1.push(invite);
        menu.category1.push(usuarios);
        localStorage.setItem("menuLoad", JSON.stringify(menu));
        console.log('dashboard action menu admin',menu);
        dispatch({ type: 'NO_SIRVE' });
    } 
}


function cargarMenuFavoritos(carpetas) {
    console.log('Carga el menu dashboard');

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
    var usuarios = {
        "menu_title": "Usuarios",
        "menu_icon": "ti-user",
        "path": "/app/usuarios",
        "child_routes": null
    };

   

    var configuracion = {
        "menu_title": "Configuración",
        "menu_icon": "ti-settings",
        "path": "/app/configuracion",
        "child_routes": null
    };

    var invite = {
        "menu_title": "Invite",
        "menu_icon": "ti-plus",
        "path": "/app/invite",
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

   
    var tipoUsuario = localStorage.getItem('tipoUsuario');
    if(tipoUsuario === 'admin'){
        menu.category1.push(configuracion);
        menu.category1.push(invite);
        menu.category1.push(usuarios);
        
    }
    

    localStorage.setItem("menuLoad", JSON.stringify(menu));
}

export const addFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: ADD_FAVORITOS });
    NotificationManager.success('Guardando en favoritos...');

    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    const objectFavorites = localStorage.getItem('objectFavorites');
    var cobjectFavoritesJson = JSON.parse(objectFavorites);

    
    console.log('clienteSelectJson._id', clienteSelectJson._id);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.post('/v1/users/me/clients/' + clienteSelectJson._id + '/favorites/' + cobjectFavoritesJson._id, {
        'object': caperta._id
    })
        .then((response) => {
            console.log('response ADD_FAVORITOS', response);
            dispatch(getFavoritos());
            NotificationManager.success('Guardado en favoritos');

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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/favorites')
        .then((response) => {
            console.log('response getFavoritos', response);
            //  cargarMenuFavoritos(response.data.children);
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root)
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            cargarMenu(response.data.children, dispatch).then();
            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            var tipoArr = [];
            if(response.data.children){
                for(var i=0;i<response.data.children.length;i++){
                    if(response.data.children[i].type !== 'folder'){
                        console.log('response.data.children[i]',response.data.children[i]);
                        

                         tipoArr = response.data.children[i].originalURL.split('.');
                         console.log('tipoArr',tipoArr);
                         response.data.children[i].extentionObject = response.data.children[i].name + '.' +  tipoArr[tipoArr.length -1];
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
            console.log('arrImageVideo333',arrImageVideo);
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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





export const changePDF = (file, objetoDesc) => (dispatch) => {
    console.log('GET_URL FORM');
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    
    
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    console.log('file.type', file.type);
    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: fileExtension(file.name),
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addPDF(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_AVATAR_FAILURE });
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addPDF = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {
    console.log('PDFFF FORM', file);

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage', urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: AppConfig.timeout,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type } })
        .then(function (result) {
            console.log(result);
            console.log('antes d33  imagenes', objetoDesc);

            objetoDesc.pdfUrlFileDone = futureFileURL;
            console.log('antes de enviara objetoDesc  imagenes', objetoDesc);
            dispatch(uploadMultipleFile(objetoDesc.files,0,objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
            dispatch({ type: CHANGE_AVATAR_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const uploadMultipleFileDescription = (objetoDesc) => (dispatch) => {
    console.log('uploadMultipleFile');
    dispatch({ type: GET_FOLDERS });
    console.log('uploadMultipleFile',objetoDesc);
    
    
    
        if(objetoDesc.copyRight === 'free'){
            console.log('objetoDesc free',objetoDesc);
            dispatch(uploadMultipleFile(objetoDesc.files,0,objetoDesc))
            
        }else{
            console.log('objetoDesc elese',objetoDesc);
            dispatch(changePDF(objetoDesc.filePDF, objetoDesc))
        }
    
    



}

export const uploadMultipleFile = (files,position, objetoDesc) => (dispatch) => {
    console.log('uploadMultipleFile4444');
    dispatch({ type: GET_FOLDERS });
    if(!position){
        position = 0;
        console.log('no existe');
    }

    console.log('position',position);
    console.log('files',files);
    if(position < files.length){
        dispatch(uploadFile(files[position],position, files, objetoDesc))
    }else{
        dispatch(getFolders());
    }
   



}
export const uploadFile = (file, position, files, objetoDesc) => (dispatch) => {
    console.log('uploadFile', file);

    let typeFile = null;
    if (!file.type) {
        typeFile="document";
    }else if(file.type === 'application/pdf' || file.type === 'application/x-bittorrent'){
        typeFile="document";
    }else{
        var tipoArr = file.type.split('/');
        typeFile=tipoArr[0];
    }
   
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    console.log('file.type', file.type);

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: fileExtension(file.name),
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addFile(response.data.url, file, response.data.futureFileURL, typeFile, response.data.uuid, position, files, objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch(uploadMultipleFile(files,position+1))
            var tipoArrName = file.name.split('.');
            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArrName[0] + ' ocurrio un error al subirlo');
           

        })
}
export const addFile = (urlImage, file, futureFileURL, tipo, guid, position, files, objetoDesc) => (dispatch) => {
    console.log('addFile FORM', file);

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage', urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: AppConfig.timeout,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type } })
        .then(function (result) {
            console.log(result);
            dispatch(updateFile(futureFileURL, tipo, guid, file, position, files, objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            dispatch(uploadMultipleFile(files,position+1))
            var tipoArr = file.name.split('.');
            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' ocurrio un error al subirlo');
           

        });
}


export const updateFile = (futureFileURL, tipo, guid, file, position, files, objetoDesc) => (dispatch) => {
    dispatch({ type: GET_FOLDERS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);

    var tipoArr = file.name.split('.');


    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root, {
        'name': tipoArr[0],
        "type": tipo,
        "originalURL": futureFileURL,
        "uuid": guid,
        'metadata':{
            'copyRight': objetoDesc.copyRight,
            'licenseFile': objetoDesc.pdfUrlFileDone
            ,'descriptiveTags' :objetoDesc.descriptiveTags,
            'createdDate': moment(objetoDesc.startDate).utc().format(),
        }
    })
        .then((response) => {
            console.log('response updateFile', response);
            console.log('position', position);
            try{
                var countPending = localStorage.getItem("countPending");
                var countPendingAux = parseInt(countPending) +1 ;
                localStorage.setItem("countPending",countPendingAux);
                dispatch({ type: GET_COUNT_PENDING });
            }catch(e){
                console.log('e',e);
            }
            dispatch(uploadMultipleFile(files,position+1,objetoDesc))
            NotificationManager.success(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' Subido correctamente');
        })
        .catch(error => {
            dispatch(uploadMultipleFile(files,position+1))

            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' ocurrio un error al subirlo');
           
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    console.log('file.type', file.type);
    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: fileExtension(file.name),
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
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' + clienteSelectJson.root, {
        'name': detalle.name,
        "type": tipo,
        "originalURL": futureFileURL,
        "uuid": guid
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


/**
 * Redux Action To Get Contratos
 */
export const getRecientes = () => (dispatch) => {
    dispatch({ type: GET_RECIENTES });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/users/me/clients/' + clienteSelectJson._id + '/recent')
        .then((response) => {
            console.log('response getRecientes', response);
            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data){
                for(var i=0;i<response.data.length;i++){
                    if(response.data[i].type === 'video' || response.data[i].type === 'image'){
                        console.log('response.data[i]',response.data[i]);
                        
                        
                           
                     


                        
                        response.data[i].rowCollapse = 'collapse' + collapseRows;

                        arrImageVideo.push(response.data[i]);
                        collapseRows ++;
                    }
                }
                
            }
            dispatch({ type: GET_RECIENTES_SUCCES, recientes: arrImageVideo  });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_RECIENTES_FAILURE });
        })
}





/**
 * Redux Action To ADD Invite
 */
export const compartirDashboard = (objeto) => (dispatch) => {
    console.log('compartirDashboard FORM',objeto);
    
    NotificationManager.success('Compartiendo...');
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

   
    instance2.post('v1/shared',{
        'object': objeto.idObjectCompartir,
        'email': objeto.correoCompartir,
        'user': userMeJson._id
    })
        .then((response) => {
           
            
            NotificationManager.success('Compartido correctamente');
        })
        .catch(error => {
            
        NotificationManager.error(error.message);
        })
}






export const getCompartidos = () => (dispatch) => {
    console.log("llamdo getcompartidos action");
    
    dispatch({ type: GET_COMPARTIDOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);
    if (!clienteSelectJson) {
        clienteSelectJson = {
            _id: '1'
        }
    }
    console.log('clienteSelectJson getCompartidos', clienteSelectJson);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/shared')
        .then((response) => {
             var arrImageVideo = [];
             var cont = 0;
             var collapseRows = 0;
             
             if(response.data){

                response.data.map((sharedObject) => {

                    if(sharedObject.object.type !== 'folder'){
                         
                        if(cont === 4){
                            cont = 0;
                            collapseRows ++;
                        }

                        if(cont === 0){
                            sharedObject.object.marginLeft = '0%';
                            sharedObject.object.paddingLeft = '10%';
                            sharedObject.object.createRowCollapse = true;
                            
                        }
                        if(cont === 1){
                            sharedObject.object.marginLeft = '-110%';
                            sharedObject.object.paddingLeft = '36%';
                        }
                        if(cont === 2){
                            sharedObject.object.marginLeft = '-220%';
                            sharedObject.object.paddingLeft = '62%';
                        }
                        if(cont === 3){
                            sharedObject.object.marginLeft = '-330%';
                            sharedObject.object.paddingLeft = '87%';
                        }
                        sharedObject.object.rowCollapse = 'collapse' + collapseRows;

                        arrImageVideo.push(sharedObject.object);
                        cont++;
                    }
                    
                });
                 
                 
             }
             
            // localStorage.setItem("objectFavorites", JSON.stringify(response.data));
             dispatch({ type: GET_COMPARTIDOS_SUCCES, compartidos: response.data, parentsCompartidos: [], imageVideosCompartidos: arrImageVideo  });
             
        })
        .catch(error => {
            dispatch({ type: GET_COMPARTIDOS_FAILURE });
        })
}





export const moveDashboard = () => (dispatch) => {
    console.log('moveDashboard FORM');
    dispatch({ type: GET_FOLDERS });
    NotificationManager.success('Moviendo...');
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);
    console.log('tokenJson4',tokenJson.accessToken);


    const moveObject = localStorage.getItem('moveObject');
    const moveObjectJson = JSON.parse(moveObject);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);

    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

   
      instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + moveObjectJson._id, {
        'action': 'move',
        'folder': clienteSelectJson.root
       
    })
        .then((response) => {
            dispatch(getFolders());
            localStorage.removeItem('moveObject');
            NotificationManager.success('Movido correctamente');
        })
        .catch(error => {
            dispatch({ type: GET_FOLDERS_FAILURE });
        NotificationManager.error(error.message);
        })
}



export const editObjectFolder = () => (dispatch) => {

    dispatch({ type: EDIT_OBJECT_FOLDER, editarObjetoFolderModal: true });

}

export const closeObjectFolder = () => (dispatch) => {

    dispatch({ type: CLOSE_OBJECT_FOLDER, editarObjetoFolderModal: false });

}


export const updatePendingObjectFolder = (objeto) => (dispatch) => {
   
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4', tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + objeto.id, {
        'name': objeto.name,
        'metadata':{
            'copyRight': objeto.metadata.copyRight,
            'licenseFile': objeto.metadata.licenseFile,
            'descriptiveTags' : objeto.metadata.descriptiveTags,
            'createdDate': objeto.metadata.createdDate,
            'audiovisualTags': objeto.metadata.audiovisualTags
        }
    })
        .then((response) => {
            console.log('response GET_FOLDERS_SUCCES', response);
            dispatch(getFolders());
            
        })
        .catch(error => {
            // error handling
        })
}







export const changePendingPDFFolder = (file, objetoDesc) => (dispatch) => {
    console.log('changePendingPDFExplorar FORM');
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    
    
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    console.log('file.type', file.type);
    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: fileExtension(file.name),
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addPendingPDFFolder(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
          ;
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addPendingPDFFolder = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {
    console.log('addPendingPDF FORM', file);

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('urlImage', urlImage);
    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: AppConfig.timeout,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type } })
        .then(function (result) {
            console.log(result);
            console.log('antes d33  imagenes', objetoDesc);

            objetoDesc.metadata.licenseFile = futureFileURL;
            console.log('antes de enviara objetoDesc  imagenes', objetoDesc);
            dispatch(updatePendingObjectFolder(objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
           
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const updateObjectFolder = (objectChange) => (dispatch) => {
    console.log('updatePendingRouting');
   
    dispatch({ type: GET_FOLDERS });
    
    
    if(objectChange.isChangePDF){
        dispatch(changePendingPDFFolder(objectChange.filePDF, objectChange))
    }else{
        dispatch(updatePendingObjectFolder(objectChange))
    }
   



}