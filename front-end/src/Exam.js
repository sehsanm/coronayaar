import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Question from './Question';
import UserInput from './UserInput'
import { CardHeader, CardContent, Typography, Card,  CardActions , Button, Paper} from '@material-ui/core';
import intro from './static/exam-intro'

const useStyles = makeStyles(theme => ({

    card: {
      margin: 50, 
    }, 

    intro: {
        padding: theme.spacing(3, 2),    
    },
    controls: {
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: theme.spacing(1)
    },
  }));

function Exam(props) {
    const classes = useStyles();
    const [stage, setStage] = useState('user_data') ; 
    const [index , setIndex] = useState(1) ; 
    const [answers, setAnswers] = useState([]) ; 
    const [userData , setUserData] = useState({
        studentName :'' , 
        studentNumber : '' , 
        email: '' ,
    }) ;


    const submit = function() {
        props.onSubmit(userData , answers) ; 
    }

    const setAnswer = function(answer) {
        let dummyAnswers = answers.slice(0) ; 
        dummyAnswers[index - 1] = answer ; 
        setAnswers(dummyAnswers); 
    }
    
    const gotoPrevious = function() {
        if (index > 1) {
            setIndex(index - 1) ;
        } else {
            setStage('user_data');
        }   
    }

    const gotoNext = function() {
        if (index < props.questions.length) {            
            setIndex(index + 1); 
        } else {
            setStage('submit');
        }  
    }

    const movetoQuestions = function (studentName , studentNumber , email    ) {
        setUserData({studentName: studentName , studentNumber : studentNumber, email: email}) ; 
        setStage('questions')
    }
    console.log('Questions: ' , props.questions)

    if (stage === 'user_data') {
        return (
            <div>
                <Paper className={classes.intro}>
                    <Typography variant="h5" component="h3">
                        {intro.header}
                    </Typography>
                    <Typography component="p">
                        {intro.description}
                    </Typography>
                </Paper>            
                <UserInput onSubmit={movetoQuestions} />

            </div>
        ) ;
    } else if (stage === 'questions') {
        return (
            <Question  question={props.questions[index - 1]} index={index} total={props.questions.length}
                onNext={gotoNext}  onPrevious={gotoPrevious} value={answers[index - 1]}
                onChange={setAnswer}/>
        ); 
    
    } else if (stage === 'submit') {
        return (
            <Card className={classes.card}>
                <CardHeader 
                    title="با تشکر از شرکت در جمع آوری داده "
                    subheader="داده‌های شما آماده ارسال می باشند."
                />
                <CardContent>
                    <div>
                        <Typography>نام</Typography>
                        <Typography>{userData.studentName}</Typography>
                    </div>
                    <div>
                        <Typography>شماره دانشجویی</Typography>
                        <Typography>{userData.studentNumber}</Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary"  onClick={() => {setStage('questions')}}
                        className={classes.controls} >قبلی</Button>
                    <Button variant="contained" color="primary"  onClick={submit}
                        className={classes.controls} >ارسال</Button>                    
                </CardActions>
            </Card>
        ) ; 

    }
}

export default Exam ; 
