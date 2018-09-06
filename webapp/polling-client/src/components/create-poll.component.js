import React, {Component} from 'react';
import './styles/css/create-poll.css';
import { Layout, Form, Input, Button, Icon } from 'antd';
import {MAX_CHOICES,POLL_CHOICE_MAX_LENGTH,POLL_QUESTION_MAX_LENGTH,POLL_QUESTION_MIN_LENGTH} from '../constants/constants';

const {TextArea}=Input;
const FormItem=Form.Item;
export default class  CreatePoll extends Component{

    constructor(props){
        super(props);
        this.state={
            question: {
                value: ''
            },
            pollLength: {
                days: 1,
                hours: 0
            },
            choices:[
                {
                    text: ''
                },
                {
                    text: ''
                }
            ]
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.addChoice=this.addChoice.bind(this);
        this.removeChoice=this.removeChoice.bind(this);
        this.handleChoiceChange=this.handleChoiceChange.bind(this);
        this.handleQuestionChange=this.handleQuestionChange.bind(this);
        this.isFormInvalid=this.isFormInvalid.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const poll={
            question: this.state.question.value,
            choices: this.state.choices.map((choice) => {
              return {text : choice.text}  
            })
        }

        console.log(poll);
    }

    addChoice(){
        const choices=this.state.choices.slice();
        if(this.state.choices.length > MAX_CHOICES){
            return;
        }
        this.setState({
           choices: choices.concat({
               text: ''
           })
        });
    }

    validateChoice = (choiceText) => {
        if(choiceText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a choice!'
            }
        } else if (choiceText.length > POLL_CHOICE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Choice is too long (Maximum ${POLL_CHOICE_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateQuestion=(questionText) =>{

        if(questionText.length === 0){
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a question'
            }
        }else if(questionText.length < POLL_QUESTION_MIN_LENGTH){
            return {
                validateStatus: 'error',
                errorMsg: `Question length too short. Minimum(${POLL_QUESTION_MIN_LENGTH}) characters are required`
            }
        }
        
        else if(questionText.length > POLL_QUESTION_MAX_LENGTH){
            return {
                validateStatus: 'error',
                errorMsg: `Question length too long. Maximum (${POLL_QUESTION_MAX_LENGTH}) characters are allowed`
            }
        }else{
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleChoiceChange(event,index){
        const choices=this.state.choices.slice();
        const value=event.target.value;

        choices[index]={
            text: value,
            ...this.validateChoice(value)
        }

        this.setState({
            choices : choices
        });
    }

    handleQuestionChange(event){
        const questionText=event.target.value;

        this.setState({
            question:{
                value: questionText,
                ...this.validateQuestion(questionText)
            }
        });
    }

    removeChoice(index){
        const choices=this.state.choices.slice();
        this.setState({
            choices:[...choices.slice(0,index),...choices.slice(index+1)]
        });
    }

    isFormInvalid(){
        if(this.state.question.validateStatus !== 'success'){
            return true;
        }
        for(let i = 0; i < this.state.choices.length; i++) {
            const choice = this.state.choices[i];            
            if(choice.validateStatus !== 'success') {
                return true;
            }
        }
      return false;
    }

    render(){
        const choiceViews=[];
        this.state.choices.forEach((choice,index) => {
            choiceViews.push(<PollChoice key={index} choiceNumber={index} choice={choice} handleChoiceChange={this.handleChoiceChange} removeChoice={this.removeChoice}/>)
        });
    return(
    <Layout className="new-poll-container">
        <h1>Create a new Poll</h1>
        <Form onSubmit={this.handleSubmit}>
        <FormItem  validateStatus={this.state.question.validateStatus} help={this.state.question.errorMsg}>
            <TextArea 
            name="question"
            placeholder="Enter your question here"
            style={{fontSize: '16px'}}
            value={this.state.question.value}
            autosize={{maxRows: 7, minRows: 3}}
            onChange={this.handleQuestionChange}
            />
        </FormItem>
       
       {choiceViews}

        <FormItem className="poll-form-row">
        <Button type="dashed" size="large" onClick={this.addChoice} disabled={this.state.choices.length >= MAX_CHOICES}><Icon type="plus" /> Add a choice</Button>
        </FormItem>

        <FormItem  className="poll-form-row">
            <Button disabled={this.isFormInvalid()} className="create-poll-form-button" type="primary" size="large" htmlType="submit">Create Poll</Button>
        </FormItem>
        </Form>
    </Layout>
);
    }
}


const PollChoice=(props)=>{
    return (
        <FormItem className="poll-form-row" validateStatus={props.choice.validateStatus} help={props.choice.errorMsg}>
            <Input
            name="choice"
            placeholder={' Choice ' + (props.choiceNumber +1)}
            value={props.choice.text}
            className={props.choiceNumber > 1 ? "optional-choice" : null}
            size="large"
            onChange={(event) => props.handleChoiceChange(event,props.choiceNumber)}
            />
            {
                props.choiceNumber > 1 ? 
                (
                    <Icon type="close" className="dynamic-delete-button" onClick={() => props.removeChoice(props.choiceNumber)}></Icon>
                ) : null
            }
        </FormItem>
    );
}