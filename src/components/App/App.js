import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import Profile from '../elements/Profile/Profile';
import {PrivateRoute,LoginRoute} from '../Auth/auth';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <BrowserRouter>
          <React.Fragment>

            <Header  />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/:movieId" component={Movie} exact />
              <Route component={NotFound} />

            </Switch>
            <PrivateRoute path="/profile" component={Profile} exact />
            <LoginRoute path="/SignIn" component={SignIn} />
            <LoginRoute path="/SignUp" component={SignUp} />
          </React.Fragment>
        </BrowserRouter>
    )
  }
}



export default App;