import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { SubmissionService } from '../../services/SubmissionService';
import history from '../../helpers/history';
import PaperDialog from '../shared/PaperDialog';

const SumbissionItemReview = (props) => {
    const { submission, reject } = props
    const classes = useStyles();

    const [papers, setPapers] = useState([])
    const [reviews, setReviews] = useState([])

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
    }, [submission])

    const handleNotesClick = () => {
        history.push(`/author/reviews/${submission.id}/addPaper`)
    }

    const handleReviewClick = () => {
        history.push(`/author/reviews/${submission.id}/addReview`)
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
                        submission.status !== 'NEEDS_REWORK' &&
                        <span>
                            <Button className={classes.button} color="primary" variant="contained" onClick={handleNotesClick}>ADD NOTES</Button>
                            <Button className={classes.button} color="primary" variant="contained" onClick={handleReviewClick}>ADD REVIEW FORM</Button>
                        </span>
                    }
                    <Button className={classes.button} color="secondary" variant="contained" onClick={() => reject(submission.id)}>REJECT</Button>
                </div>
            </Paper>
            <PaperDialog open={open} onClose={handleCloseDialog} links={[...papers, ...reviews]} />
        </div>
    )
}

export default SumbissionItemReview;

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
    },
    wideButton: {
        marginBottom: theme.spacing(1),
        width: 150,
    },
}));