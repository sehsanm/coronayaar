import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom' ; 
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RequestForm from "./request/RequestForm";
import UserService from '../services/UserService' ; 
import UserList from "./admin/UserList";
import ProfileOrg from './profile/Profile';
import RequestList from './request/RequestList' ; 
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      
    } , 
    zIndex: theme.zIndex.appBar - 1,
    marginLeft: theme.spacing(1), 
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));


function MainDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  let history = useHistory();
  let [user, setUser] = useState({}) ;


  useEffect(()=>{
      UserService.getProfile().then(res => setUser(res.data)) ; 
  } , []); 

  let drawerBuilder = function(items){
    return (<div>
      <div className={classes.toolbar} />
      <Typography variant="h6">{"سامانه کرونا یار"}</Typography>
      <Divider />
      <List>
        {items.map(
          (item, index) => (
            <ListItem button key={item.label} onClick={item.handler} >
              <ListItemIcon >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>)
  }
  function drawer() { 
    console.log('-->', user , user.roles && user.roles.indexOf('admin') >= 0); 
    if (user.roles && user.roles.indexOf('admin') >= 0 ) {
        return drawerBuilder([
            {label: " لیست همه درخواست ها", handler: () => setPage('/allrequests') }, 
            {label: "لیست کاربران", handler:() => setPage('/users')}, 
            {label: "در خواست جدید", handler:() => setPage('/newrequest')}]);    
    }else if (user.profile && user.profile.orgType == 'hospital') {  
        return drawerBuilder([
        {label: "در خواست های من", handler: () => setPage('/myrequests') }, 
        {label: "در خواست جدید", handler:() => setPage('/newrequest')}]);
    } else {
        return drawerBuilder([
            {label: " لیست همه درخواست ها", handler: () => setPage('ِ/allrequests') }, 
            {label: "پروفایل", handler:() => setPage('/profile')}]);    
                
    }
  }  

  function setPage(page) {
      //Set Open False
      history.push(page); 
      if (props.onClick)
        props.onClick(page);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer()}
        </Drawer>
      </nav>

    </div>
  );
}

export default MainDrawer;
