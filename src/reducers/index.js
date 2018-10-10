/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import todoAppReducer from './TodoAppReducer';
import authUserReducer from './AuthUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import contratosReducer from './ContratosReducer';
import usuariosReducer from './UsuariosReducer';
import clientesReducer from './ClientesReducer';
import tagsReducer from './TagsReducer';
import dashboardReducer from './DashboardReducer';
import configuracionReducer from './ConfiguracionReducer';
import explorarReducer from './ExplorarReducer';


const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  todoApp: todoAppReducer,
  authUser: authUserReducer,
  feedback: feedbacksReducer,
  contratos: contratosReducer,
  usuarios: usuariosReducer,
  clientes: clientesReducer,
  tags: tagsReducer,
  dashboard: dashboardReducer,
  configuracion: configuracionReducer,
  explorar: explorarReducer
});

export default reducers;
