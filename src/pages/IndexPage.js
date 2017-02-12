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
            items : []
        };
    }
    
    componentDidMount(){
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transcriber/call/count',
            data: {
                "uid": Cookies.get("uid"),
            },
            success: function(response){
                var data = $.parseJSON(response);
                console.log(response);
                this.setState({items: data.data});
            }.bind(this),
            error: function(response){
                console.log(response);
            }
        });
    }
    
    typeClickHandler(key){
        console.log("entered");
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transcriber/call/list',
            data: {
                "uid": Cookies.get("uid"),
                "cty": key,
            },
            success: function(response){
                var data = $.parseJSON(response);
                console.log(response);
            }.bind(this),
            error: function(response){
                console.log(response);
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
                        <TypeList items = {this.state.items} onClick = {this.typeClickHandler}/>
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