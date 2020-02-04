import React, { useState } from 'react';
import Header from './Header';
import { UserService } from '../../services/UserService';
import { UserRoles } from '../../enums/UserRoles';
import { Container, Grid } from '@material-ui/core';
import history from '../../helpers/history';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import SearchItem from './SearchItem';
import { PaperService } from '../../services/PaperService';

const Home = () => {

    const currentUser = UserService.getCurrentUser();

    if (currentUser) {
        if (currentUser.role === UserRoles.EDITOR) {
            history.replace('/editor');
        }
    }

    const basicSearch = term => {
        PaperService.basicSearch(term)
            .then(response => console.log(response.data))
    }

    const advancedSearch = (author, id, title, keywords) => {
        PaperService.advancedSearch(author, id, title, keywords, 'json')
            .then(response => console.log(response.data))
    }

    const [papers, setPapers] = useState([])

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
            {
                papers.map(paper => <SearchItem paper={paper} key={paper.id} />)
            }
        </Container>
    );
}

export default Home;