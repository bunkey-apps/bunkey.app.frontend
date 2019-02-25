/**
 * Contratos Actions
 */
import axios from 'axios';
import fileExtension from 'file-extension';
import { NotificationManager } from 'react-notifications';

import {
    GET_SEARCH,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCES,
    EDIT_OBJECT_SEARCH,
    CLOSE_OBJECT_SEARCH,
    AGREGAR_FAVORITOS,
    AGREGAR_FAVORITOS_FAILURE,
    AGREGAR_FAVORITOS_SUCCES,
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

const orderByType = (array, type) => {
    let arrayByType = [];
    let arrayOthers = [];
    array.map((element)=>{
      if(element.type == type){
        arrayByType.push(element)
      }else{
        arrayOthers.push(element);
      }
    });

    return arrayByType.concat(arrayOthers);
  }

 const obtenerFavoritos = () => (dispatch) => {
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
            localStorage.setItem("objectFavorites", JSON.stringify(response.data));
            cargarMenuFavoritosExplorar(response.data.children);
            dispatch({ type: AGREGAR_FAVORITOS_SUCCES});
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE });
        })
}


export const agregarFavoritosBusqueda = (caperta) => (dispatch) => {
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

export const daleteFavoritosBusqueda = (caperta) => (dispatch) => {
    dispatch({ type: AGREGAR_FAVORITOS });
    NotificationManager.success('Eliminando en favoritos...');
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
            NotificationManager.success('Eliminado de favoritos');
            dispatch(obtenerFavoritos());
        })
        .catch(error => {
            dispatch({ type: AGREGAR_FAVORITOS_FAILURE});
        })
}



export const getSearch = (page) => (dispatch) => {
    dispatch({ type: GET_SEARCH , loadingImg:true});
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    var clienteSelectJson = JSON.parse(clienteSelect);

    const folderSelect = localStorage.getItem('folderSelect');
    var   folderSelectJson = JSON.parse(folderSelect);


    const textoBusqeuda = localStorage.getItem('textoBusqeuda');
    const filtroBusqeuda = localStorage.getItem('filtroBusqeuda');
    var typeUrl = '';
        if(filtroBusqeuda && filtroBusqeuda !== 'undefined' && filtroBusqeuda !== '-1'){
            typeUrl = '&type=' + filtroBusqeuda;
        }



    if(!clienteSelectJson){
        clienteSelectJson = {
            _id : '1'
        }
    }
    var pageAux = 1;
    if(page){
        pageAux = page;
    }
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
      instance2.get('/v1/clients/' + clienteSelectJson._id + '/objects?search=' + textoBusqeuda + typeUrl + '&page=' + pageAux + '&limit=24')
      .then((response) => {
            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data){
                response.data = orderByType(response.data,'folder')
                for(var i=0;i<response.data.length;i++){
                    if(response.data[i].type){
                        
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
            var limit= response.headers['x-pagination-limit'];
            
            var totalCount= response.headers['x-pagination-total-count'];

            var totalCountAux = parseInt(totalCount);
            var limitAux = parseInt(limit);
            dispatch({ type: GET_SEARCH_SUCCES, payload: response.data, parents: response.data.parents, imageVideos: arrImageVideo, limit: limitAux,totalCount: totalCountAux, pageActive: pageAux, loadingImg:false  });
            
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
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('/v1/clients/' + clienteSelectJson._id + '/objects/' +  caperta._id,{
        'name': caperta.name
    })
        .then((response) => {
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
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('/v1/clients/' + clienteSelectJson._id + '/objects/' +  caperta._id,{
       
    })
        .then((response) => {
            NotificationManager.success('Eliminado correctamente.');
            dispatch(getSearch());
        })
        .catch(error => {
            // error handling
        })
}





export const editObjectSearch = () => (dispatch) => {

    dispatch({ type: EDIT_OBJECT_SEARCH, editarObjetoSearchModal: true });

}

export const closeObjectSearch = () => (dispatch) => {

    dispatch({ type: CLOSE_OBJECT_SEARCH, editarObjetoSearchModal: false });

}


export const updatePendingObjectSearch = (objeto) => (dispatch) => {
   
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
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
            dispatch(getSearch());
            
        })
        .catch(error => {
            // error handling
        })
}







export const changePendingPDFSearch = (file, objetoDesc) => (dispatch) => {
    
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    
    
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: clienteSelectJson._id,
        extention: fileExtension(file.name),
        mimeType: file.type
    })
        .then((response) => {
            dispatch(addPendingPDFSearch(response.data.url, file, response.data.futureFileURL,objetoDesc))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
          ;
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addPendingPDFSearch = (urlImage, file, futureFileURL,objetoDesc) => (dispatch) => {

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: AppConfig.timeout,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type } })
        .then(function (result) {


            objetoDesc.metadata.licenseFile = futureFileURL;

            dispatch(updatePendingObjectSearch(objetoDesc))
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
           
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const updateObjectSearch = (objectChange) => (dispatch) => {
   
    dispatch({ type: GET_SEARCH });
    
    
    if(objectChange.isChangePDF){
        dispatch(changePendingPDFSearch(objectChange.filePDF, objectChange))
    }else{
        dispatch(updatePendingObjectSearch(objectChange))
    }
   



}