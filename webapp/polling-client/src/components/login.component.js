import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, Modal} from 'antd';
import './styles/css/login.css';
import {Link} from 'react-router-dom';


const FormItem =Form.Item;
const Login=()=> {
    const LoginForm=Form.create()(AntWrappedLoginForm);
    return (
   <div className="login-container">
     <Card title="Log In">
        <div className="logn-content">
           <LoginForm />
        </div>
     </Card>
    </div>
    );
}


class AntWrappedLoginForm extends Component{
   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            Modal.success({

                title:'LogIn Success',
                content: 'You have logged in Successfully'
            });
          }
        });
    }
   
    render(){
        const {getFieldDecorator}=this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
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
        <FormItem>
          {getFieldDecorator('remember', {
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
      </Form>
        );
    }
}
export default Login;