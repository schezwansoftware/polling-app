import React,{Component} from 'react';
import LoadingIndicator from '../commons/loading-indicator';
import { getAllPosts } from '../services/posts.service';
import { List, Avatar, Layout, Card } from 'antd';
import './styles/css/main.css';

export default class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            isLoading: false,
            posts: []
        }
    }

    loadAllPosts(){
        this.setState({
            isLoading : true
        });
        getAllPosts().then(res=>{
            this.setState({
                isLoading: false,
                posts: res
            });
        });

    }

    componentWillMount(){
        this.loadAllPosts();
    }

    render(){
        if(this.state.isLoading){
            return <LoadingIndicator />
        }
        return (
        <Layout className="container">
            <Card>
                 <div className="container">
                    <List
                       className="demo-loadmore-list"
                       itemLayout="horizontal"
                       dataSource={this.state.posts}
                       renderItem={item => (
                     <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                          <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={item.body}/>
                     </List.Item>
        )}/>
                </div>    
            </Card>
        </Layout>
        );
    }
}

