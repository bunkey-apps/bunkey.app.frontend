/**
 * Redux App Settings Actions
 */

import axios from 'axios';
import fileExtension from 'file-extension';
import AppConfig from '../constants/AppConfig';
import { NotificationManager } from 'react-notifications';


import {
    COLLAPSED_SIDEBAR,
    DARK_MODE,
    BOXED_LAYOUT,
    RTL_LAYOUT,
    TOGGLE_MENU,
    MINI_SIDEBAR,
    SEARCH_FORM_ENABLE,
    ACTIVATE_SIDEBAR_FILTER,
    TOGGLE_SIDEBAR_IMAGE,
    SET_SIDEBAR_IMAGE,
    SET_LANGUAGE,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCES,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_AVATAR,
    CHANGE_AVATAR_SUCCES,
    CHANGE_AVATAR_FAILURE,
    GET_USER_ME,
    GET_USER_ME_SUCCES,
    GET_CLIENTE_SELECT_HEADER
} from './types';

/**
 * Redux Action To Emit Collapse Sidebar
 * @param {*boolean} isCollapsed 
 */
export const collapsedSidebarAction = (isCollapsed) => ({
    type: COLLAPSED_SIDEBAR,
    isCollapsed
});

/**
 * Redux Action To Emit Dark Mode
 * @param {*boolean} isDarkMode 
 */
export const darkModeAction = (isDarkMode) => ({
    type: DARK_MODE,
    payload: isDarkMode
});

/**
 * Redux Action To Emit Boxed Layout
 * @param {*boolean} isBoxLayout 
 */
export const boxLayoutAction = (isBoxLayout) => ({
    type: BOXED_LAYOUT,
    payload: isBoxLayout
});

/**
 * Redux Action To Emit Rtl Layout
 *  @param {*boolean} isRtlLayout
 */
export const rtlLayoutAction = (isRtlLayout) => ({
    type: RTL_LAYOUT,
    payload: isRtlLayout
});

/**
 * Redux Action To Toggle Sidebar Menus
 */
export const onToggleMenu = (selectedMenu) => ({
    type: TOGGLE_MENU,
    payload: selectedMenu
});

/**
 * Redux Action To Emit Mini Sidebar
 */
export const miniSidebarAction = (isMiniSidebar) => ({
    type: MINI_SIDEBAR,
    payload: isMiniSidebar
});

/**
 * Redux Action To Enable/Disable The Search Form
 */
export const toggleSearchForm = () => ({
    type: SEARCH_FORM_ENABLE
});

/**
 * Reduc Action To Activate Sidebar Filters
 */
export const activateSidebarFilter = (filter) => ({
    type: ACTIVATE_SIDEBAR_FILTER,
    payload: filter
});

/**
 * Redux Action To Enable/Disable Sidebar Background Image
 */
export const toggleSidebarImage = () => ({
    type: TOGGLE_SIDEBAR_IMAGE
});

/**
 * Redux Action To Set Sidebar Background Image
 */
export const setSidebarBgImageAction = (sidebarImage) => ({
    type: SET_SIDEBAR_IMAGE,
    payload: sidebarImage
});

/**
 * Redux Action To Set Language
 */
export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language
});



export const changePassword = (clave) => (dispatch) => {

    dispatch({ type: CHANGE_PASSWORD });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);

    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.put('v1/users/me', {
        password: clave
    })
        .then((response) => {
            dispatch({ type: CHANGE_PASSWORD_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_PASSWORD_FAILURE });
        })
}

export const changeAvatar = (file) => (dispatch) => {
    dispatch({ type: CHANGE_AVATAR });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken },
    });


    var tipoArr = file.type.split('/');

    instance2.post('/v1/url-signature', {
        clientId: userMeJson._id,
        extention: fileExtension(file.name),
        mimeType: file.type
    })
        .then((response) => {
            dispatch(addAvatar(response.data.url, file, response.data.futureFileURL))
            //dispatch({ type: GET_URL_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_AVATAR_FAILURE });
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        })
}

export const addAvatar = (urlImage, file, futureFileURL) => (dispatch) => {

    // dispatch({ type: PUT_IMAGE });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    var instance2 = axios.create({
        baseURL: urlImage,
        timeout: AppConfig.timeout,
        body: file
    });


    var instance = axios.create();

    instance.put(urlImage, file, { headers: { 'Content-Type': file.type, 'Content-Disposition': 'attachment' } })
        .then(function (result) {
            dispatch(actualizarAvatar(futureFileURL));
            //dispatch({ type: PUT_IMAGE_SUCCES});
        })
        .catch(function (err) {
            dispatch({ type: CHANGE_AVATAR_FAILURE })
            NotificationManager.error('A ocurrido un error, intente mas tarde.');

        });
}


export const actualizarAvatar = (url) => (dispatch) => {

    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);
    userMeJson.avatar = url;
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.put('v1/users/me', {
        avatar: url
    })
        .then((response) => {
            localStorage.setItem("user_me", JSON.stringify(userMeJson));

            dispatch(getUserMe());
        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_AVATAR_FAILURE });
        })
}

export const getUserMe = () => (dispatch) => {
    dispatch({ type: GET_USER_ME });
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);

    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('v1/users/me')
        .then((response) => {
            localStorage.setItem("user_me", JSON.stringify(response.data));
            dispatch({ type: GET_USER_ME_SUCCES, payload: response.data });

        })
        .catch(error => {
            // error handling
        })
}

export const getClientSelectHeader = () => (dispatch) => {


    const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
    
    var logo = '';
    if(clienteSelectJson && clienteSelectJson.acountSetting){
      logo =  clienteSelectJson.acountSetting.logo;
    }

    dispatch({ type: GET_CLIENTE_SELECT_HEADER, clienteSelectAvatar: logo });
   
    
}

export const getAllTags = () => (dispatch) => {
   
    const token = localStorage.getItem('user_id');

    const tokenJson = JSON.parse(token);
    var instance2 = axios.create({
        baseURL: AppConfig.baseURL,
        timeout: AppConfig.timeout,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenJson.accessToken }
    });

    instance2.get('v1/tags?all=true')
        .then((response) => {
            localStorage.setItem("allTags", JSON.stringify(response.data));
            

        })
        .catch(error => {
            // error handling
        })
}