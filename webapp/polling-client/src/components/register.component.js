import React,{Component} from 'react';
import { Form, Input, Button, Card } from 'antd';
import {Link} from 'react-router-dom';
import './styles/css/register.css';

import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants/constants';


const FormItem = Form.Item;

class Register extends Component{

 constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            confirmPassword: {
               value:'' 
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }


    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'  &&
            this.state.confirmPassword.validateStatus === 'success'
        );
    }

    render(){
        return (
            <div className="signup-container">
                <Card title="Register Here">
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}
                            >
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} 
                             />    
                        </FormItem>
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg} 
                            >
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                            />    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}
                            >
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}
                             />    
                        </FormItem>
                        <FormItem 
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}
                            >
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters"
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} 
                            />    
                        </FormItem>


                        <FormItem 
                            label="Confirm Password"
                            hasFeedback
                            validateStatus={this.state.confirmPassword.validateStatus}
                            help={this.state.confirmPassword.errorMsg}
                            >
                            <Input 
                                size="large"
                                name="confirmPassword" 
                                type="password"
                                autoComplete="off"
                                placeholder="Re-Type The Above Password" 
                                value={this.state.confirmPassword.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateConfirmPassword)}
                            />    
                        </FormItem>



                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}
                                onClick={this.handleSubmit}

                            >Sign up</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>

                </Card>
            </div>
        );

    }
// Validation Functions

validateName = (name) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}

validateEmail = (email) => {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
        }
    }

    return {
        validateStatus: 'success',
        errorMsg: null
    }
}

validateUsername = (username) => {
    if(username.length < USERNAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
        }
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
}

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateConfirmPassword=(confirmPassword)=>{

        if(this.state.password.value === confirmPassword){
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }else{
            return {
                validationStatus: 'error',
                errorMsg: 'Passwords do not match'
            }
        }

    }
}



export default Register;