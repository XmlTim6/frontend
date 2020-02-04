import React, { useState } from 'react';
import { Container, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import XmlEdit from '../shared/XmlEdit';
import TextDialog from './TextDialog';

const Upload = (props) => {
    const [display, setDisplay] = useState('none');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const { xml, setXml, handleSubmit, title, docSpec } = props;

    const handleOpenEditor = () => {
        if (display === 'none') {
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }

    const openCopyDialog = (e) => {
        setOpen(true);
    }

    const closeCopyDialog = () => {
        setOpen(false);
    };

    const handleCopy = (text) => {
        setError('');
        closeCopyDialog();
        setXml(text);
    }

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography variant="h5">
                {title}
            </Typography>
            <Paper className={classes.paper}>
                {display === 'none' ?
                    <Button type="submit" color="primary" variant="contained" onClick={handleOpenEditor}>
                        Open Editor
                        </Button>
                    :
                    <span>
                        <Button type="submit" color="primary" variant="contained" onClick={handleOpenEditor}>
                            Close Editor
                            </Button>
                        <Button className={classes.button} type="submit" color="primary" variant="contained" onClick={openCopyDialog}>
                            Input XML
                            </Button>
                        <span style={{ color: 'red', marginLeft: '8px' }}>
                            {error}
                        </span>
                    </span>
                }
                <div style={{ display: display }}>
                    <XmlEdit xml={xml} setError={() => setError('Error copying xml')} docSpec={docSpec}/>
                </div>
                <div className={classes.submit}>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Upload</Button>
                </div>
            </Paper>
            <TextDialog open={open} onClose={closeCopyDialog} handleSubmit={handleCopy} />
        </Container >
    )
}

export default Upload;

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(1)
    },
    input: {
        display: 'inline-block'
    },
    button: {
        marginLeft: theme.spacing(1)
    },
}));