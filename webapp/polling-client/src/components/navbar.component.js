import React from "react";

import { Layout, Menu ,Icon} from 'antd';
import {NavLink} from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;


const NavBar=() => {

    return(
<Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
        <Menu.Item key="2"><NavLink to="/about">About Us</NavLink></Menu.Item>
        <Menu.Item key="3"><NavLink to="/contact">Contact Us</NavLink></Menu.Item>
       
       <SubMenu title={<span><Icon type="setting" />Account</span>}>
            <Menu.Item key="setting:1"><NavLink to="/login">Sign In</NavLink></Menu.Item>
            <Menu.Item key="setting:2"><NavLink to="/register">Register</NavLink></Menu.Item>
        </SubMenu>

      </Menu>
    </Header>
 </Layout>
    );
}

export default NavBar;