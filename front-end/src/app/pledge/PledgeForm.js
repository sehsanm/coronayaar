import React, { useState, useEffect } from "react";
import PledgeFromData from "./PledgeFormData";
import StaticForm from "../../components/StaticForm";
import ObjectUtil from '../../components/ObjectUtil';
import {
  Button,
  Container,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import authProvider from "../../services/AuthService";
import WarningPanel from "../../components/WarningPanle";
import PledgeFormData from "./PledgeFormData";
import RequestService from '../../services/RequestService';
const useStyle = makeStyles(theme => ({
  warningPanel: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function RequestForm(props) {
  const classes = useStyle();
  let [pledgeForm, setPledgeForm] = useState(props.pledge || {});
  let [currentUser, setCurrentUser] = useState({});
  let [loading, setLoading] = useState(false);
  let [errors, setErrors] = useState([]);
  useEffect(() => {
    setCurrentUser(authProvider.getAuth().user);
  }, []);

  function valueChange(fieldName, v) {
    let x = { ...pledgeForm };
    x[fieldName] = v;
    setPledgeForm(x);
  }
  console.log('Pledge form:' , props) ;
  function savePledge() {
    console.log('Pledge form (1):' , props.request._id) ;

    setLoading(true); 
    ObjectUtil.validateForm(PledgeFormData, pledgeForm).then(() => RequestService.upsertPledge(props.request._id, pledgeForm))
      .then(() => props.onClose(pledgeForm))
      .catch((err) => {
        if (Array.isArray(err))
          setErrors(err);
        else
          setErrors([err]);
      }).finally(() => setLoading(false));

  }
  if (loading) {
    return <LinearProgress />;
  }
  if (!currentUser) {
    return <WarningPanel message="شما وارد سیستم نشده اید. تنها  پس از ثبت نام می توانید برای تامین اقدام کنید." onClose={props.onClose} />
  } else if (!currentUser.profile || currentUser.profile.orgType === 'hospital') {
    return <WarningPanel message="شما به عنوان کاربر مرکز درمانی نمی توانید برای تامین اقدام کنید" onClose={props.onClose} />
  } else {
    return (
      <Container maxWidth="xs">
        <StaticForm
          form={PledgeFromData}
          title="اعلام تامین نیاز مندی"
          onChange={valueChange}
          value={pledgeForm}
          errors={errors}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={savePledge}
          className={classes.button}
        >
          ذخیره
        </Button>
      </Container>
    );
  }
}

export default RequestForm;
