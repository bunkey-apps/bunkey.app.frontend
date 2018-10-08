/**
 * App Settings Reducers
 */
import { NotificationManager } from 'react-notifications';
import {
  COLLAPSED_SIDEBAR,
  DARK_MODE,
  BOXED_LAYOUT,
  RTL_LAYOUT,
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
    CHANGE_AVATAR_FAILURE
} from '../actions/types';

// app config
import AppConfig from '../constants/AppConfig';

/**
 * initial app settings
 */
const INIT_STATE = {
  loading: false,
  navCollapsed: AppConfig.navCollapsed,
  darkMode: AppConfig.darkMode,
  boxLayout: AppConfig.boxLayout,
  rtlLayout: AppConfig.rtlLayout,
  miniSidebar: AppConfig.miniSidebar,
  searchFormOpen: false, // search form by default false
  // sidebar filter
  sidebarFilters: [
    'primary',
    'blue',
    'warning',
    'info',
    'danger',
    'success',
    'purple'
  ],
  // sidebar background image
  sidebarBackgroundImages: [
    require('../assets/img/sidebar-1.jpg'),
    require('../assets/img/sidebar-2.jpg'),
    require('../assets/img/sidebar-3.jpg'),
    require('../assets/img/sidebar-4.jpg'),
  ],
  sidebarActiveFilter: AppConfig.sidebarActiveFilter, // default sidebar color
  enableSidebarBackgroundImage: AppConfig.enableSidebarBackgroundImage, // default enable sidebar background
  selectedSidebarImage: AppConfig.sidebarImage, // default sidebar background image
  locale: AppConfig.locale,
  languages: [
    {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'en',
    },
    {
      languageId: 'chinese',
      locale: 'zh',
      name: 'Chinese',
      icon: 'zh',
    },
    {
      languageId: 'russian',
      locale: 'ru',
      name: 'Russian',
      icon: 'ru',
    },
    {
      languageId: 'hebrew',
      locale: 'he',
      name: 'Hebrew',
      icon: 'he',
    },
    {
      languageId: 'french',
      locale: 'fr',
      name: 'French',
      icon: 'fr',
    },
    {
      languageId: 'saudi-arabia',
      locale: 'ar',
      name: 'Arabic',
      icon: 'ar',
    },
    {
      languageId: 'german',
      locale: 'de',
      name: 'German',
      icon: 'de',
    },
    {
      languageId: 'spanish',
      locale: 'es',
      name: 'Spanish',
      icon: 'es',
    },
    {
      languageId: 'japanese',
      locale: 'ja',
      name: 'Japanese',
      icon: 'ja',
    },
    {
      languageId: 'korean',
      locale: 'ko',
      name: 'Korean',
      icon: 'ko',
    },
    {
      languageId: 'italian',
      locale: 'it',
      name: 'Italian',
      icon: 'it',
    },
    {
      languageId: 'hungarian',
      locale: 'hu',
      name: 'Hungarian',
      icon: 'hu',
    }
  ]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    // collapse sidebar
    case COLLAPSED_SIDEBAR:
      if (window.outerWidth > 1199) {
        if (action.isCollapsed) {
          NotificationManager.success('Barra lateral desactivada');

        } else {
          NotificationManager.success('Barra lateral activada');

        }
      }
      return { ...state, navCollapsed: action.isCollapsed };

    // dark mode
    case DARK_MODE:
      if (action.payload) {
        NotificationManager.success('Dark Mode Activated!');
      } else {
        NotificationManager.success('Dark Mode Deactivated!');
      }
      return { ...state, darkMode: action.payload };

    // boxed layout
    case BOXED_LAYOUT:
      if (action.payload) {
        NotificationManager.success('Box Layout Activated!');
      } else {
        NotificationManager.success('Box Layout Deactivated!');
      }
      return { ...state, boxLayout: action.payload };

    // rtl layout
    case RTL_LAYOUT:
      if (action.payload) {
        NotificationManager.success('Rtl Layout Activated!');
      } else {
        NotificationManager.success('Rtl Layout Deactivated!');
      }
      return { ...state, rtlLayout: action.payload };

    // mini sidebar
    case MINI_SIDEBAR:
      if (action.payload) {
        NotificationManager.success('Mini Sidebar Activated!');
      } else {
        NotificationManager.success('Mini Sidebar Deactivated!');
      }
      return { ...state, miniSidebar: action.payload };

    // search form
    case SEARCH_FORM_ENABLE:
      document.body.classList.toggle('search-active', !state.searchFormOpen);
      return { ...state, searchFormOpen: !state.searchFormOpen };

    // activate sidebar filter
    case ACTIVATE_SIDEBAR_FILTER:
      NotificationManager.success('Sidebar Filter Activated!');
      return { ...state, sidebarActiveFilter: action.payload };

    // togglw sidebar image
    case TOGGLE_SIDEBAR_IMAGE:
      return { ...state, enableSidebarBackgroundImage: !state.enableSidebarBackgroundImage };

    // set sidebar image
    case SET_SIDEBAR_IMAGE:
      NotificationManager.success('Sidebar Image Selected Successfully!');
      return { ...state, selectedSidebarImage: action.payload };

    // set language
    case SET_LANGUAGE:
      NotificationManager.success(`App Language ${action.payload.name} Selected Successfully!`);
      return { ...state, locale: action.payload };
    
    
    
      case CHANGE_PASSWORD:
      return { ...state, loading: true };

  case CHANGE_PASSWORD_SUCCES:
  NotificationManager.success('Clave actualizada correctamente');
      return { ...state, loading: false };
  // get Contratos
  case CHANGE_PASSWORD_FAILURE:
  NotificationManager.error('Ocurrio un error, intente más tarde');

  case CHANGE_AVATAR:
      return { ...state, loading: true };

  case CHANGE_AVATAR_SUCCES:
  NotificationManager.success('Avatar actualizado correctamente');
      return { ...state, loading: false };
  // get Contratos
  case CHANGE_AVATAR_FAILURE:
  NotificationManager.error('Ocurrio un error, intente más tarde');

      return {
          ...state,
          loading: false
      };
    default: return { ...state };
  }
}
