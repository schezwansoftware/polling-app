import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar.component';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Home from './components/home.component';
import About from './components/about.component';
import Contact from './components/contact.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/contact" exact component={Contact}></Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
