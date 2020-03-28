import React from 'react' ; 
import { MenuItem } from '@material-ui/core';


function StaticForm(props) { 
    function getFieldGrid(field) {
        return <Grid item xs={12}>{getFieldInput(field)}</Grid>
    }
    
    function getFieldInput(field) {
        if(field.options !== unidefined && field.options !== null) {
            return (
                <FormControl className={classes.formControl}>
                  <InputLabel >{field.label}</InputLabel>
                  <Select
                    value={getValue(field.name)}
                    onChange={(e)=>setValue(field.name , e)}
                  >
                    {field.options.map((i)=><MenuItem key={field.name + i.value}  value={i.value}>{i.label}</MenuItem>)}

                  </Select>
                  <FormHelperText>{field.helper}</FormHelperText>
                </FormControl>
    
            ); 
        } else {
            if (field.type === 'text') {
                return (
                    <TextField
                    className={classes.elements}  
                    required
                    fullWidth
                    label={field.label}
                    autoFocus
                    value={getValue(field.name)}
                    onChange={(e)=>setValue(field.name , e)}
                    />
                );                
            } 
            if (field.type === 'longtext') {
                return (
                    <TextField
                    className={classes.elements}  
                    required
                    fullWidth
                    label={field.label}
                    autoFocus
                    multiline
                    rows="4"
                    value={getValue(field.name)}
                    onChange={(e)=>setValue(field.name , e)}
                    />
                );                
            }
            
            if (field.type === 'date') {
                //TBC
            }
        }
    }

    return (
        
    ); 
    
}