import React,{Component} from 'react';
import { Layout } from 'antd';
import {getCurrentUser} from '../services/posts.service';
import './styles/css/main.css';

export default class Home extends Component{


    componentWillMount(){
        this.loadCurrentUser();
    }

    loadCurrentUser(){
        getCurrentUser().then(response => {
            console.log(response);
        });
    }
    render(){
        return (
        <Layout className="container">
        </Layout>
        );
    }
}

