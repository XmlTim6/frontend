import axios from 'axios';

export const CoverLetterService = {
    getCoversForSub,
    createCoverLetter,
}

function getCoversForSub(submissionId) {
    return axios.get(`http://localhost:8043/api/coverLetter/coverLettersOfSubmission?submissionId=${submissionId}`)
}

function createCoverLetter(submissionId, xml) {
    var options = {
        headers: {
            'Content-Type': 'application/xml'
        }
    };
    return axios.post(`http://localhost:8043/api/coverLetter/${submissionId}`, xml, options)
}