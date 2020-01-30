import React, { useState, useEffect } from 'react';
import { Container, Avatar, Typography, makeStyles, TextField, Button, Paper } from '@material-ui/core';
import Header from './Header';
import { UserService } from '../../services/UserService';


const Profile = () => {
    const [state, setState] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')

    const handleChange = name => e => {
        const value = e.target.value;
        setErrorText('');
        setSuccessText('');
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.update(state)
            .then(
                () => {
                    setSuccessText('Succesfully updated.');
                },
                error => {
                    setErrorText(error.response !== undefined ? error.response.data.violations[0].message : error.message)
                }
            )
    }

    useEffect(() => {
        UserService.getUserProfile()
            .then(response => {
                setState({...response.data, password: ''})
            });
    }, [])

    const classes = useStyles();

    return (
        <Container>
            <Header />
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <Typography component="h1" variant="h5">
                        {`${state.name} ${state.surname}`}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={state.name}
                            onChange={handleChange('name')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Surname"
                            name="surname"
                            autoComplete="surname"
                            autoFocus
                            value={state.surname}
                            onChange={handleChange('surname')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            value={state.email}
                            onChange={handleChange('email')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={state.password}
                            onChange={handleChange('password')}
                        />
                        <Typography component="p" className={classes.error}>
                            {errorText}
                        </Typography>
                        <Typography component="p" className={classes.success}>
                            {successText}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Update
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Container>
    )
}

export default Profile;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    success: {
        textAlign: 'center',
        color: 'blue'
    },
}));
