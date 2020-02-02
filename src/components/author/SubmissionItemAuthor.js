import React, { useEffect, useState } from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { checkClosed } from '../../helpers/checkClosed';
import { SubmissionService } from '../../services/SubmissionService';
import { CoverLetterService } from '../../services/CoverLetterService';
import history from '../../helpers/history';
import PaperDialog from '../shared/PaperDialog';

const SumbissionItemAuthor = (props) => {
    const { submission, handleTakedown } = props
    const classes = useStyles();

    const [papers, setPapers] = useState([])
    const [letters, setLetters] = useState([])

    useEffect(() => {
        SubmissionService.getPapersForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setPapers(links)
            })
        CoverLetterService.getCoversForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setLetters(links)
            })
    }, [submission])

    const handleCoverLetterClick = () => {
        history.push(`/author/coverLetter/${submission.id}`);
    }

    const handleRevisionClick = () => {
        history.push(`/author/revision/${submission.id}`);
    }

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
                <div>
                    <Typography variant="h6">
                        {`Title: ${submission.title}`}
                    </Typography>
                    <Typography>
                        {`Status: ${submission.status}`}
                        <br />
                        {`Revision: ${submission.currentRevision}`}
                    </Typography>
                </div>

                <div className={classes.buttons}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleOpenDialog}
                    >
                        SEE PAPERS
                </Button>
                    <div className={classes.grower}></div>
                    {
                        submission.status === "NEEDS_REWORK" &&
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            onClick={handleRevisionClick}
                        >
                            ADD REVISION
                    </Button>
                    }
                    {
                        !checkClosed(submission) && submission.status !== "IN_REVIEW" &&
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            onClick={handleCoverLetterClick}
                        >
                            ADD COVER LETTER
                    </Button>
                    }
                    {
                        !checkClosed(submission) &&

                        <Button
                            className={classes.button}
                            color="secondary"
                            variant="contained"
                            onClick={() => handleTakedown(submission.id)}
                        >
                            TAKEDOWN
                        </Button>
                    }
                </div>
            </Paper>
            <PaperDialog open={open} onClose={handleCloseDialog} links={[...papers, ...letters]}/>
        </div>
    )
}

export default SumbissionItemAuthor;

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