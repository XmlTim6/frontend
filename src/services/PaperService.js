import axios from 'axios';
import { getToken } from './TokenService';

export const PaperService = {
    getPaper
}

function getPaper(api, id, revision, document, format){
    return axios.get(`http://localhost:8043/api/${api}?collection=${id}&revision=${revision}&document=${document}&format=${format}&token=${getToken()}`);
}