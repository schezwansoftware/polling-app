import React,{Component} from "react";

import { Layout, Menu ,Icon} from 'antd';
import {NavLink} from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;


class NavBar extends Component {

  constructor(props){
    super(props);
    this.state={
      current: '1'
    }

    this.handleMenuClick=this.handleMenuClick.bind(this);
  }

  handleMenuClick(e){
    this.setState({
      current : e.key  
    })
  }

  render(){
    return(
      <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
              selectedKeys={[this.state.current]}
              onClick={this.handleMenuClick}
            >
              <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
              <Menu.Item key="2"><NavLink to="/about">About Us</NavLink></Menu.Item>
              <Menu.Item key="3"><NavLink to="/contact">Contact Us</NavLink></Menu.Item>
             
             <SubMenu key="4" title={<span><Icon type="setting" />Account</span>}>
                  <Menu.Item key="setting:1"><NavLink to="/login">Sign In</NavLink></Menu.Item>
                  <Menu.Item key="setting:2"><NavLink to="/register">Register</NavLink></Menu.Item>
              </SubMenu>
      
            </Menu>
          </Header>
       </Layout>
          );
  }
}

export default NavBar;