import React, { useEffect, useState } from "react";
import Refdata from "../../services/Refdata";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import StaticForm from "../../components/StaticForm";
import { Button, Container } from "@material-ui/core";
import ProfileForm from "./ProfileFormData";
export default function ProfileOrg() {
  const history = useHistory();
  let [provinceList, setProvinceList] = useState([]);
  let [cityList, setCityList] = useState([]);
  let [value, setValue] = useState({});

  useEffect(() => {
    Refdata.getProvinces().then(lst => { 
      let ret = lst.map (i => ({value: i , label: i})) ;
      setProvinceList(ret); 
    }) ; 
  
    UserService.getProfile().then(res => {
      let p = res.data.profile || {};
      setValue(p);
      if (p.orgProvince !== null && p.orgProvince !== "") {
        console.log("City Selected!");
        Refdata.getCities(p.orgProvince).then(lst => { 
          let ret = lst.map (i => ({value: i , label: i})) ;
          setCityList(ret); 
        }) ; 
      }
      return p;
    });
  }, []);

  function optionProvider(fieldname) {
    console.log('Get options:' , fieldname , provinceList, cityList); 
    if (fieldname === "orgProvince") return provinceList;
    else if (fieldname === "orgCity") return cityList;
  }

  function valueChange(fieldName, v) {
    let x = { ...value };
    if (
      fieldName == "orgProvince" &&
      value[fieldName] !== v &&
      v !== null &&
      v !== ""
    ) {
      Refdata.getCities(v).then(lst => { 
        let ret = lst.map (i => ({value: i , label: i})) ;
        setCityList(ret); 
      }) ; 
    }
    x[fieldName] = v;
    setValue(x);
  }

  function saveProfile() {
    UserService.saveProfile(value)
      .then(() => history.push("/dashboard"))
      .catch(err => {
        console.log("Some Error", err);
      });
  }
  return (
    <Container maxWidth="xs">
      <StaticForm
        form={ProfileForm}
        title="Form"
        subtitle="Form"
        onChange={valueChange}
        value={value}
        optionProvider={optionProvider}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={saveProfile}
      >
        ذخیره
      </Button>
    </Container>
  );
}
