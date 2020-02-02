import React, { useState } from 'react';
import { UserService } from '../../services/UserService';
import { Container, Avatar, Typography, makeStyles, TextField, Button, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { setToken } from '../../services/TokenService';
import Header from './Header';
import history from '../../helpers/history';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const [errorText, setErrorText] = useState('')

    const handleChange = name => e => {
        const value = e.target.value;
        setErrorText('');
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.login(state)
            .then(
                response => {
                    setToken(response.data);
                    redirect();
                },
                error => {
                    setErrorText(error.response !== undefined ? error.response.data : error.message)
                }
            )
    }

    const redirect = () => {
        history.push('/');
    }

    const classes = useStyles();

    return (
        <Container>
            <Header />
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>                        
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
                            onChange={handleChange('email')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange('password')}
                        />
                        <Typography component="p" className={classes.error}>
                            {errorText}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Container>
    )
}

export default Login;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
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
}));