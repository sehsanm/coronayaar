import React, { useState } from 'react';
import { Paper,  Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom' ; 
import Auth from '../../services/Auth'; 

const styles = makeStyles( theme => ({
    div: {
        margin: theme.spacing(2),
        maxWidth: 600,  
        display: "inline-block",
        
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",

    }
}));
 
function Login(props) {
        const  classes  = styles();
        const [username , setUsername] = useState('p');
        const [password , setPassword] = useState('p');
        const history = useHistory();
        function login() {
            Auth.login(username, password).then(()=>{
                history.push('/profile')
            }).catch(e => {

            })
        }


        return (
            <Paper className={classes.paper}>
                <div className={classes.div}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    This is a success message!
                    </Alert>
                </Snackbar>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="نام كاربري"
                                 type="email" fullWidth autoFocus required
                                 onChange={(e) => setUsername(e.target.value)} value={username}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="رمز عبور" type="password" fullWidth required
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="مرا به خاطر بسپار" />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">رمز عبور را فراموش کرده اید؟</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{ textTransform: "none" }}
                            onClick={login}
                            >ورود</Button>
                    </Grid>
                </div>
            </Paper>
        );
    }


export default Login;