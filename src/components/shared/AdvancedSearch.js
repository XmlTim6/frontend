import React, { useState } from 'react';
import { Paper, Button, TextField, makeStyles } from '@material-ui/core';


const AdvancedSearch = (props) => {

    const classes = useStyles();

    const { handleSearch } = props

    const [author, setAuthor] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [keywords, setKeywords] = useState('');


    const handleChange = name => e => {
        if (name === 'author') {
            setAuthor(e.target.value)
        } else if (name === 'id') {
            setId(e.target.value)
        } else if (name === 'title') {
            setTitle(e.target.value)
        } else if (name === 'keywords') {
            setKeywords(e.target.value)
        }
    }

    return (
        <Paper className={classes.paper}>
            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                id="author"
                label="Author"
                name="author"
                value={author}
                onChange={handleChange('author')}
            />
            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                id="id"
                label="Id"
                name="id"
                value={id}
                onChange={handleChange('id')}
            />
            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={handleChange('title')}
            />
            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                id="keywords"
                label="Keywords"
                name="keywords"
                value={keywords}
                onChange={handleChange('keywords')}
            />
            <div className={classes.rightAlign}>
                <Button color="primary" variant="contained" onClick={() => handleSearch(author, id, title, keywords)}>Advanced Search</Button>
            </div>
        </Paper>
    )
}

export default AdvancedSearch;


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
    },
    rightAlign: {
        textAlign: 'right'
    },
    input: {
        width: 190,
        marginLeft: theme.spacing(1)
    }
}));