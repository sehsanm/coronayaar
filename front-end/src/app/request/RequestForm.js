import React, {useState, useEffect} from 'react'  ; 
import {useHistory} from 'react-router-dom' ; 
import formData from './RequestFormData' ; 
import StaticForm from '../../components/StaticForm';
import UserService from '../../services/UserService'  ;
import RequestService from '../../services/RequestService'  ;
import { Button , Container, Paper, Typography} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme)=>({
    warningPanel : {
        marginTop : theme.spacing(2) 
    }
})) ;

function RequestForm(props) {
    const classes = useStyle() ; 
    const history = useHistory() ;
    let form = formData ; 
    let [value, setValue] = useState({}) ; 
    let [currentUser, setCurrentUser] = useState({}) ; 
    
    useEffect(() => {
        UserService.getProfile().then((u) => setCurrentUser(u.data)) ; 
    } , [] ) ; 


    function valueChange(fieldName, v) {
        let x = {...value} ; 
        x[fieldName] =  v; 
        setValue (x);     
    }


    function saveRequest() {
        RequestService.saveRequest(value).then(()=>history.push('/dashboard')) ; 
    }

    console.log(form) ;
    console.log('-->' , currentUser.status);
    if (currentUser.status === 'approved') { 
        return (
            <Container maxWidth="xs">
                <StaticForm form={form} title="Form" subtitle="Form" 
                    onChange={valueChange} value={value}
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
        return (
            <Container maxWidth="xs" className={classes.warningPanel}>
                <Paper fullWidth elevation="3">
                    <WarningIcon fontSize="large" color="error" />
                    <Typography variant="h6" >
                        کاربر شما هنوز توسط مدیر سامانه تایید نشده است. لطفا از کامل بودن پروفایل خود اطمینان حاصل کنید
                    </Typography>
                    <Button color="secondary"  variant="contained" className={classes.warningPanel}
                        onClick={()=> history.push('/profile')}>برو به پروفایل</Button>
                </Paper>
            </Container>
        )        
    } 
}

export default RequestForm ; 