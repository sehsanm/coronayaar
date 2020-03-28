import React from 'react';
import TypoGraphy from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import authProvider from '../services/AuthService' ; 
import Button  from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu' ;
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1) 
    }, 
    menuIcon: {
        margin: theme.spacing(1) 
    }}));

function NavBar(props) {
    
    const classes = useStyles() ; 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory() ; 
    const logout = () => {
      authProvider.logout() ; 
      handleClose() ; 
      history.push('/login') ; 
    }
    const gotoDashbord = () => {
      handleClose() ; 
      history.push('/dashboard') ; 
    }
    const gotoProfile = () => {
      handleClose() ; 
      history.push('/profile') ; 
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
    };
    
    
    function getMenuItems() {
        if (!authProvider.getAuth().isAuthenticated()) {
            return [
                <Button variant="outlined" color="secondary"  className={classes.button}
                  onClick={()=>history.push('/login')}
                  >ورود</Button>,
                <Button variant="outlined" color="secondary" 
                onClick={()=>history.push('/register')}>ثبت نام</Button>
             ] ; 
        } else {
            return [
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> , 
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={gotoProfile}>پروفایل مرکز</MenuItem>
                <MenuItem onClick={gotoDashbord}>کارتابل</MenuItem>
                <MenuItem onClick={logout}>خروج</MenuItem>
              </Menu>                
            ]    
        } 
    }

    return ( 
        <AppBar color="primary" position="static">
            <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu" className={classes.menuIcon}>
                <MenuIcon />
            </IconButton>
            <TypoGraphy variant="title"color="inherit" style={{flex:1 , textAlign:"right"}}>
                  سامانه کرونا یار 
            </TypoGraphy>
            {getMenuItems()}
            </Toolbar>
        </AppBar>
    )
}




export default NavBar;