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
            .then(response => {
                const array = []
                response.data.forEach(element => {
                    array.push(JSON.parse(element.replace(/'/g, '"').replace(/, ]/g, ']')))
                });
                setPapers(array)
            })
    }

    const advancedSearch = (author, id, title, keywords) => {
        PaperService.advancedSearch(author, id, title, keywords, 'json')
            .then(response => setPapers(formatData(response.data)))
    }

    const formatData = (data) => {
        const array = data.results.bindings
        const formatted = []
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const index = formatted.findIndex(el => el.link === element.paper.value.replace('http://localhost:3000/', ''))
            if (index === -1) {
                formatted.push({
                    link: element.paper.value.replace('http://localhost:3000/', ''),
                    title: element.title.value,
                    received: element.received.value,
                    accepted: element.accepted.value,
                    authors: [element.author.value],
                    keywords: [element.keyword.value]
                })
            } else {
                if (!formatted[index].authors.includes(element.author.value)) {
                    formatted[index].authors.push(element.author.value)
                }
                if (!formatted[index].keywords.includes(element.keyword.value)) {
                    formatted[index].keywords.push(element.keyword.value)
                }
            }
        }
        return formatted;
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
                papers.map(paper => <SearchItem paper={paper} key={paper.link} />)
            }
        </Container>
    );
}

export default Home;