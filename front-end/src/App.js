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
import Home from './app/home/Home';
function App(props) {
    return (
      <div id='app-div'>
       <ThemeProvider>
          <HashRouter>
            <NavBar/>
            <Switch>
            <Route path="/login" ><Login /></Route>
            <Route path="/register" ><Register /></Route>
            <Route path="/profile"  render={(props) => <ProfileOrg  onClose={()=>props.history.push('/')}/>}/>
            <Route path="/users" ><UserList /></Route>
            <Route path="/request/:id/pledges" render={(props) => <PledgeList requestId={props.match.params.id} />} />
            <Route path="/request"  render={(props) => <RequestForm  onClose={()=>props.history.push('/my/requests')}/>}/>
            <Route path="/my/pledges" ><PledgeList  myPledges /></Route>
            <Route path="/requests/my" ><RequestList  myRequests={true} title="در خواست های من"/></Route>
            <Route path="/requests/all" ><RequestList /></Route>
            <Route path="/requests/approved"  render={(props) => <RequestList  filter={{status: 'approved'}} title=" لیست همه درخواست ها"/>} />
            <Route path="/requests/pending"  render={(props) => <RequestList filter={{status: 'pending'}}  title=" لیست درخواست های تایید نشده"/>} />
            <Route path="/requests/rejected"  render={(props) => <RequestList filter={{status: 'rejected'}} title="لیست درخواست های ردشده"/>} />
            <Route path="/requests/completed"  render={(props) => <RequestList filter={{quantityLeft: {$lte: 0}}} title="لیست درخواست های تامین شده"/>} />

            <Route path="/" ><Route/><Home /></Route>
            </Switch>

          </HashRouter>
       </ThemeProvider>

      </div>
    );
} 
export default App;