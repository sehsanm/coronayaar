import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {  jssPreset } from '@material-ui/core/styles';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const themeOptions = {
  typography: {
    useNextVariants: true,
    fontFamily: 'IRANSans',
    fontSize: 10  
  },
};


export default class ThemeProvider extends Component {

  componentDidMount() {
  }


  render() {
    const theme = createMuiTheme({ ...themeOptions });
    return (
        <MuiThemeProvider theme={theme} jss={jss}>
            {this.props.children}
        </MuiThemeProvider>
    );
  }
}
