import React from 'react';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { UserService } from '../../services/UserService';
import { UserRoles } from '../../enums/UserRoles';
import { Container } from '@material-ui/core';

const Home = (props) => {
    
    const currentUser = UserService.getCurrentUser();
    
    if(currentUser){
        if(currentUser.role === UserRoles.EDITOR){
            props.history.replace('/editor');
        }else if(currentUser.role === UserRoles.AUTHOR){
            props.history.replace('/author');
        }
    }

    return (
        <Container>
            <Header />
            HOME
        </Container>
    );
}

export default withRouter(Home);