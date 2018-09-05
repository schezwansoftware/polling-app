import React,{Component} from "react";

import { Layout, Menu ,Icon} from 'antd';
import {NavLink,withRouter} from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;


class NavBar extends Component {

  constructor(props){
    super(props);
    
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
        <Menu.Item key="/"><NavLink to="/"><Icon type="home"/>Home</NavLink></Menu.Item>,
        <Menu.Item key="/about"><NavLink to="/about">About Us</NavLink></Menu.Item>,
        <Menu.Item key="/contact"><NavLink to="/contact">Contact Us</NavLink></Menu.Item>,
       
       <SubMenu key="4" title={<span><Icon type="setting" />Account</span>}>
            <Menu.Item key="/login"><NavLink to="/login">Sign In</NavLink></Menu.Item>
            <Menu.Item key="/register"><NavLink to="/register">Register</NavLink></Menu.Item>
        </SubMenu>
      ];
    }else{
      menuItems = [
          <Menu.Item key="/"><NavLink to="/"><Icon type="home"></Icon>Home</NavLink></Menu.Item>,
          <Menu.Item key="/create-poll"><NavLink to="/create-poll"><Icon type="plus-square"></Icon>Create Poll</NavLink></Menu.Item>,
          <SubMenu key="4" title={<span><Icon type="user" />Profile</span>}>
            <Menu.Item key="/profile"><NavLink to="/profile"><span><Icon type="user"></Icon>{this.props.principal.userName}</span></NavLink></Menu.Item>
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
              selectedKeys={[this.props.location.pathname]}
              onClick={this.handleMenuClick}
            >
        {menuItems}
            </Menu>
          </Header>
       </Layout>
          );
  }
}

export default withRouter(NavBar);