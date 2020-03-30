import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import ErrorDisplay from "../../components/ErrorDisplay";
import Joi from "joi-browser";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .required(),
  name: Joi.string()
    .min(5)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(5)
    .required()
})

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);

  function registerUser() {
    let {err, value} = Joi.validate({username , password , name}, schema) ; 
    console.log('Joi Err: ' ,err , value )
    if (err){
      setErrors(err.details.map(d => d.message)) ; 
    } else {
      Auth.register(username, password, name)
      .then(() => history.push("/profile"))
      .catch(err => setErrors(err));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ثبت نام در سامانه
        </Typography>
        <ErrorDisplay errors={errors}/> 
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="نام"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="نام کاربری"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="رمز عبور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={registerUser}
        >
          ثبت نام
        </Button>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
