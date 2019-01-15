/**
 * Contratos Actions
 */
import axios from 'axios';
import moment from 'moment';
import {
    GET_CONTRATOS,
    GET_CONTRATOS_FAILURE,
    GET_CONTRATOS_SUCCES,
    ADD_CONTRATOS,
    ADD_CONTRATOS_SUCCES,
    ADD_CONTRATOS_FAILURE,
    UPDATE_CONTRATOS,
    UPDATE_CONTRATOS_SUCCES,
    UPDATE_CONTRATOS_FAILURE,
    DELETE_CONTRATOS,
    DELETE_CONTRATOS_SUCCES,
    DELETE_CONTRATOS_FAILURE
} from './types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * Redux Action To Get Contratos
 */


export const getContratos = () => (dispatch) => {
    dispatch({ type: GET_CONTRATOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('clienteSelect',clienteSelect);
    
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
    instance2.get('v1/admin/clients/' + clienteSelectJson._id + '/contracts')
        .then((response) => {
            console.log('response contratos',response);
            dispatch({ type: GET_CONTRATOS_SUCCES, payload: response.data });
        })
        .catch(error => {
            // error handling
            dispatch({ type: GET_CONTRATOS_FAILURE });
        })
}


/**
 * Redux Action To ADD Contrato
 */
export const addContrato = (contrato) => (dispatch) => {
    console.log('addContrato FORM',contrato);
    dispatch({ type: ADD_CONTRATOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

      console.log('mo22ment(contrato.startDate).utc().format()',moment(contrato.startDate).utc().format());
   
    instance2.post('v1/admin/contracts',{
        client: clienteSelectJson._id,
        monthlyPaymentDay: contrato.monthlyPaymentDay,
        monthlyCost: contrato.monthlyCost,
        startDate: moment(contrato.startDate).utc().format(),
        endDate:  moment(contrato.endDate).utc().format(),
        plan: {
            sizeTotal: contrato.sizeTotal,
            sizeVideoRow: contrato.sizeVideoRow,
            sizeVideoFinal: contrato.sizeVideoFinal
        }
    })
        .then((response) => {
            console.log('Contrato creado',response);
            dispatch({ type: ADD_CONTRATOS_SUCCES});
        })
        .catch(error => {
            // error handling
        })
}


/**
 * Redux Action To Edit Contrato
 */
export const updateContrato = (contrato) => (dispatch) => {
    console.log('update FORM',contrato);
    dispatch({ type: UPDATE_CONTRATOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
   
    console.log('tokenJson4',tokenJson.accessToken);
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });

      console.log('mo22ment(contrato.startDate).utc().format()',moment(contrato.startDate).utc().format());
   
    instance2.put('v1/admin/contracts/' + contrato._id ,{
        client: contrato.client,
        monthlyPaymentDay: contrato.monthlyPaymentDay,
        monthlyCost: contrato.monthlyCost,
        startDate: moment(contrato.startDate).utc().format(),
        endDate:  moment(contrato.endDate).utc().format(),
        plan: {
            sizeTotal: contrato.sizeTotal,
            sizeVideoRow: contrato.sizeVideoRow,
            sizeVideoFinal: contrato.sizeVideoFinal
        }
    })
        .then((response) => {
            console.log('Contrato creado',response);
            dispatch({ type: UPDATE_CONTRATOS_SUCCES});
        })
        .catch(error => {
            // error handling
        })
}

/**
 * Redux Action To Delete Clientes
 */
export const deleteContrato = (contrato) => (dispatch) => {
    console.log('delete FORM',contrato);
    dispatch({ type: DELETE_CONTRATOS });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    console.log('tokenJson4',tokenJson.accessToken);

  
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 10000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.delete('v1/admin/contracts/' + contrato._id)
        .then((response) => {
            console.log('response contracts',response);
            dispatch({ type: DELETE_CONTRATOS_SUCCES});
        })
        .catch(error => {
            // error handling
            dispatch({ type: DELETE_CONTRATOS_FAILURE});
        })
}