import React, {Component} from 'react';
import './styles/css/create-poll.css';
import { Layout, Form, Input, Button, Icon } from 'antd';
import {MAX_CHOICES} from '../constants/constants';

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
    }

    handleSubmit(event){
        event.preventDefault();
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

    render(){
        const choiceViews=[];
        this.state.choices.forEach((choice,index) => {
            choiceViews.push(<PollChoice choiceNumber={index} />)
        });
    return(
    <Layout className="new-poll-container">
        <h1>Create a new Poll</h1>
        <Form onSubmit={this.handleSubmit}>
        <FormItem >
            <TextArea 
            name="question"
            placeholder="Enter your question here"
            style={{fontSize: '16px'}}
            autosize={{maxRows: 7, minRows: 3}}
            />
        </FormItem>
       
       {choiceViews}

        <FormItem className="poll-form-row">
        <Button type="dashed" size="large" onClick={this.addChoice} disabled={this.state.choices.length >= MAX_CHOICES}><Icon type="plus" /> Add a choice</Button>
        </FormItem>

        <FormItem  className="poll-form-row">
            <Button disabled={true} className="create-poll-form-button" type="primary" size="large" htmlType="submit">Create Poll</Button>
        </FormItem>
        </Form>
    </Layout>
);
    }
}


const PollChoice=(props)=>{
    return (
        <FormItem className="poll-form-row">
            <Input
            name="choice"
            placeholder="Enter your choice"
            className={props.choiceNumber > 1 ? "optional-choice" : null}
            size="large"
            />
            {
                props.choiceNumber > 1 ? 
                (
                    <Icon type="close" className="dynamic-delete-button"></Icon>
                ) : null
            }
        </FormItem>
    );
}