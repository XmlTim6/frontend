import React, { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from '../shared/Header';
import Upload from './Upload';
import { CoverLetterService } from '../../services/CoverLetterService';
import { useParams } from 'react-router-dom';
import { coverDocSpec } from '../../helpers/coverDocSpec';

const AddCoverLetter = () => {
    let { submissionId } = useParams();

    const [xml, setXml] = useState('<cover_letter xmlns="XML_tim6"></cover_letter>');
    const [text, setText] = useState({
        error: '',
        success: ''
    })

    const handleSubmitXml = () => {
        setText({
            error: '',
            success: ''
        });
        const xmlString = window.Xonomy.harvest().replace(/xml:space='preserve'/g, "");
        setXml(xmlString);
        CoverLetterService.createCoverLetter(submissionId, xmlString)
            .then(() => {
                setText({
                    success: 'Succesful upload',
                    error: ''
                })
                setXml('<cover_letter xmlns="XML_tim6"></cover_letter>');
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
            <Upload name="editer" xml={xml} setXml={setXml} handleSubmit={handleSubmitXml} title={"Upload cover letter"} docSpec={coverDocSpec} />
        </Container>
    )
}

export default AddCoverLetter;

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