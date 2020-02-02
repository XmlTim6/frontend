import React from 'react';
import { AppBar, Toolbar, Link, makeStyles, Typography } from '@material-ui/core';
import { UserService } from '../../services/UserService';
import { Link as RouterLink } from 'react-router-dom';
import { UserRoles } from '../../enums/UserRoles';
import history from '../../helpers/history';

const Header = () => {

    const classes = useStyles();

    const currentUser = UserService.getCurrentUser();

    const handleClickRegister = e => {
        e.preventDefault();
        history.push('/register');
    }

    const handleClickLogin = e => {
        e.preventDefault();
        history.push('/login')
    }

    const handleClickLogout = e => {
        e.preventDefault();
        UserService.logout();
        history.push('/')
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography>
                    <Link className={classes.link} component={RouterLink} to={'/'}>Home</Link>
                    {currentUser && (
                        currentUser.role === UserRoles.AUTHOR ?
                            <span>
                                <Link className={classes.link} component={RouterLink} to={'/author/mysubs'}>My submissions</Link>
                                <Link className={classes.link} component={RouterLink} to={'/author/add'}>New submission</Link>
                                <Link className={classes.link} component={RouterLink} to={'/author/reviews'}>Assigned reviews</Link>
                            </span>
                            :
                            <span>

                            </span>
                    )}
                </Typography>
                <div className={classes.grower} />
                <Typography>
                    {currentUser ?
                        <span>
                            <Link className={classes.link} component={RouterLink} to={'/profile'}>My profile</Link>
                            <Link className={classes.link} onClick={handleClickLogout}>Sign out</Link>
                        </span>
                        :
                        <span>
                            <Link className={classes.link} onClick={handleClickRegister}>Register</Link>
                            <Link className={classes.link} onClick={handleClickLogin}>Sign in</Link>
                        </span>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.common.white,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer',
        },
    },
    grower: {
        flexGrow: 1
    }
}));