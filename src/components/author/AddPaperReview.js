import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { SubmissionService } from '../../services/SubmissionService';
import { PaperService } from '../../services/PaperService';
import { useParams } from 'react-router-dom';
import { reviewPaperDocSpec } from '../../helpers/reviewPaperDocSpec';

const AddPaperReview = () => {
    const [xml, setXml] = useState('<paper></paper>');
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
        SubmissionService.addReview(submissionId, xmlString)
            .then(() => {
                setText({
                    success: 'Succesful upload',
                    error: ''
                })
                setXml('<paper></paper>');
            },
                () => {
                    setText({
                        success: '',
                        error: 'Error uploading xml'
                    })
                })
    }

    useEffect(() => {
        SubmissionService.getSubmission(submissionId)
            .then(response => {
                const sub = response.data
                PaperService.getPaper('paper', sub.id, sub.currentRevision, 'paper_anon.xml', 'string')
                    .then(response => setXml(response.data))
            })
    }, [submissionId])

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
            <Upload name="editer" xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Add paper with notes"} docSpec={reviewPaperDocSpec} />
        </Container>
    )
}

export default AddPaperReview;

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