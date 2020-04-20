import React, { Component } from 'react';

import ThemeProvider from './components/ThemeProvider';
import  './App.css';
import NavBar from './app/Navbar';
import Browse from './app/home/Browse';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link, HashRouter } from 'react-router-dom';
import Login from './app/login/Login';
import Register from './app/login/Register';
import ProfileOrg from './app/profile/Profile';
import UserList from './app/admin/UserList' ; 
import Dashboard from './app/home/Dashboard';
import RequestForm from './app/request/RequestForm';
import RequestList from './app/request/RequestList';
import PledgeList from './app/pledge/PledgeList';
function App(props) {
    return (
      <div id='app-div'>
       <ThemeProvider>
          <HashRouter>
            <NavBar/>
            <Switch>
            <Route path="/login" ><Login /></Route>
            <Route path="/register" ><Register /></Route>
            <Route path="/profile" ><ProfileOrg /></Route>
            <Route path="/users" ><UserList /></Route>
            <Route path="/request/:id/pledges" render={(props) => <PledgeList requestId={props.match.params.id} />} />
            <Route path="/request"  render={(props) => <RequestForm  onClose={()=>props.history.push('/my/requests')}/>}/>
            <Route path="/my/requests" ><RequestList  myRequests={true}/></Route>
            <Route path="/my/pledges" ><PledgeList  myPledges /></Route>
            <Route path="/allrequests" ><RequestList /></Route>
            <Route path="/" ><Route/><RequestList /></Route>
            </Switch>

          </HashRouter>
       </ThemeProvider>

      </div>
    );
} 
export default App;