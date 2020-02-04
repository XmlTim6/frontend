import React, { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { SubmissionService } from '../../services/SubmissionService';
import { useParams } from 'react-router-dom';
import { reviewDocSpec } from '../../helpers/reviewDocSpec';

const AddReviewForm = () => {
    const [xml, setXml] = useState('<review_form xmlns="XML_tim6"></review_form>');
    const [text, setText] = useState({
        error: '',
        success: ''
    })

    const { submissionId } = useParams();

    const handleSubmitXml = () => {
        setText({
            error: '',
            success: ''
        });
        const xmlString = window.Xonomy.harvest().replace(/xml:space='preserve'/g, "");
        setXml(xmlString);
        SubmissionService.addReviewForm(submissionId, xmlString)
            .then(() => {
                setText({
                    success: 'Succesful upload',
                    error: ''
                })
                setXml('<review_form xmlns="XML_tim6"></review_form>');
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
            <Upload name="editer" xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Add review form"} docSpec={reviewDocSpec} />
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