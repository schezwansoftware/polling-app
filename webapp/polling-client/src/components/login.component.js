import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, Modal} from 'antd';
import {login} from '../services/posts.service';
import './styles/css/login.css';
import {ACCESS_TOKEN} from '../constants/constants';
import LoadingIndicator from '../commons/loading-indicator';
import {Link} from 'react-router-dom';


const FormItem =Form.Item;
class Login extends Component{

  render(){
    const LoginForm=Form.create()(AntWrappedLoginForm);
    return (
   <div className="login-container">
     <Card title="Log In">
        <div className="login-content">
           <LoginForm />
        </div>
     </Card>
    </div>
    );
  }
}


class AntWrappedLoginForm extends Component{
 
  constructor(props){
    super(props);
    this.state={
      isLoading: false
    }
  }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
          if (!err) {
            const loginRequest=Object.assign({},values);
            this.setState({
              isLoading : true
            });
            login(loginRequest).then(response => {

              localStorage.setItem(ACCESS_TOKEN,response.id_token);

              Modal.success({

                title:'LogIn Success',
                content: 'You have logged in Successfully'
            });

            this.setState({
              isLoading : false
            });
            }).catch(err => {
              if(err.status === 401){
                Modal.error({
                  title: 'Bad Credentials',
                  content: 'Invalid User Name or Password'
                });
              }else{
                Modal.error({
                  title: 'Internal Server Error',
                  content: 'Ooops!! Something went Wrong'
                });
              }

              this.setState({
                isLoading : false
              });
            });
          }
        });
    }


    renderFormFooter(){
      const {getFieldDecorator}=this.props.form;
      if(this.state.isLoading){
        return   (
            <LoadingIndicator />
        );
      }else{
        return (
          <FormItem>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
        )
      }
    }
   
    render(){
        const {getFieldDecorator}=this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        {this.renderFormFooter()}
      </Form>
        );
    }
}
export default Login;