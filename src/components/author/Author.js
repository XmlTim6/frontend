import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import { SubmissionService } from '../../services/SubmissionService';
import SubmissionitemAuthor from '../author/SubmissionItemAuthor';
import { Container, makeStyles, Typography } from '@material-ui/core';

const Author = () => {

    const [submissions, setSubmissions] = useState([])

    const getSubmissions = () => {
        SubmissionService.getSumbissionsOfAuthor()
            .then(response => setSubmissions(response.data))
    }

    const handleTakedown = (submissionId) => {
        SubmissionService.takedown(submissionId)
            .then(() => getSubmissions())
    }

    useEffect(() => {
        getSubmissions();
    }, [])    

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Header />
            <Typography variant="h5">
                My submissions
            </Typography>
            <div>
                {submissions.map(s => (
                    <SubmissionitemAuthor
                        submission={s}
                        key={s.id}
                        handleTakedown={handleTakedown}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Author;

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    }
}))