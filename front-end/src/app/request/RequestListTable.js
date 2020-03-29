import React, { useState, useEffect,  } from 'react' ; 
import MaterialTable from 'material-table' ; 
import authProvider from '../../services/AuthService';
import userService from '../../services/UserService';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton, Chip, Avatar} from '@material-ui/core'



function RequestListTable(props) {
    return (
        <div>
            <MaterialTable
                options={
                    {
                        search: true,
                    }
                } 
                columns={[
                    {title: "مورد نیاز" , field: "type"}, 
                    {title: "تعداد" , field: "quantity"}, 
                    {title: "فوریت" , field: "urgency" }, 
                    {title: "استان" , field: "org.orgProvince"},
                    {title: "شهر" , field: "org.orgCity"},
                    {title: "نام مرکز" , field: "org.orgName"}, 
                    {title: "وضعیت" , field: "status", render: (rawdata) => {
                        return(<IconButton aria-label="delete" >
                            {rawdata.status === 'approved' && <CheckCircleOutlineIcon fontSize="small" />}
                            {rawdata.status !== 'approved' && <CancelIcon fontSize="small" />}
                        </IconButton>) ;                        
                    }},             
                ]}
                data={props.data}
            />
        </div>
    ); 
}

export default RequestListTable ; 