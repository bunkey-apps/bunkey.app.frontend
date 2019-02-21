import Token from '../util/Token';
import { NotificationManager } from 'react-notifications';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

import {
    GET_FAVORITES,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE,
} from './types';

export const getFavorites = (client) => async (dispatch) => {

    const accessToken = Token.get();
    
    console.log('getFavorites -> client', client);
    const params = {
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { Authorization: `Bearer ${accessToken}`}
    };
    try {
        dispatch({ type: GET_FAVORITES });
        const { data } = await axios.create(params).get(`/v1/users/me/clients/${client}/favorites`);
        console.log('getFavoritos -> data', data);
        
        dispatch({ type: GET_FAVORITES_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: GET_FAVORITES_FAILURE, payload: { error } });
        console.error(error);
        NotificationManager.error(`Ocurrio un error al intentar obtener los favoritos en el cliente ${client}`, 'Atención')
    }
}