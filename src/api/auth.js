import Cookies from 'js-cookie';
import axios from './index';

const AUTH_API = process.env.VUE_APP_FIREBASE_API

export function loginWithFirebase(email, password) {
    const payload = {
        email,
        password,
        returnSecureToken: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API}`,
        method: "post",
        data: payload
    })
}

export function registerWithFirebase(email, password) {
    const payload = {
        email,
        password,
        returnSecureToken: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API}`,
        method: "post",
        data: payload
    })
}

export function resetpasswordWithFirebase(email) {
    const payload = {
        email,
        requestType: "PASSWORD_RESET"
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${AUTH_API}`,
        method: "post",
        data: payload
    })
}

export function getNewAccessToken() {
    const token = Cookies.get('refreshToken')
    const payload = {
        grant_type: "refresh_token",
        refresh_token: token
    }
    return axios({
        url: `https://securetoken.googleapis.com/v1/token?key=${AUTH_API}`,
        method: "post",
        data: payload
    })

}

export function loginWithGoogle(token) {
    const payload = {
        requestUri: "http://localhost",
        postBody: `id_token=${token}&providerId=google.com`,
        returnSecureToken: true,
        returnIdpCredential: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${AUTH_API}`,
        method: 'post',
        data: payload
    })
}

export function loginWithFacebook(token) {
    const payload = {
        requestUri: "http://localhost",
        postBody: `access_token=${token}&providerId=facebook.com`,
        returnSecureToken: true,
        returnIdpCredential: true
    }
    return axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${AUTH_API}`,
        method: 'post',
        data: payload
    })

}