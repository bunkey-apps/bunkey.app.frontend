/**
 * Invite Actions
 */
import axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import jwtDecode from 'jwt-decode';
import {
    GET_COMPARTIDOS_INVITADOS,
    GET_COMPARTIDOS_INVITADOS_FAILURE,
    GET_COMPARTIDOS_INVITADOS_SUCCES,
   
    
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get Invite
 */





/**
 * Redux Action To ADD Invite
 */
export const getCompartidosInvitado = (webToken) => (dispatch) => {
    console.log('getCompartidosInvitado FORM',webToken);
    dispatch({ type: GET_COMPARTIDOS_INVITADOS });
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json'}
      });

   
    instance2.post('v1/shared/validate',{
        'webToken': webToken
    })
        .then((response) => {
            console.log('getCompartidosInvitado',response);
           
            var decode = jwtDecode(response.data.accessToken);
            console.log('decode',decode);
            console.log('decode',decode.user);
            localStorage.setItem("compartidosUser", JSON.stringify(decode));
            localStorage.setItem("accessTokenCompartidos", JSON.stringify(response.data));
            
            dispatch(getObjectsCompartidos(response.data.accessToken, decode.user.client, decode.user.object));

           
            
        })
        .catch(error => {
            dispatch({ type: GET_COMPARTIDOS_INVITADOS_FAILURE });
        NotificationManager.error(error.message);
        })
}


export const getObjectsCompartidos = (accessToken, idCliente, idObject) => (dispatch) => {
    
    
   


    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + accessToken}
      });
   
    instance2.get('/v1/clients/' + idCliente + '/objects/' +  idObject)
        .then((response) => {
            console.log('response GET_OBJECT_SUCCES',response);

            var arrImageVideo = [];
            var cont = 0;
            var collapseRows = 0;
            if(response.data.children){
                var arrEmulateChildren = {
                    children: [],
                    parents: []
                }
                if(response.data.children.length === 0){
                    arrEmulateChildren.children.push(response.data)
                    response.data = arrEmulateChildren;

                }

                console.log('response.data neww',response.data);



                for(var i=0;i<response.data.children.length;i++){
                    console.log('entra forrr');
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


            dispatch({ type: GET_COMPARTIDOS_INVITADOS_SUCCES, payload: response.data.children, parents: response.data.parents, imageVideos: arrImageVideo });
            
        })
        .catch(error => {
            dispatch({ type: GET_COMPARTIDOS_INVITADOS_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}



export const getObjectsCompartidosExplore = () => (dispatch) => {
    dispatch({ type: GET_COMPARTIDOS_INVITADOS });
    const token = localStorage.getItem('accessTokenCompartidos');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('compartidosUser');
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
   
    instance2.get('/v1/clients/' + clienteSelectJson.user.client + '/objects/' +  folderSelectJson._id)
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
            dispatch({ type: GET_COMPARTIDOS_INVITADOS_SUCCES, payload: response.data.children, parents: response.data.parents, imageVideos: arrImageVideo  });
            
        })
        .catch(error => {
            dispatch({ type: GET_COMPARTIDOS_INVITADOS_FAILURE})
            NotificationManager.error('A ocurrido un error, intente mas tarde.');
        })
}
