import React, { useState, useEffect,  } from 'react' ; 
import MaterialTable from 'material-table' ; 
import authProvider from '../../services/AuthService';
import userService from '../../services/UserService';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton, Chip, Avatar} from '@material-ui/core'



function UserList(props) {
    //const history = useHistory(); 
    //Check roles 
    if (!authProvider.getAuth().isAuthenticated() || !authProvider.getAuth().isAdmin()){
        //history.push('/') ; 
    }
    let [users, setUsers] = useState([]) ;
    function loadUsers() {
        userService.getAllUsers().then((json) => setUsers(json.data)) ;
    }     
    useEffect(()=> loadUsers(), []);
    function toggleUser(userInfo) {
        return () => {
            if(userInfo.status !== 'approved') {
                userService.approveUser(userInfo._id).then(loadUsers) ; 
            } else {
                userService.rejectUser(userInfo._id).then(loadUsers) ; 
            }
        }
    }
    function toggleRole(role , userInfo) {
        return () => {
            if (!userInfo.roles || userInfo.roles.indexOf(role) == -1) {
                userService.addRole(userInfo,  role).then(loadUsers);
            }  else {
                userService.removeRole(userInfo ,  role).then(loadUsers); 
            }   
        }
    }

    function rolesComponents(userInfo) {
        console.log(userInfo, (userInfo.roles && userInfo.roles.indexOf('admin')>= 0))    ;
        return  [
        <Chip
            avatar={<Avatar>A</Avatar>}
            label="مدیر سیستم"
            clickable
            color={(userInfo.roles && userInfo.roles.indexOf('admin') >= 0? "secondary": "primary") }
            onClick={toggleRole('admin' , userInfo)}
            
            />
        ]
    }
    return (
        <div>
            <MaterialTable
                options={
                    {
                        search: true,
                    }
                } 
                columns={[

                    {title: "نام کاربری" , field: "username"}, 
                    {title: "نام" , field: "name"}, 
                    {title: "نقش ها" , field: "roles" , render: (rawdata) => {
                        return rolesComponents(rawdata);
                    }}, 
                    {title: "استان" , field: "profile.orgProvince"},
                    {title: "شهر" , field: "profile.orgCity"},
                    {title: "نوع سازمان" , field: "profile.orgType", lookup: {
                        "hospital" : "مرکز درمانی" , 
                        "charity" : "خیریه" , 
                        "other" : "سایر"
                    }}, 
                    {title: "نام سازمان" , field: "profile.orgName"}, 
                    {title: "وضعیت" , field: "status", render: (rawdata) => {
                        return(<IconButton aria-label="delete" onClick={toggleUser(rawdata)}>
                            {rawdata.status === 'approved' && <CheckCircleOutlineIcon fontSize="small" />}
                            {rawdata.status !== 'approved' && <CancelIcon fontSize="small" />}
                        </IconButton>) ;                        
                    }},             
                ]}
                data={users}
            />
        </div>
    ); 
}

export default UserList ; 