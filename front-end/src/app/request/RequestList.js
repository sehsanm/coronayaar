import React, { useState, useEffect } from 'react' ; 
import RequestService from '../../services/RequestService' ;
import AuthService from '../../services/AuthService' ;
import { LinearProgress } from '@material-ui/core';
import RequestListTable from './RequestListTable';

function RequestList(props) {

    let [requests, setRequests] = useState({});  
    let [loading , setLoading] = useState(true); 

    useEffect(()=>{
        let filter =  props.filter || {} ; 
        if (props.myRequests) {
            filter = {
                userId : AuthService.getAuth().user._id
            }
        }
        RequestService.getAllRequests(filter).then(s => {
            setRequests(s.data); 
            setLoading(false); 
        });
    } , []); 

    if (loading) {
        return <LinearProgress /> ; 
    } else {
        return <RequestListTable data={requests || [] }  title={props.title} />
    }
    
}


export default RequestList ; 