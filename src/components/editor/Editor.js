import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { SubmissionService } from '../../services/SubmissionService';
import SubmissionItemEditor from './SubmissionItemEditor';
import { UserService } from '../../services/UserService';
import EditorDialog from '../shared/EditorDialog';
import ReviewerDialog from '../shared/ReviewerDialog';

const Editor = () => {

    const [submissions, setSubmissions] = useState([])
    const [users, setUsers] = useState({
        authors: [],
        editors: []
    })

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

    const [openEditor, setOpenEditor] = useState(false);
    const [submissionId, setSubmissionId] = useState('');
    const openEditorDialog = (submissionId) => {
        setSubmissionId(submissionId);
        setOpenEditor(true);
    }

    const closeEditorDialog = () => {
        setOpenEditor(false);
    };

    const handleSubmitEditor = (editorId) => {
        SubmissionService.setEditor(submissionId, editorId)
            .then(() => {
                closeEditorDialog();
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
                        openEditorDialog={openEditorDialog}
                        openAuthorDialog={openAuthorDialog}
                    />
                ))}
            </div>
            <EditorDialog
                editors={users.editors}
                open={openEditor}
                onClose={closeEditorDialog}
                handleSubmit={handleSubmitEditor}
            />
            <ReviewerDialog
                authors={users.authors}
                open={openAuthor}
                onClose={closeAuthorDialog}
                handleSubmit={handleSubmitAuthor}
                userId={userId} />
        </Container>
    )
}

export default Editor;

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    }
}))