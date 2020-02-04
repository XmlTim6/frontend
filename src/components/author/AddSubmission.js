import React, { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { SubmissionService } from '../../services/SubmissionService';
import { paperDocSpec } from '../../helpers/paperDocSpec';

const AddSubmission = () => {
    const [xml, setXml] = useState('<paper xmlns="XML_tim6" title=""></paper>');
    const [text, setText] = useState({
        error: '',
        success: ''
    })
    
    const handleSubmitXml = () => {
        setText({
            error: '',
            success: ''
        });
        const xmlString = window.Xonomy.harvest().replace(/xml:space='preserve'/g, "")
        setXml(xmlString);
        SubmissionService.addSubmission(xmlString)
            .then(() => {
                setText({
                    success: 'Succesful upload',
                    error: ''
                })
                setXml('<paper xmlns="XML_tim6" title=""></paper>');
            },
                () => {
                    setText({
                        success: '',
                        error: 'Error uploading xml'
                    })
                })
    }

    const classes = useStyles();

    return (
        <Container>
            <Header />
            <Container className={classes.error}>
                {text.error}
                <span className={classes.success}>
                    {text.success}
                </span>
            </Container>
            <Upload name="editer" xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Upload submission"} docSpec={paperDocSpec}/>      
        </Container>
    )
}

export default AddSubmission;

const useStyles = makeStyles(theme => ({
    error: {
        color: 'red',
        marginTop: theme.spacing(2),
        fontSize: 18
    },
    success: {
        color: 'blue',
    }
}))