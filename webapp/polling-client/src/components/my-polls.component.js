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
            polls: [],
            userDetails:{
                id: null,
                userName:null,
                name:null
            }
        }
    }


    componentDidMount(){
        this.loadAllPolls();
    }

    loadAllPolls(){
        this.setState({
            isLoading: true
        });
        getAllPostsByUser()
        .then(response=>
            {
                this.setState({
                    polls: response.polls,
                    userDetails:{
                        userName: response.userName,
                        name: response.name,
                        id:response.id
                    },
                    isLoading: false
                });
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
        const pollViews=[];
        this.state.polls.forEach((poll,pollIndex) => {
            pollViews.push(<PollComponent 
                poll={poll}
                user={this.state.userDetails}
                key={poll.id}

                />)
        });
        if(this.state.isLoading){
            return <LoadingIndicator />
        }else{
            return(
                <div className="polls-container">
                {pollViews}
                 {
                (!this.state.isLoading && this.state.polls.length === 0) ? 
                <PollsNotFound /> : null
                }
                 </div>
            );
        }
    }
}

const PollsNotFound=()=>{
return (<div className="no-polls-found">
<span>Sorry! No polls found</span>
</div>);
}


