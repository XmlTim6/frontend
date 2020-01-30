import axios from 'axios';
import { getToken } from './TokenService';
import { UserService } from './UserService';

export const setupInterceptors = () => {
  axios.interceptors.request.use(config => {
    if (getToken() !== null) {
      config.headers['X-Auth-Token'] = `${getToken()}`
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response !== undefined && error.response.status === 401) {
      UserService.logout();
      window.location.reload();
    }
    return Promise.reject(error);
  });
}
