import React, {useState} from 'react'  ; 
import formData from './RequestFormData' ; 
import StaticForm from '../../components/StaticForm';
import { Button } from '@material-ui/core';
function RequestForm(props) {
    let form = formData ; 
    let [value, setValue] = useState({}) ; 
    function valueChange(fieldName, v) {
        let x = {...value} ; 
        x[fieldName] =  v; 
        setValue (x);     
    }

    function saveRequest() {
        
    }

    console.log(form) ; 
    return (
        <div>
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
        </div>
    ); 
}

export default RequestForm ; 