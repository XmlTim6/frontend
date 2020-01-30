import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import { SubmissionService } from '../../services/SubmissionService';
import { Container, Typography, makeStyles } from '@material-ui/core';
import SumbissionItemReview from './SubmissionItemReview';

const AssignedReviews = () => {

    const [submissions, setSubmissions] = useState([])

    const getSubmissions = () => {
        SubmissionService.getReviewableOfAuthor()
            .then(response => setSubmissions(response.data))
    }

    useEffect(() => {
        getSubmissions();
    }, [])

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Header />
            <Typography variant="h5">
                Assigned reviews
            </Typography>
            <div>
                {submissions.map(s => (
                    <SumbissionItemReview submission={s} key={s.id} />
                ))}
            </div>
        </Container>
    )
}

export default AssignedReviews;

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    }
}))