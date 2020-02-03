import React, { useState } from 'react';
import { Paper, Button, TextField, makeStyles } from '@material-ui/core';


const BasicSearch = (props) => {

    const classes = useStyles();

    const { handleSearch } = props

    const [searchTerm, setSearchTerm] = useState('');

    const changeSearchTerm = e => {
        setSearchTerm(e.target.value)
    }

    return (
        <Paper className={classes.paper}>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="search"
                label="Search term"
                name="search"
                value={searchTerm}
                onChange={changeSearchTerm}
            />
            <div className={classes.rightAlign}>
                <Button color="primary" variant="contained" onClick={() => handleSearch(searchTerm)}>Basic Search</Button>
            </div>
        </Paper>
    )
}

export default BasicSearch;


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
    },
    rightAlign: {
        textAlign: 'right'
    }
}));