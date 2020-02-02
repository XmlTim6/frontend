import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { SubmissionService } from '../../services/SubmissionService';
import history from '../../helpers/history';
import { Link } from 'react-router-dom';

const SumbissionItemReview = (props) => {
    const { submission } = props
    const classes = useStyles();

    const [papers, setPapers] = useState([])

    useEffect(() => {
        SubmissionService.getPapersForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000', ''))
                setPapers(links)
            })
    }, [submission])

    const handleNotesClick = () => {
        history.push(`/author/reviews/${submission.id}/addPaper`)
    }

    const handleReviewClick = () => {
        history.push(`/author/reviews/${submission.id}/addReview`)
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.flexContainer}>
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
                <div className={classes.grower}></div>
                <div>
                    {
                        papers.map((paper) => <span key={`span_${paper}`}><Link key={`a_${paper}`} to={paper}>{paper}</Link><br /></span>)
                    }
                </div>
            </div>
            <div className={classes.buttons}>
                <Button
                    color="primary"
                    variant="contained"
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
                <Button className={classes.button} color="secondary" variant="contained">REJECT</Button>
            </div>
        </Paper>
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
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    wideButton: {
        marginBottom: theme.spacing(1),
        width: 150,
    },
}));