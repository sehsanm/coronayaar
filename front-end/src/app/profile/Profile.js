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
  let [errors, setErrors]  = useState([]) ;
  useEffect(() => {
    Refdata.getProvinces().then(lst => { 
      let ret = lst.map (i => ({value: i , label: i})) ;
      setProvinceList(ret); 
    }) ; 
  
    UserService.getProfile().then(res => {
      let p = res.data.profile || {};
      console.log(res.data , p ) ; 
      
      if (p.orgProvince !== null && p.orgProvince !== "") {
        console.log("City Selected!");
        Refdata.getCities(p.orgProvince).then(lst => { 
          let ret = lst.map (i => ({value: i , label: i})) ;
          setCityList(ret); 
        }) ; 
      }
      setValue(p);
      console.log('-->' , p); 
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
      fieldName === "orgProvince" &&
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
    console.log('xxx', fieldName, ' ', v); 
    setValue(x);

  }

  function saveProfile() {
    if (ProfileForm.schema) {
      let {error} = ProfileForm.schema.validate(value) ; 
      if (error) {
        setErrors([error.message]); 
        return ; 
      }else {
        setErrors([]) ;
      }
    }
    UserService.saveProfile(value)
      .then(() => history.push("/dashboard"))
      .catch(err => {
        setErrors([err + ""]);
      });
  }
  return (
    <Container maxWidth="xs">
      <StaticForm
        form={ProfileForm}
        title="فرم اطلاعات سازمان"
        subtitle="برای تایید ادمین به اطلاعات زیر نیازمندیم"
        onChange={valueChange}
        value={value}
        optionProvider={optionProvider}
        errors={errors}
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
