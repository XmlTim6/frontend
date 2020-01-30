import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { SubmissionService } from '../../services/SubmissionService';


const AddSubmission = () => {
    const [xml, setXml] = useState('<paper></paper>');

    const handleSubmitXml = e => {
        e.preventDefault();
        const xmlString = window.Xonomy.harvest();
        SubmissionService.addSubmission(xmlString)
            .then(() => {
                setXml('<paper></paper>');
            })
    }

    return (
        <Container>
            <Header />
            <Upload xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Upload submission"} />
        </Container>
    )
}

export default AddSubmission;