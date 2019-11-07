import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import {Book , Home} from '@material-ui/icons'

function NavBar(props) {

    return ( 
        <List component="nav">
            <ListItem component="div">
                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                    <Home/>   آزمون 
               </TypoGraphy>
                </ListItemText>


                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                     <Book />   درباره ما 
               </TypoGraphy>
                </ListItemText>
            </ListItem >

        </List>
    )
}


export default NavBar;