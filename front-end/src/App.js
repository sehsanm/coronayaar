import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import ExamManager from    './ExamManager'
import ThemeProvider from './ThemeProvider'
import  './App.css'

class App extends Component {
  render() {

    return (
      <div id='app-div'>
       <ThemeProvider>
        <AppBar color="primary" position="static">
            <Toolbar>
              <TypoGraphy variant="title"
                color="inherit"
              >
                  آزمایشگاه پردازش زبان طبیعی 
            </TypoGraphy>
            </Toolbar>
          </AppBar>
          <ExamManager />
       </ThemeProvider>

      </div>
    );
  }
}
export default App;