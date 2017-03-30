import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import SMSLog from '../components/SMSLog';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import HishabLogo from './images/logo.png';
import example from './example.json';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


class SMSLogPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "01737233902",
            uid: "",            
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
                        <SMSLog />
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

export default SMSLogPage;