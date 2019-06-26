import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';



const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:movieId" component={Movie} exact />
        <Route component={NotFound} />
      </Switch>
      <Route path="/SignIn" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
    </React.Fragment>
  </BrowserRouter>
)

export default App;