import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar.component';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import {getCurrentUser} from './services/posts.service';
import {ACCESS_TOKEN} from './constants/constants';
import Home from './components/home.component';
import About from './components/about.component';
import Contact from './components/contact.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import {Modal} from 'antd';
import {Redirect}from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      currentUser: null,
      isAuthenticated: false,
      redirect: false
    }

    this.onLogout=this.onLogout.bind(this);
  }

  componentWillMount(){
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    getCurrentUser().then(
      response =>{
        this.setState({
          isAuthenticated: true,
          currentUser : response
        });
      }
    )
  }

  onLogout(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
      redirect: true
    });
    this.redirect('/');
    Modal.success({
      title:'Successful Log-out',
      content: 'You have been succesfully logged out'
    });

  }
  redirect(path){
    if(this.state.redirect){
      return <Redirect to={path} />
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <NavBar isAuthenticated={this.state.isAuthenticated} principal={this.state.currentUser} onLogout={this.onLogout}/>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/contact" exact component={Contact}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/profile" exact component={Profile}></Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
