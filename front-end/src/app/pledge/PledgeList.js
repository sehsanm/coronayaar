import React, { useState, useEffect } from 'react' ; 
import RequestService from '../../services/RequestService' ;
import AuthService from '../../services/AuthService' ;
import { LinearProgress } from '@material-ui/core';
import PledgeListTable from './PledgeListTable';

function RequestList(props) {

    let [pledges, setPledges] = useState({});  
    let [loading , setLoading] = useState(true); 

    useEffect(()=>{
        setLoading(true);
        RequestService.getPledges(props.requestId).then(s => {
            setPledges(s.data); 
            setLoading(false); 
        });

    } , []); 

    if (loading) {
        return <LinearProgress /> ; 
    } else {
        return <PledgeListTable data={pledges} />
    }
    
}


export default RequestList ; 