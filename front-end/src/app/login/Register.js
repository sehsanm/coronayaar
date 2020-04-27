import React, { useState } from "react";
import {Button, TextField, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import StaticForm from '../../components/StaticForm';
import ObjectUtil from '../../components/ObjectUtil';
import FormSchema from './RegisterFormData';
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



export default function Register() {

  const classes = useStyles();
  const history = useHistory(); 
  let [value, setValue] = useState({});
  let [errors, setErrors] = useState([]);
  let [showVerification, setShowVerification] = useState(false);
  let [code, setCode] = useState('');

  function registerUser() {
    setErrors([]) ; 
    ObjectUtil.validateForm(FormSchema, value).then(() => Auth.register(value))
      .then(() => {
        setShowVerification(true);
      })
      .catch(e => {
        setErrors(e) ;
        console.log(e) ; 
      }); 

  }

  function changeValue(fieldName , val){
    let x = { ...value };
    let v = val
    //Change the  Username format to String
    if (fieldName === 'username')
      v = ObjectUtil.fixNumbers(val) ; 
    x[fieldName] = v;
    setValue(x);
  }

  function verifyCode() {
    Auth.login(value.username, value.password, code).then(()=>{
      history.push('/profile'); 
    }).catch(e => setErrors(e)) ; 
  }

  function getButtomPart() {
    if (!showVerification) {
      return [
        <StaticForm form={FormSchema} value={value} onChange={changeValue} title={"ثبت نام در سامانه کرونا یار"} errors={errors} />,
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={registerUser}
      >
        ثبت نام
        </Button>]
    }else {
      return [
        <Grid container className={classes.paper} >
          <Grid item>
              <TextField
            required
            fullWidth
            label={"کد اعتبار سنجی"}
            autoFocus
            value={code}
            onChange={e => setCode(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={verifyCode}
          >
            تکمیل ثبت نام
            </Button>
          </Grid>
        </Grid>
      ]
      
    }
  }

  return (
    <Container maxWidth="xs">
      {getButtomPart()}
    </Container>

  );
}
