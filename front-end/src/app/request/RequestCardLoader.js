import React, { useEffect, useState } from 'react' ; 
import {useHistory} from 'react-router-dom' ; 
import RequestCard from './RequestCard'; 
import ErrorDiplay from '../../components/ErrorDisplay' ;
import RequestService from '../../services/RequestService' ;
import AuthService from '../../services/AuthService'; 
import PledgeDialogButton from "../pledge/PledgeDialogButton";
import ChangeStatusDialogButton from './ChangeStatusDialogButton';
import Button from '@material-ui/core/Button' ; 
function RequsetCardLoader(props) {
    let [req, setReq] = useState(null); 
    let [pledges, setPledges] = useState([]); 
    let [errors, setErrors] = useState(); 
    let history = useHistory() ;
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

        if (AuthService.getAuth().user._id == req.userId) {
            actions.push( <Button color="primary" variant="outlined" onClick={()=>history.push(`/request/${req._id}/pledges`)}>{"نمایش لیست تامین"}</Button> )
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