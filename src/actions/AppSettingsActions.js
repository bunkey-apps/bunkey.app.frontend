/**
 * Redux App Settings Actions
 */

import axios from 'axios';
import AppConfig from '../constants/AppConfig';


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
    CHANGE_PASSWORD_FAILURE
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

    console.log('tokenJson5',tokenJson.accessToken);
    const userMe = localStorage.getItem('user_me');
    const userMeJson = JSON.parse(userMe);
    
    var instance2 = axios.create({
        baseURL: 'http://dev-api.bunkey.aureolab.cl/',
        timeout: 3000,
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + tokenJson.accessToken}
      });
   
    instance2.put('v1/users/me',{
        password: clave
    })
        .then((response) => {
            console.log('response usuarios4',response);
            dispatch({ type: CHANGE_PASSWORD_SUCCES });
        })
        .catch(error => {
            // error handling
            dispatch({ type: CHANGE_PASSWORD_FAILURE });
        })
}
