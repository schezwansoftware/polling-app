import React,{Component} from "react";

import { Layout, Menu ,Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import {logout} from '../services/posts.service';
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
    if(e.key === 'logout'){
      this.props.onLogout();
    }
  }

  render(){

    let menuItems=[];

    if(!this.props.isAuthenticated){
      menuItems=[
        <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>,
        <Menu.Item key="2"><NavLink to="/about">About Us</NavLink></Menu.Item>,
        <Menu.Item key="3"><NavLink to="/contact">Contact Us</NavLink></Menu.Item>,
       
       <SubMenu key="4" title={<span><Icon type="setting" />Account</span>}>
            <Menu.Item key="setting:1"><NavLink to="/login">Sign In</NavLink></Menu.Item>
            <Menu.Item key="setting:2"><NavLink to="/register">Register</NavLink></Menu.Item>
        </SubMenu>
      ];
    }else{
      menuItems = [
          <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>,
          <SubMenu key="4" title={<span><Icon type="user" />Profile</span>}>
            <Menu.Item key="setting:1"><NavLink to="/profile"><span><Icon type="user"></Icon>{this.props.principal.userName}</span></NavLink></Menu.Item>
            <Menu.Item key="logout">><span><Icon type="logout"></Icon>Logout</span></Menu.Item>
        </SubMenu>
      ];
    }
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
        {menuItems}
            </Menu>
          </Header>
       </Layout>
          );
  }
}

export default NavBar;