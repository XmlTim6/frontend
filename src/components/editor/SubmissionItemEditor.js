import React from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';

const SumbissionItemEditor = (props) => {
    const { submission, users, openEditorDialog, openAuthorDialog } = props

    const classes = useStyles();

    const editor = users.editors.filter(e => e.id === submission.editorId)[0];
    const author = users.authors.filter(a => a.id === submission.userId)[0];

    return (
        <Paper className={classes.paper}>
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
            <div className={classes.buttons}>
                <Button color="primary" variant="contained">XHTML</Button>
                <Button className={classes.button} color="primary" variant="contained">XML</Button>
                <Button className={classes.button} color="primary" variant="contained">PDF</Button>
                <div className={classes.grower}></div>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => openEditorDialog(submission.id)}
                >
                    SET EDITOR
                        </Button>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => openAuthorDialog(submission.id, submission.userId)}
                >
                    SET REVIEWERS
                </Button>
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
    buttons: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        marginLeft: theme.spacing(1)
    },
    grower: {
        flexGrow: 1,
    }
}));