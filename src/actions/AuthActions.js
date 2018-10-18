/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import firebase from 'firebase';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE
} from '../actions/types';


const instance = axios.create({
    baseURL: 'http://dev-api.bunkey.aureolab.cl/',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
  });



/**
 * Redux Action To Sigin User With Firebase
 */
export const signinUserInFirebase = (user, history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            localStorage.setItem("user_id", "user-id");
            dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
            history.push('/');
            NotificationManager.success('User Login Successfully!');
        })
        .catch((error) => {
            dispatch({ type: LOGIN_USER_FAILURE });
            NotificationManager.error(error.message);
        });
}

/**
 * Redux Action To Signout User From  Firebase
 */
export const logoutUserFromFirebase = () => (dispatch) => {
    firebase.auth().signOut()
        .then(() => {
            dispatch({ type: LOGOUT_USER });
            localStorage.removeItem('user_id');
            localStorage.removeItem('clienteSelect');
            localStorage.removeItem('user_me');
            localStorage.removeItem('folderSelect');
            localStorage.removeItem('menuLoad');
            
            NotificationManager.success('Adios');
        })
        .catch((error) => {
            NotificationManager.error(error.message);
        })
}

/**
 * Redux Action To Signup User In Firebase
 */
export const signupUserInFirebase = (user, history) => (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((success) => {
            localStorage.setItem("user_id", "user-id");
            dispatch({ type: SIGNUP_USER_SUCCESS, payload: localStorage.getItem('user_id') });
            history.push('/');
            NotificationManager.success('Account Created Successfully!');
        })
        .catch((error) => {
            dispatch({ type: SIGNUP_USER_FAILURE });
            NotificationManager.error(error.message);
        })
}

/**
 * Redux Action To Signin User In Firebase With Facebook
 */
export const signinUserWithFacebook = (history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        localStorage.setItem("user_id", "user-id");
        dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
        history.push('/');
        NotificationManager.success(`Hi ${result.user.displayName}!`);
    }).catch(function (error) {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error(error.message);
    });
}

/**
 * Redux Action To Signin User In Firebase With Google
 */
export const signinUserWithGoogle = (history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        localStorage.setItem("user_id", "user-id");
        dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
        history.push('/');
        NotificationManager.success(`Hi ${result.user.displayName}!`);
    }).catch(function (error) {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error(error.message);
    });
}

/**
 * Redux Action To Signin User In Firebase With Github
 */
export const signinUserWithGithub = (history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        localStorage.setItem("user_id", "user-id");
        dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
        history.push('/');
        NotificationManager.success(`Hi ${result.user.displayName}!`);
    }).catch(function (error) {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error(error.message);
    });
}

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const signinUserWithTwitter = (history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        localStorage.setItem("user_id", "user-id");
        dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
        history.push('/');
        console.log(result)
        NotificationManager.success('User Login Successfully!');
    }).catch(function (error) {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error(error.message);
    });
}


/**
 * Redux Action To Signin User in signinUserWithBunkey
 */
export const signinUserWithBunkey = (user, history) => (dispatch) => {
    console.log('signinUserWithBunkey2',user);
    dispatch({ type: LOGIN_USER });
    instance.post('v1/auth/sign-in',{
        email: user.email,
        password: user.password})
    .then((user) => {
        console.log('usuario es3',user);
        localStorage.setItem("user_id", JSON.stringify(user.data));
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user.data });
        history.push('/');
        NotificationManager.success('Ingreso correcto');
    })
    .catch((error) => {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error('Usuario o clave incorrecta, vuelve a intentar');
    });
}
