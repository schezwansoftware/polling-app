import React,{Component} from 'react';
import { Avatar } from 'antd';
import './styles/css/profile.css';
class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: props.isAuthenticated,
            currentUser: props.currentUser
        }

    }
    
    render(){
        return (
            <div className="profile">                
                    <div className="user-profile">
                        <div className="user-details">
                            <div className="user-avatar">
                                <Avatar className="user-avatar-circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                                    @{this.state.currentUser.login}
                                </Avatar>
                            </div>
                            <div className="user-summary">
                                <div className="full-name">{this.state.currentUser.firstName+' '+this.state.currentUser.lastName}</div>
                                <div className="username">@{this.state.currentUser.userName}</div>
                                <div className="user-joined">
                                    Joined {this.state.currentUser.createdAt}
                                </div>
                            </div>
                        </div>
                        <div className="user-poll-details">    
                            
                        </div>  
                    </div>  
        </div>
        );
    }
}
export default Profile;