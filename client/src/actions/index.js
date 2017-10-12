
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signinUser({email, password}){
    return function(dispatch) {
        // submit email/password to server
    
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then((response) => {
                // if request is good...
                // 1- update state to indicate user is authenticated
                dispatch( { type: AUTH_USER } );
                // 2- save the jwt token
                localStorage.setItem('token', response.data.token);
                // 3- redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                // if request is bad...
                // 1- Show an error to the user
                dispatch(authError('Error: Bad login info.'));
            });
    }
}
