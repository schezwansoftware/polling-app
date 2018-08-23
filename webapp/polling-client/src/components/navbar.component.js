import React from "react";

import { Layout, Menu ,Icon} from 'antd';

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
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact Us</Menu.Item>
       
       <SubMenu title={<span><Icon type="setting" />Account</span>}>
            <Menu.Item key="setting:1">Sign In</Menu.Item>
            <Menu.Item key="setting:2">Register</Menu.Item>
        </SubMenu>

      </Menu>
    </Header>
 </Layout>
    );
}

export default NavBar;