import axios from 'axios';
import { getToken } from './TokenService';

export const PaperService = {
    getPaper,
    basicSearch,
    advancedSearch,
    getCitedBy
}

function getPaper(api, id, revision, document, format) {
    return axios.get(`http://localhost:8043/api/${api}?collection=${id}&revision=${revision}&document=${document}&format=${format}&token=${getToken()}`);
}

function basicSearch(term) {
    return axios.get(`http://localhost:8043/api/paper/basicSearch?term=${term}`);
}

function advancedSearch(author, id, title, keywords, type) {
    return axios.get(`http://localhost:8043/api/paper/advancedSearch?paperId=${id}&paperTitle=${title}&paperAuthor=${author}&keywords=${keywords}&type=${type}`);
}

function getCitedBy(link) {
    return axios.get(`http://localhost:8043/api/paper/citedBy?paperLocation=${link}`);
}