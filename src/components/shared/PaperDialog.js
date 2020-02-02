import React from 'react';
import { Dialog, makeStyles, DialogTitle, DialogContent } from '@material-ui/core';
import { Link } from 'react-router-dom';


const PaperDialog = (props) => {
    const { open, onClose, links } = props

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogTitle style={{marginBottom: 0, paddingBottom: 0}}>Papers</DialogTitle>
            <DialogContent className={classes.container}>
                {
                    links.map((link) => <div className={classes.link} key={`div_${link}`}><Link key={`a_${link}`} to={link}>{link}</Link></div>)
                }
            </DialogContent>
        </Dialog>
    )
}

export default PaperDialog;

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1),
        width: 640
    },
    link: {
        marginBottom: theme.spacing(1)
    }
}));