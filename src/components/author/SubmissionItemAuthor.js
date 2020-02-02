import React, { useEffect, useState } from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';
import { checkClosed } from '../../helpers/checkClosed';
import { SubmissionService } from '../../services/SubmissionService';
import { Link } from 'react-router-dom';
import { CoverLetterService } from '../../services/CoverLetterService';
import history from '../../helpers/history';

const SumbissionItemAuthor = (props) => {
    const { submission, handleTakedown } = props
    const classes = useStyles();

    const [papers, setPapers] = useState([])
    const [letters, setLetters] = useState([])

    useEffect(() => {
        SubmissionService.getPapersForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000',''))
                setPapers(links)
            })
        CoverLetterService.getCoversForSub(submission.id)
            .then(response => {
                const links = response.data.map(link => link.replace('http://localhost:3000',''))
                setLetters(links)
            })
    }, [submission])

    const handleCoverLetterClick = () => {
        history.push(`/author/coverLetter/${submission.id}`);
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
                    <br />
                    {
                        letters.map((letter) => <span key={`span_${letter}`}><Link key={`a_${letter}`} to={letter}>{letter}</Link><br /></span>)
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
                    submission.status === "NEEDS_REWORK" &&
                    <Button
                        className={classes.button}
                        color="primary"
                        variant="contained"
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
    flexContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        marginLeft: theme.spacing(1)
    },
    grower: {
        flexGrow: 1,
    }
}));