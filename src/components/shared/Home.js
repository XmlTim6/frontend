import React, { useState } from 'react';
import Header from './Header';
import { UserService } from '../../services/UserService';
import { UserRoles } from '../../enums/UserRoles';
import { Container, Grid } from '@material-ui/core';
import history from '../../helpers/history';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import SearchItem from './SearchItem';

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

    const [papers, setPapers] = useState([{
        id: '1234567890',
        title: 'TITLE 1',
        authors: ['AUTHOR1 AAA', 'AUTHOR2 BBB'],
        received: '22-01-2020',
        revised: '23-01-2020',
        accepted: '24-01-2020',
        keywords: ['math', 'science', 'reee'],
        link: '/details/123465678/1/paper.xml'
    }])

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