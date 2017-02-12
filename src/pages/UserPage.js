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

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            callItems : [
                {id: 1,caller: "Sadat", time: "12:24 PM", type: "REG"},
                {id: 2, caller: "Hasan", time: "12:30 PM", type: "PRD"},
                {id: 3, caller: "Shovan", time: "12:36 PM", type: "DUE"}
            ],
            title: "",
        };
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    render() {
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    <Content>
                        
                    </Content>
                    <Footer/>
                </ContentWrapper>
            </div>
        );
    }
}

class ContentWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div id="page-wrapper" className="gray-bg">
                {this.props.children}
            </div>
        );
    }
}

export default UserPage;