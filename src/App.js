import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/shared/PrivateRoute';
import Login from './components/shared/Login';
import { UserRoles } from './enums/UserRoles';
import Home from './components/shared/Home';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Editor from './components/editor/Editor';
import Author from './components/author/Author';
import Register from './components/shared/Register';
import Profile from './components/shared/Profile';
import AddSubmission from './components/author/AddSubmission';
import AssignedReviews from './components/author/AssignedReviews';
import AddCoverLetter from './components/author/AddCoverLetter';
import Details from './components/shared/Details';
import AddPaperReview from './components/author/AddPaperReview';
import AddReviewForm from './components/author/AddReviewForm';

function App() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <main>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/details/:submissionId/:revision/:doc' component={Details} />
          <PrivateRoute exact path='/profile' component={Profile} roles={[UserRoles.EDITOR, UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/editor' component={Editor} roles={[UserRoles.EDITOR]} />
          <PrivateRoute exact path='/author/mysubs' component={Author} roles={[UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/author/add' component={AddSubmission} roles={[UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/author/coverLetter/:submissionId' component={AddCoverLetter} roles={[UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/author/reviews' component={AssignedReviews} roles={[UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/author/reviews/addPaper' component={AddPaperReview} roles={[UserRoles.AUTHOR]} />
          <PrivateRoute exact path='/author/reviews/addReview' component={AddReviewForm} roles={[UserRoles.AUTHOR]} />
        </Switch>
      </main>
    </div>
  );
}

export default App;

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
}));