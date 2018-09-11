import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/css/poll.css';
import {Avatar,Radio} from 'antd';


const RadioGroup = Radio.Group;
export default class PollComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            poll: props.poll,
            user:props.user
        }
    }

    render() {
        const pollChoices=[];
        this.state.poll.choices.forEach((choice,choiceIndex) => {
            pollChoices.push(<Radio className="poll-choice-radio" key={choice.id} value={choice.id}>{choice.text}</Radio> )       
        });
        return (
            <div className="polls-container">
                <div className="polls-content">
                    <div className="poll-header">
                        <div className="poll-creator-info">
                            <Link className="creator-link" to="/profile">
                                <Avatar className="poll-creator-avatar"
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                                    {this.state.user.userName}
                                </Avatar>
                                <span className="poll-creator-name">
                                     {`${this.state.user.name}`}
                                 </span>
                                <span className="poll-creator-username">
                                  @{this.state.user.userName}
                                 </span>
                                <span className="poll-creation-date">
                                    12-10-2010
                                </span>
                            </Link>
                        </div>
                        <div className="poll-question">
                            {this.state.poll.question}
                        </div>
                    </div>
                    <div className="poll-choices">
                    <RadioGroup 
                        className="poll-choice-radio-group" 
                        >
                        {pollChoices}
                    </RadioGroup>
                </div>
                </div>
            </div>
        );
    }
}