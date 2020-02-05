import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { SubmissionService } from '../../services/SubmissionService';
import SubmissionItemEditor from './SubmissionItemEditor';
import { UserService } from '../../services/UserService';
import ReviewerDialog from '../shared/ReviewerDialog';

const Editor = () => {

    const [submissions, setSubmissions] = useState([])
    const [users, setUsers] = useState({
        authors: [],
        editors: []
    })

    const [recommended, setRecommended] = useState([])

    const getSubmissions = () => {
        SubmissionService.getAllSubmissions()
            .then(response => setSubmissions(response.data))
    }

    const getAllUsers = () => {
        UserService.getAllUsers()
            .then(response => {
                setUsers({
                    authors: response.data.filter(u => u.role === "ROLE_AUTHOR"),
                    editors: response.data.filter(u => u.role === "ROLE_EDITOR")
                })
            })
    }

    useEffect(() => {
        getSubmissions();
        getAllUsers();
    }, [])

    const [submissionId, setSubmissionId] = useState('');

    useEffect(() => {
        if(submissionId.length === 0){
            return
        }
        SubmissionService.getRecommended(submissionId)
            .then(response => setRecommended(response.data))
    }, [submissionId])


    const handleSubmitEditor = (subId) => {
        SubmissionService.setEditor(subId, UserService.getCurrentUser().sub)
            .then(() => {
                getSubmissions();
            })
    }

    const [openAuthor, setOpenAuthor] = useState(false);
    const [userId, setUserId] = useState(0);
    const openAuthorDialog = (submissionId, userId) => {
        setSubmissionId(submissionId);
        setUserId(userId);
        setOpenAuthor(true);
    }

    const closeAuthorDialog = () => {
        setOpenAuthor(false);
    };

    const handleSubmitAuthor = (ids) => {
        SubmissionService.setReviewers(submissionId, ids)
            .then(() => {
                closeAuthorDialog();
                getSubmissions();
            })
    }

    const setStatus = (id, status) => {
        SubmissionService.setStatus(id, status)
            .then(() => {
                getSubmissions();
            },
                error => {
                    console.log(error.response)
                })
    }

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Header />
            <Typography variant="h5">
                All submissions
            </Typography>
            <div>
                {submissions.map(s => (
                    <SubmissionItemEditor
                        submission={s}
                        key={s.id}
                        users={users}
                        openAuthorDialog={openAuthorDialog}
                        setStatus={setStatus}
                        setEditor={handleSubmitEditor}
                    />
                ))}
            </div>
            <ReviewerDialog
                authors={users.authors}
                open={openAuthor}
                onClose={closeAuthorDialog}
                handleSubmit={handleSubmitAuthor}
                userId={userId}
                recommended={recommended}
            />
        </Container>
    )
}

export default Editor;

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    }
}))