import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/css/poll.css';
import {Avatar,Radio} from 'antd';


const RadioGroup = Radio.Group;
export default class PollComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="polls-container">
                <div className="polls-content">
                    <div className="poll-header">
                        <div className="poll-creator-info">
                            <Link className="creator-link" to="/profile">
                                <Avatar className="poll-creator-avatar"
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                                    {this.props.currentUser.firstName}
                                </Avatar>
                                <span className="poll-creator-name">
                                     {`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}
                                 </span>
                                <span className="poll-creator-username">
                                  @{this.props.currentUser.userName}
                                 </span>
                                <span className="poll-creation-date">
                                    12-10-2010
                                </span>
                            </Link>
                        </div>
                        <div className="poll-question">
                            What is the question
                        </div>
                    </div>
                    <div className="poll-choices">
                    <RadioGroup 
                        className="poll-choice-radio-group" 
                        >
                        <Radio className="poll-choice-radio" key="1" value="abc">abc</Radio>
                        <Radio className="poll-choice-radio" key="2" value="def">abc</Radio>
                        <Radio className="poll-choice-radio" key="3" value="hig">abc</Radio>
                    </RadioGroup>
                </div>
                </div>
            </div>
        );
    }
}