import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { CardContent, CardHeader, CardActions, Button } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },

    card: {
      margin: 50, 
    }, 

    controls: {
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));


function Question(props) {

    const classes = useStyles();
    
    const handleChange = event => {
      console.log('Value is changed:' , event.target.value)
        props.onChange(event.target.value);
    };
    console.log('Rendering!', props) ;


    return (
    
    <div >
      <Card className={classes.card}> 
        <CardHeader title={props.question.title}
          subheader={props.index + '/' + props.total}
        />
          
        <CardContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup aria-label="gender" name="answer" value={props.value || '' } onChange={handleChange}>
                { props.question.options.map((o , i) =>  (
                    <FormControlLabel value={i + ''} control={<Radio />} label={o} />          
                ))}

            </RadioGroup>
            </FormControl>        
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary"  onClick={() => {props.onPrevious()}}
            className={classes.controls} >قبلی</Button>
          <Button variant="contained" color="primary"  onClick={()=>{props.onNext()}}
            className={classes.controls} disabled={props.value === undefined} >بعدی</Button>
        </CardActions>
      </Card>
    </div>) ; 
}

export default Question ; 