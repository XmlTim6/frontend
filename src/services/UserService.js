import axios from 'axios';
import { removeToken, decodeToken, getToken } from './TokenService';

export const UserService = {
    getCurrentUser,
    getUserProfile,
    getAllUsers,
    update,
    login,
    logout,
    register,
}

function getCurrentUser(){
    return decodeToken(getToken());
}

function getUserProfile(){
    return axios.get(`http://localhost:8043/api/users`)
}

function getAllUsers(){
    return axios.get(`http://localhost:8043/api/users/all`)
}

function update(data){
    return axios.put(`http://localhost:8043/api/users`, data)
}

function login (credentials) {
    const data = {
        ...credentials
      }
    return axios.post(`http://localhost:8043/api/auth`, data)
}

function logout() {
    removeToken();
}

function register(credentials, type) {
    const data = {
        ...credentials
    }
    return axios.post(`http://localhost:8043/api/users/${type}`, data)
}
