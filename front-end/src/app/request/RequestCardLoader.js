import React, { useEffect, useState } from 'react' ; 
import RequestCard from './RequestCard'; 
import ErrorDiplay from '../../components/ErrorDisplay' ;
import RequestService from '../../services/RequestService' ;
import AuthService from '../../services/AuthService'; 
import PledgeDialogButton from "../pledge/PledgeDialogButton";
import ChangeStatusDialogButton from './ChangeStatusDialogButton';
function RequsetCardLoader(props) {
    let [req, setReq] = useState(null); 
    let [pledges, setPledges] = useState([]); 
    let [errors, setErrors] = useState(); 

    useEffect(()=>{
        loadRequest() ;
    } , []); 

    function getActions() {
        let actions = [] 
        if (!AuthService.getAuth().isAuthenticated())
            return actions ; 
        if (AuthService.getAuth().isAdmin()) {
            actions.push(<ChangeStatusDialogButton request={req} onClose={() => loadRequest()} />); 
        } else if ( AuthService.getAuth().user.profile.orgType == 'charity' ){ 
            let myPledge = findMyPledge(); 
            actions.push(<PledgeDialogButton request={req} pledge={myPledge} onClose={() => loadRequest()}/>); 

        }

        return actions ; 
    }

    function loadRequest() {
        setErrors(null); 
        RequestService.getRequest(props.id).then((res)=> {
            setReq(res.data); 
            return RequestService.getPledges(props.id)
        } ).then((res) => setPledges(res.data))
        .catch(err => setErrors(err));
    } 

    if (errors)
        return <ErrorDiplay errors={errors} /> 
    else if (req) {                    
        return <RequestCard request={req}  actions={getActions()}/>
    }else {
        return <div></div>;   
    }


    function findMyPledge() {
        let myPledge = null;
        pledges.forEach(p => {
            if (AuthService.getAuth().isAuthenticated() && p.userId === AuthService.getAuth().user._id) {
                myPledge = p;
            }
        });
        return myPledge ; 
    }
}

export default RequsetCardLoader ; 