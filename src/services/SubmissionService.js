import axios from 'axios';

export const SubmissionService = {
    getSumbissionsOfAuthor,
    getReviewableOfAuthor,
    getAllSubmissions,
    addSubmission,
    setEditor,
    setReviewers,
    takedown,
    setStatus,
    getPapersForSub,
    getReviewsForSub,
    addReview,
    addReviewForm,
    addRevision,
    declineReview
}

function getSumbissionsOfAuthor() {
    return axios.get('http://localhost:8043/api/submission/authored');
}

function getReviewableOfAuthor() {
    return axios.get('http://localhost:8043/api/submission/reviewable');
}

function getAllSubmissions() {
    return axios.get('http://localhost:8043/api/submission')
}

function addSubmission(xml) {
    var options = {
        headers: {
            'Content-Type': 'application/xml'
        }
    };
    return axios.post('http://localhost:8043/api/submission', xml, options)
}

function setEditor(submissionId, id) {
    const data = {
        editorId: id,
    }
    return axios.put(`http://localhost:8043/api/submission/${submissionId}/set_editor`, data)
}

function setReviewers(submissionId, ids) {
    const data = {
        reviewerIds: ids,
    }
    return axios.put(`http://localhost:8043/api/submission/${submissionId}/set_reviewers`, data)
}

function takedown(submissionId) {
    return axios.put(`http://localhost:8043/api/submission/${submissionId}/takedown`)
}

function setStatus(submissionId, status) {
    const data = {
        status: status
    }
    return axios.put(`http://localhost:8043/api/submission/${submissionId}/set_status`, data)
}

function getPapersForSub(submissionId) {
    return axios.get(`http://localhost:8043/api/paper/papersOfSubmission?submission=${submissionId}`)
}

function getReviewsForSub(submissionId) {
    return axios.get(`http://localhost:8043/api/reviewForm/reviewFormsOfSubmission?submissionId=${submissionId}`)
}


function addReview(submissionId, xml) {
    var options = {
        headers: {
            'Content-Type': 'application/xml'
        }
    };
    return axios.post(`http://localhost:8043/api/submission/${submissionId}/review`, xml, options)
}

function addReviewForm(submissionId, xml) {
    var options = {
        headers: {
            'Content-Type': 'application/xml'
        }
    };
    return axios.post(`http://localhost:8043/api/reviewForm/${submissionId}`, xml, options)
}

function addRevision(submissionId, xml) {
    var options = {
        headers: {
            'Content-Type': 'application/xml'
        }
    };
    return axios.post(`http://localhost:8043/api/submission/${submissionId}/revision`, xml, options)
}

function declineReview(submissionId) {
    return axios.delete(`http://localhost:8043/api/submission/${submissionId}/decline_reviewing`)
}


