/**
 * Contratos Actions
 */
import axios from 'axios';
import moment from 'moment';

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
    AGREGAR_FAVORITOS_SUCCES,
    EDIT_OBJECT_EXPLORAR,
    CLOSE_OBJECT_EXPLORAR,
    GET_COUNT_PENDING
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';


export const getObjectsByHideID = (idUrl) => (dispatch) => {
    
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects/' +  idUrl)
        .then((response) => {
            

          console.log('getObjectsByHideID succes',response);
            
        })
        .catch(error => {
           
        })
}


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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
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
        timeout: AppConfig.timeout,
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

      const folderSelect = localStorage.getItem('folderSelect');
      var   folderSelectJson = JSON.parse(folderSelect);
   
    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' +  folderSelectJson._id,{
        'name': detalle.name,
        "type": tipo,
        "originalURL": futureFileURL,
        "uuid": guid
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
        const seccionCliente = localStorage.getItem('seccionCliente');
        const seccionClienteJson = JSON.parse(seccionCliente);
        menu.category1.push(seccionClienteJson);
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
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('/v1/users/me/clients/' +  clienteSelectJson._id + '/favorites')
        .then((response) => {
            console.log('response getFavoritos', response);
            cargarMenuFavoritosExplorar(response.data.children);
            dispatch({ type: AGREGAR_FAVORITOS_SUCCES});
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE });
        })
}

export const agregarFavoritos = (caperta) => (dispatch) => {
    dispatch({ type: AGREGAR_FAVORITOS });
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
            dispatch(obtenerFavoritos());
            NotificationManager.success('Guardado en favoritos');
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE});
        })
}







export const changeExplorarPDF = (file, objetoDesc) => (dispatch) => {
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
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addExplorarPDF(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
         //   dispatch({ type: CHANGE_AVATAR_FAILURE });
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addExplorarPDF = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {
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
            dispatch(uploadExplorarMultipleFile(objetoDesc.files,0,objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
        //    dispatch({ type: CHANGE_AVATAR_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}



export const uploadExplorarMultipleFileDescription = (objetoDesc) => (dispatch) => {
    console.log('uploadMultipleFile');
    dispatch({ type: GET_OBJECT });
    console.log('uploadMultipleFile',objetoDesc);
    
    
    
        if(objetoDesc.copyRight === 'free'){
            console.log('objetoDesc free',objetoDesc);
            dispatch(uploadExplorarMultipleFile(objetoDesc.files,0,objetoDesc))
            
        }else{
            console.log('objetoDesc elese',objetoDesc);
            dispatch(changeExplorarPDF(objetoDesc.filePDF, objetoDesc))
        }
    
    



}






export const uploadExplorarMultipleFile = (files,position,objetoDesc) => (dispatch) => {
    console.log('uploadMultipleFile');
    dispatch({ type: GET_OBJECT });
    if(!position){
        position = 0;
        console.log('no existe');
    }

    console.log('position',position);
    console.log('files',files);
    if(position < files.length){
        dispatch(uploadExplorarFile(files[position],position, files,objetoDesc))
    }else{
        dispatch(getObjects());
    }
   



}
export const uploadExplorarFile = (file, position, files, objetoDesc) => (dispatch) => {
    console.log('uploadFile');
   
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
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addExplorarFile(response.data.url, file, response.data.futureFileURL, tipoArr[0], response.data.uuid, position, files, objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch(uploadExplorarMultipleFile(files,position+1))
            var tipoArrName = file.name.split('.');
            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArrName[0] + ' ocurrio un error al subirlo');
           

        })
}
export const addExplorarFile = (urlImage, file, futureFileURL, tipo, guid, position, files, objetoDesc) => (dispatch) => {
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
            dispatch(updateExplorarFile(futureFileURL, tipo, guid, file, position, files, objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            dispatch(uploadExplorarMultipleFile(files,position+1))
            var tipoArr = file.name.split('.');
            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' ocurrio un error al subirlo');
           

        });
}


export const updateExplorarFile = (futureFileURL, tipo, guid, file, position, files, objetoDesc) => (dispatch) => {
    dispatch({ type: GET_OBJECT });
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
    const folderSelect = localStorage.getItem('folderSelect');
    var   folderSelectJson = JSON.parse(folderSelect);
    instance2.post('/v1/clients/' + clienteSelectJson._id + '/objects/' + folderSelectJson._id, {
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
            dispatch(uploadExplorarMultipleFile(files,position+1,objetoDesc))
            NotificationManager.success(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' Subido correctamente');
        })
        .catch(error => {
            dispatch(uploadExplorarMultipleFile(files,position+1))

            NotificationManager.error(position+1 + ' de '  + files.length + ' ' + tipoArr[0] + ' ocurrio un error al subirlo');
           
        })
}



export const compartirExplorar = (objeto) => (dispatch) => {
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




export const moveExplorar = () => (dispatch) => {
    console.log('moveDashboard FORM');
    dispatch({ type: GET_OBJECT });
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

    const folderSelect = localStorage.getItem('folderSelect');
    var   folderSelectJson = JSON.parse(folderSelect);

    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

   
      instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' + moveObjectJson._id, {
        'action': 'move',
        'folder': folderSelectJson._id
       
    })
        .then((response) => {
            dispatch(getObjects());
            localStorage.removeItem('moveObject');
            NotificationManager.success('Movido correctamente');
        })
        .catch(error => {
            dispatch({ type: GET_OBJECT_FAILURE})
        NotificationManager.error(error.message);
        })
}

export const editObjectExplorar = () => (dispatch) => {

    dispatch({ type: EDIT_OBJECT_EXPLORAR, editarObjetoModal: true });

}

export const closeObjectExplorar = () => (dispatch) => {

    dispatch({ type: CLOSE_OBJECT_EXPLORAR, editarObjetoModal: false });

}


export const updatePendingObjectExplorar = (objeto) => (dispatch) => {
   
    
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
            dispatch(getObjects());
            
        })
        .catch(error => {
            // error handling
        })
}







export const changePendingPDFExplorar = (file, objetoDesc) => (dispatch) => {
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
        extention: tipoArr[1],
        mimeType: file.type
    })
        .then((response) => {
            console.log('response user', response);
            dispatch(addPendingPDFExplorar(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_PENDING_OBJECT_FAILURE });
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addPendingPDFExplorar = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {
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
            dispatch(updatePendingObjectExplorar(objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            console.log(err);
           
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const updateObjectExplorar = (objectChange) => (dispatch) => {
    console.log('updatePendingRouting');
   
    dispatch({ type: UPDATE_OBJECT });
    
    
    if(objectChange.isChangePDF){
        dispatch(changePendingPDFExplorar(objectChange.filePDF, objectChange))
    }else{
        dispatch(updatePendingObjectExplorar(objectChange))
    }
   



}