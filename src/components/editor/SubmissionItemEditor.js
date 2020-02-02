import React from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { checkClosed } from '../../helpers/checkClosed';

const SumbissionItemEditor = (props) => {
    const { submission, users, openEditorDialog, openAuthorDialog, setStatus } = props

    const classes = useStyles();

    const editor = users.editors.filter(e => e.id === submission.editorId)[0];
    const author = users.authors.filter(a => a.id === submission.userId)[0];

    return (
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
                {
                    !checkClosed(submission) &&
                    <span>
                        <Button
                            className={classes.wideButton}
                            color="primary"
                            variant="contained"
                        >
                            SEE PAPERS
                        </Button>
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