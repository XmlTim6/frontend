import React from 'react';
import Header from './Header';
import { UserService } from '../../services/UserService';
import { UserRoles } from '../../enums/UserRoles';
import { Container } from '@material-ui/core';
import history from '../../helpers/history';

const Home = () => {
    
    const currentUser = UserService.getCurrentUser();
    
    if(currentUser){
        if(currentUser.role === UserRoles.EDITOR){
            history.replace('/editor');
        }
    }

    return (
        <Container>
            <Header />
            HOME
        </Container>
    );
}

export default Home;