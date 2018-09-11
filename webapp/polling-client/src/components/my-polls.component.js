import React, {Component} from 'react';
import PollComponent from './poll.component';
import './styles/css/my-polls.css';
import LoadingIndicator from '../commons/loading-indicator';
import { getAllPostsByUser } from '../services/posts.service';
import { Modal } from 'antd';

export default class  MyPolls extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            polls: []
        }
    }


    componentDidMount(){
        this.loadAllPosts();
    }

    loadAllPosts(){
        this.setState({
            isLoading: true
        });
        getAllPostsByUser()
        .then(response=>
            {
                this.setState({
                    polls: response,
                    isLoading: false
                });

                console.log(this.state.polls);
            })
        .catch(err=>{
            if(err.status=== 401){
                Modal.error({
                    title: 'Un-Authorize Access',
                    content: 'You are not authorize to access this resource'
                });
            }else{
                Modal.error({
                    title: 'Internal Server Error',
                    content: 'OOps Something went wrong'
                });
            }

            this.setState({
                isLoading: false
            });
        });
    }
    render(){
        if(this.state.isLoading){
            return <LoadingIndicator />
        }else{
            return <PollComponent {...this.props}/>
        }
    }
}

const PollsNotFound=()=>{
return <h1>Your Polls</h1>
}


