import React, { Component } from 'react';

import ThemeProvider from './components/ThemeProvider';
import  './App.css';
import NavBar from './app/Navbar';
import Browse from './app/home/Browse';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
import Login from './app/login/Login';
import Register from './app/login/Register';
import ProfileOrg from './app/profile/Profile';
import UserList from './app/admin/UserList' ; 
import TopAlert from './app/home/TopAlert';

class App extends Component {
  render() {

    return (
      <div id='app-div'>
       <ThemeProvider>
          <Router>
            <NavBar/>
            <Switch>
            <Route path="/login" ><Login /></Route>
            <Route path="/register" ><Register /></Route>
            <Route path="/profile" ><ProfileOrg /></Route>
            <Route path="/users" ><UserList /></Route>
            <Route path="/" ><Route/><Browse /></Route>
            </Switch>

          </Router>
       </ThemeProvider>

      </div>
    );
  }
}
export default App;