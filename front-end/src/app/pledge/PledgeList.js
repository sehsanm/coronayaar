import React, { useState, useEffect } from 'react' ; 
import RequestService from '../../services/RequestService' ;
import { LinearProgress } from '@material-ui/core';
import PledgeListTable from './PledgeListTable';
import MyPledgeListTable from './MyPledgeListTable';
import AuthService from "../../services/AuthService";

function RequestList(props) {

    let [pledges, setPledges] = useState({});  
    let [loading , setLoading] = useState(true); 

    useEffect(()=>{

        setLoading(true);
        if (props.requestId) {
            RequestService.getPledges(props.requestId).then(s => {
                setPledges(s.data); 
                setLoading(false); 
            });
    
        } else if (props.myPledges) {
            RequestService.getUserPledges(AuthService.getAuth().user._id).then(s => {
                setPledges(s.data) ; 
                setLoading(false); 
            })
        }

    } , []); 

    if (loading) {
        return <LinearProgress /> ; 
    } else if (props.requestId){
        return <PledgeListTable data={pledges} />
    } else if (props.myPledges) {
        return <MyPledgeListTable data={pledges} />
    }
    return <div></div>
    
}


export default RequestList ; 