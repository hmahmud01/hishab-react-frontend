import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import HishabLogo from './images/logo.png';
import TypeList from '../components/TypeList.js';
import CallList from '../components/CallList.js';

class IndexPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            items : [],
        };
    }
    
    componentDidMount(){
        this.setState({uid: Cookies.get('uid')});
        $.ajax({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v1/index/typeitems',
            data: {
                "uid": this.state.uid,
            },
            success: function(response){
                var data = $.parseJSON(response);
                this.setState({items: data});
            },
            error: function(response){
                
            }
        });
    }
    
    render(){
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header/>
                    <Content>
                        <TypeList items = {this.state.items}/>
                        <CallList/>
                    </Content>
                    <Footer/>
                </ContentWrapper>
            </div>
        );
    }
}

class ContentWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <div id="page-wrapper" className="gray-bg">
                {this.props.children}
            </div>
        );
    }
}

export default IndexPage;