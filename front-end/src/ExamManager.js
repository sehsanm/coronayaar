import React from 'react';
import axios from 'axios'
import Exam from './Exam';
import { Typography } from '@material-ui/core';

const API_ENDPOINT = 'REACT_APP_API_ENDPOINT' ; 
function loadSetting(setting) {

    if (setting === API_ENDPOINT) {
        return process.env[API_ENDPOINT] ||  'http://localhost:5000/api'
    }

}

export default class ExamManager extends React.Component { 

    constructor(props){
        super(props) ; 
        this.state = {
            status: 'init' , 
            message : 'در حال دریافت اطلاعات' 
        }
        
    }

    componentDidMount() {
        axios.get(loadSetting(API_ENDPOINT)  + '/questions').then((resp) => this.setState({
            questions: resp.data, 
            status: 'ready'
        }), () => {
            this.setState({
                starus: 'error', 
                message: 'ارتباط با سرور قطع است'
            })
        }) ; 
    }

    submitAnswers = (userData , answers) => {
        let paylaod = {
            userData: userData, 
            answers: answers, 
            questions: this.state.questions, 
        } ; 
        
        axios.post(loadSetting(API_ENDPOINT) + '/answers', paylaod).then( () => {
            this.setState({
                status: 'complete' , 
                message: 'داده برای سرور ارسال شد'
            })} 
            ,  () => {
                this.setState({
                    status: 'error' , 
                    message: 'ارتباط با سرور قطع است'
                });
            });
       
        
    }

    render() {
        if (this.state.status === 'ready') {
            console.log('There!')
            return <Exam key="1" questions={this.state.questions} onSubmit={this.submitAnswers} />
        } else {
            console.log('Here!' , this.state)
            return <Typography key="2" variant="h3" style={{marginTop: 70 + 'px'}} >{this.state.message}</Typography> 
        }
    }

}