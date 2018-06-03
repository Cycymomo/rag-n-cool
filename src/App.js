import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css';

const browserHistory = createBrowserHistory();

const App = () => (
  <Router history={browserHistory}>
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Hello world</h1>
        <Link to="/" href="/">
          Home
        </Link>
        <Link to="/about" href="/about">
          About
        </Link>
        <Link to="/signup" href="/signup">
          Sign Up
        </Link>
        <Link to="/signin" href="/signin">
          Sign in
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
