import React from 'react';
import { Paper, makeStyles, Button, Typography } from '@material-ui/core';

const SumbissionItemReview = (props) => {
    const { submission } = props
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">
                {`Title: ${submission.title}`}
            </Typography>
            <Typography>
                {`Status: ${submission.status}`}
                <br />
                {`Revision: ${submission.currentRevision}`}
            </Typography>
            <div className={classes.buttons}>
                <Button color="primary" variant="contained">XHTML</Button>
                <Button className={classes.button} color="primary" variant="contained">XML</Button>
                <Button className={classes.button} color="primary" variant="contained">PDF</Button>
                <div className={classes.grower}></div>
                <Button className={classes.button} color="primary" variant="contained">REVIEW</Button>
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
    }
}));