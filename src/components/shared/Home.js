import React from 'react';
import Header from './Header';
import { UserService } from '../../services/UserService';
import { UserRoles } from '../../enums/UserRoles';
import { Container, Grid } from '@material-ui/core';
import history from '../../helpers/history';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';

const Home = () => {

    const currentUser = UserService.getCurrentUser();

    if (currentUser) {
        if (currentUser.role === UserRoles.EDITOR) {
            history.replace('/editor');
        }
    }

    const basicSearch = term => {
        console.log(term)
    }

    const advancedSearch = (author, id, title, keywords) => {
        console.log(author, id, title, keywords)
    }

    return (
        <Container>
            <Header />
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <BasicSearch handleSearch={basicSearch} />
                </Grid>
                <Grid item xs={8}>
                    <AdvancedSearch handleSearch={advancedSearch} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;