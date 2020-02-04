import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { checkClosed } from '../../helpers/checkClosed';
import { SubmissionService } from '../../services/SubmissionService';
import { CoverLetterService } from '../../services/CoverLetterService';
import PaperDialog from '../shared/PaperDialog';

const SumbissionItemEditor = (props) => {
    const { submission, users, openEditorDialog, openAuthorDialog, setStatus } = props

    const classes = useStyles();

    const editor = users.editors.filter(e => e.id === submission.editorId)[0];
    const author = users.authors.filter(a => a.id === submission.userId)[0];

    const [papers, setPapers] = useState([])
    const [reviews, setReviews] = useState([])
    const [letters, setLetters] = useState([])

    useEffect(() => {
        SubmissionService.getPapersForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setPapers(links)
            })
        SubmissionService.getReviewsForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setReviews(links)
            })
        CoverLetterService.getCoversForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setLetters(links)
            })
    }, [submission])

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <div className={classes.flexContainer}>
                    <div>
                        <Typography variant="h6">
                            {`Title: ${submission.title}`}
                        </Typography>
                        <Typography>
                            <span>
                                Author: {author !== undefined && `${author.name} ${author.surname}`}
                                <br />
                                Editor: {editor !== undefined && `${editor.name} ${editor.surname}`}
                                <br />
                                Reviewers: {submission.reviewerIds.map(id => {
                                    const user = users.authors.filter(a => a.id === id)[0];
                                    return <span key={id}>{` ${user.name} ${user.surname},`}</span>
                                })}
                                <br />
                            </span>
                            {`Status: ${submission.status}`}
                            <br />
                            {`Revision: ${submission.currentRevision}`}
                        </Typography>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <Button
                        className={classes.wideButton}
                        color="primary"
                        variant="contained"
                        onClick={handleOpenDialog}
                    >
                        SEE PAPERS
                        </Button>
                    {
                        !checkClosed(submission) &&
                        <span>
                            <Button
                                className={classes.wideButton}
                                color="primary"
                                variant="contained"
                                onClick={() => openEditorDialog(submission.id)}
                            >
                                SET EDITOR
                        </Button>
                            <Button
                                className={classes.wideButton}
                                color="primary"
                                variant="contained"
                                onClick={() => openAuthorDialog(submission.id, submission.userId)}
                            >
                                SET REVIEWERS
                        </Button>
                        </span>
                    }
                    <div className={classes.grower}></div>
                    {
                        !checkClosed(submission) &&
                        <span>
                            {
                                submission.status === "SUBMITTED_FOR_REVIEW" && <Button className={classes.button} color="primary" variant="contained" onClick={() => setStatus(submission.id, "IN_REVIEW")}>PUT IN REVIEW</Button>
                            }
                            <Button className={`${classes.button} ${classes.acceptButton}`} color="primary" variant="contained" onClick={() => setStatus(submission.id, "ACCEPTED")}>ACCEPT</Button>
                            <Button className={`${classes.button} ${classes.warnButton}`} variant="contained" onClick={() => setStatus(submission.id, "NEEDS_REWORK")}>NEEDS REWORK</Button>
                            <Button className={classes.button} color="secondary" variant="contained" onClick={() => setStatus(submission.id, "REJECTED")}>REJECT</Button>
                        </span>
                    }
                </div>
            </Paper>
            <PaperDialog open={open} onClose={handleCloseDialog} links={[...papers, ...letters, ...reviews]} />
        </div>

    )
}

export default SumbissionItemEditor;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttons: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    acceptButton: {
        color: 'white',
        backgroundColor: '#4CAF50',
        '&:hover': {
            backgroundColor: '#43A047'
        }
    },
    warnButton: {
        color: 'white',
        backgroundColor: '#FFC107',
        '&:hover': {
            backgroundColor: '#FFB300'
        }
    },
    wideButton: {
        marginRight: theme.spacing(1),
        width: 150,
    },
    grower: {
        flexGrow: 1,
    }
}));