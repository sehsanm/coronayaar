import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {  Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'block',
      flexWrap: 'wrap',
      margin : 100, 
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      textAlign: 'right'
    },

    button: { 
        marginTop: 100, 
        margiright:50 
    }
  }));

  export default function UserInput(props) {
    const classes = useStyles();
    const [studentNumber , setStudentNumber] = useState('') ; 
    const [studentName , setStudentName] = useState('') ; 
    const [email , setEmail] = useState('') ; 
    return ( 
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="نام و نام خانوادگی"
            margin="normal"
            required={true}
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="ایمیل"
            margin="normal"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>        <div>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="شماره دانشجویی"
            margin="normal"
            value={studentNumber}
            onChange={e => setStudentNumber(e.target.value)}
          />
        </div>        

        <div>
            <Button className={classes.button} variant="contained" color="primary" 
            disabled={email === '' || studentName === '' } onClick={()=>{props.onSubmit(studentName , studentNumber)}}
                 >شروع</Button>

        </div>
      </form>
    );
  }