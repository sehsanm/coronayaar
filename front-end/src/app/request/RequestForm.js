import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import formData from "./RequestFormData";
import StaticForm from "../../components/StaticForm";
import UserService from "../../services/UserService";
import RequestService from "../../services/RequestService";
import {
  Button,
  Container,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";
import WarningPanel from "../../components/WarningPanle";


function RequestForm(props) {
  const history = useHistory();
  let form = formData;
  let [value, setValue] = useState({});
  let [currentUser, setCurrentUser] = useState({});
  let [loading, setLoading] = useState(true);
  let [errors, setErrors]  = useState([]) ;

  useEffect(() => {
    UserService.getProfile()
      .then(u => setCurrentUser(u.data))
      .then(() => setLoading(false));
  }, []);

  function valueChange(fieldName, v) {
    
    let x = { ...value };
    x[fieldName] = v;
    console.log('XXX', x) ; 
    setValue(x);
  }

  function saveRequest() {
    if (form) {
      let { error, obj } = form.schema.validate(value);
      if (error) {
        setErrors([error.message]);
        return;
      } else {
        setErrors([]);
      }
    }
    RequestService.saveRequest(value).then((v) => {
      if (props.onClose)
        props.onClose(v); 
    });
  }
  console.log(form);
  if (loading) {
    return <LinearProgress />;
  }
  if (currentUser.status === "approved") {
    return (
      <Container maxWidth="xs">
        <StaticForm
          form={form}
          title="Form"
          subtitle="Form"
          onChange={valueChange}
          value={value}
          errors={errors}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={saveRequest}
        >
          ذخیره
        </Button>
      </Container>
    );
  } else {
    return (<WarningPanel message="کاربر شما هنوز توسط مدیر سامانه تایید نشده است. لطفا از کامل بودن پروفایل خود اطمینان حاصل کنید"
                onClose={() => history.push("/profile")}
                closeMessage="برو به پروفایل" />);  
  }
}

export default RequestForm;
