/**
 * Contratos Actions
 */
import axios from 'axios';
import {
    GET_CLIENTES,
    GET_CLIENTES_FAILURE,
    GET_CLIENTES_SUCCES,
    ADD_CLIENTES,
    ADD_CLIENTES_FAILURE,
    ADD_CLIENTES_SUCCES,
    UPDATE_CLIENTES,
    UPDATE_CLIENTES_FAILURE,
    UPDATE_CLIENTES_SUCCES,
    DELETE_CLIENTES,
    DELETE_CLIENTES_FAILURE,
    DELETE_CLIENTES_SUCCES,
    GET_CLIENTES_BY_ID_SUCCES
} from './types';

// app config
import AppConfig from '../constants/AppConfig';





/**
 * Redux Action To Get Clientes
 */
export const getClientes = () => (dispatch) => {
    dispatch({ type: GET_CLIENTES });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('v1/admin/clients')
        .then((response) => {
            dispatch({ type: GET_CLIENTES_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_CLIENTES_FAILURE});

        })
}


export const getClientesById = (workClients,position,arrayClientes,history) => (dispatch) => {
    dispatch({ type: GET_CLIENTES });
    if(!position){
        position = 0;
    }

    
    
    if(position < workClients.length){
        dispatch(getClienteById(workClients[position],position, workClients,arrayClientes,history))
    }else{

        if(arrayClientes.length > 1){
            dispatch({ type: GET_CLIENTES_SUCCES, payload: arrayClientes });
        }else{
            localStorage.setItem("clienteSelect", JSON.stringify(arrayClientes[0]));
            dispatch({ type: GET_CLIENTES_SUCCES, payload: [] });

            history.push('/app/dashboard');
        }
     
    }
   
}

export const getClienteById = (workClient,position,workClients, arrayClientes,history) => (dispatch) => {
   
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.get('v1/clients/' + workClient)
        .then((response) => {
            arrayClientes.push(response.data);
            dispatch(getClientesById(workClients,position+1,arrayClientes,history))
            
        })
        .catch(error => {
            // error handling
            dispatch(getClientesById(workClients,position+1))
           

        })
}


/**
 * Redux Action To ADD Clientes
 */
export const addClientes = (client) => (dispatch) => {
    dispatch({ type: ADD_CLIENTES });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.post('v1/admin/clients',{
        dni: client.dni,
        name: client.name,
        agent: client.agent,
        email: client.email,
        phone: client.phone,
        acountSetting: {
            logo: 'https://vignette.wikia.nocookie.net/gameofthrones/images/e/ed/Night%27s-Watch-Main-Shield.PNG',
            background: 'https://vignette.wikia.nocookie.net/gameofthrones/images/7/7b/Castle_Black.jpg',
            language: 'es'
        }
    })
        .then((response) => {
            dispatch({ type: ADD_CLIENTES_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
            dispatch({ type: ADD_CLIENTES_FAILURE});
        })
}



/**
 * Redux Action To Update Clientes
 */
export const updateClientes = (client) => (dispatch) => {
    dispatch({ type: UPDATE_CLIENTES });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

  
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('v1/admin/clients/' + client._id,{
        dni: client.dni,
        name: client.name,
        agent: client.agent,
        email: client.email,
        phone: client.phone,
        acountSetting: {
            logo: 'https://vignette.wikia.nocookie.net/gameofthrones/images/e/ed/Night%27s-Watch-Main-Shield.PNG',
            background: 'https://vignette.wikia.nocookie.net/gameofthrones/images/7/7b/Castle_Black.jpg',
            language: 'es'
        }
    })
        .then((response) => {
            dispatch({ type: UPDATE_CLIENTES_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
            dispatch({ type: UPDATE_CLIENTES_FAILURE});
        })
}


/**
 * Redux Action To Delete Clientes
 */
export const daleteClientes = (client) => (dispatch) => {
    dispatch({ type: DELETE_CLIENTES });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

  
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('v1/admin/clients/' + client._id)
        .then((response) => {
            dispatch({ type: DELETE_CLIENTES_SUCCES});
        })
        .catch(error => {
            // error handling
            dispatch({ type: DELETE_CLIENTES_FAILURE});
        })
}