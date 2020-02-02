import React, { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { SubmissionService } from '../../services/SubmissionService';


const AddReviewForm = () => {
    const [xml, setXml] = useState('<review_form></review_form>');
    const [text, setText] = useState({
        error: '',
        success: ''
    })

    const handleSubmitXml = () => {
        setText({
            error: '',
            success: ''
        });
        const xmlString = window.Xonomy.harvest();
        setXml(xmlString);
        SubmissionService.addSubmission(xmlString)
            .then(() => {
                setText({
                    success: 'Succesful upload',
                    error: ''
                })
                setXml('<review_form></review_form>');
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
            <Upload name="editer" xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Add review form"} />      
        </Container>
    )
}

export default AddReviewForm;

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