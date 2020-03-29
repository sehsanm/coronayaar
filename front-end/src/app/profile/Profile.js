import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Refdata from "../../services/Refdata";
import UserService from '../../services/UserService' ; 
import { useHistory } from "react-router-dom";
import { FormControl, FormHelperText, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  elements: {
    margin: theme.spacing(2)
  }
}));

export default function ProfileOrg(props) {
  const classes = useStyles();
  const history = useHistory();
  let [orgName, setOrgName] = useState("");
  let [orgCity, setOrgCity] = useState("");
  let [orgProvince, setOrgProvince] = useState("");
  let [orgDescription, setOrgDescription] = useState("");
  let [provinceList, setProvinceList] = useState([]);
  let [cityList, setCityList] = useState([]);
  let [orgType, setOrgType] = useState('' ); 
  useEffect(() => {
    Refdata.getProvinces().then(lst => setProvinceList(lst));
    UserService.getProfile().then((res)=> {
      let p = res.data.profile ; 
      setOrgName(p.orgName) ; 
      setOrgDescription(p.orgDescription) ; 
      setOrgCity(p.orgCity) ; 
      setOrgProvince(p.orgProvince);  
      setOrgType(p.orgType) ;
      if(p.orgProvince !== null  && p.orgProvince !== '') {
        console.log('City Selected!')
        Refdata.getCities(p.orgProvince).then(lst => setCityList(lst));  
      }
      return p; 
    })
  }, []);

  function getProvinceMenuItems() {
    return provinceList.map(p => (
      <MenuItem value={p} key={p}>
        {p}
      </MenuItem>
    ));
  }

  function getCityMenuItems() {
    return cityList.map(p => (
      <MenuItem value={p} key={p}>
        {p}
      </MenuItem>
    ));
  }

  function provinceChanged(e) {
    setOrgProvince(e.target.value);
    Refdata.getCities(e.target.value).then(lst => setCityList(lst));
  }

  function saveProfile() {
    UserService.saveProfile({
      orgName : orgName , 
      orgCity : orgCity , 
      orgDescription : orgDescription, 
      orgProvince : orgProvince , 
      orgCity : orgCity , 
      orgType : orgType 
    }).then(()=> history.push('/dashboard'))
    .catch((err)=>{
      console.log('Some Error' , err);
    }) ; 
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography  variant="h6" className={classes.elements}>
          اطلاعات مرکز درمانی و یا خیریه مربوطه
        </Typography>
        <Typography  variant="h7" className={classes.elements}>
          اطلاعات زیر برای تایید کاربر شما توسط ادمین نیاز می باشد. 
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel >سازمان</InputLabel>
              <Select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
              >
                <MenuItem key="1"  value="hospital">مرکز درمانی</MenuItem>
                <MenuItem key="2"  value="charity">خیریه</MenuItem>
                <MenuItem key="3"  value="other">سایر</MenuItem>                
              </Select>
              <FormHelperText>سازمانی که شما در این سامانه نمایندگی می کنید</FormHelperText>
            </FormControl>
          </Grid>          
          <Grid item xs={12}>
            <TextField
              className={classes.elements}  
              required
              fullWidth
              label="نام مرکز"
              autoFocus
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="معرفی کوتاه"
              autoFocus
              value={orgDescription}
              multiline
              rows="4"
              style={{ textAlign: "right" }}
              onChange={e => setOrgDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel >استان</InputLabel>
              <Select
                id="demo-simple-select-helper"
                value={orgProvince}
                onChange={provinceChanged}
              >
                {getProvinceMenuItems()}
              </Select>
              <FormHelperText>استان مورد نظر را انتخاب کنید</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel >شهر</InputLabel>
              <Select
                id="demo-simple-select-helper"
                value={orgCity}
                onChange={(e) => setOrgCity(e.target.value)}
              >
                {getCityMenuItems()}
              </Select>
              <FormHelperText>شهر مورد نظر را انتخاب کنید</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={saveProfile}
        >
          ذخیره
        </Button>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
