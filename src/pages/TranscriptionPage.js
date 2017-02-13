import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import HishabLogo from './images/logo.png';
import TypeList from '../components/TypeList';
import CallList from '../components/CallList';
import Alert from '../components/Alert';

class TranscriptionPage extends Component {
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
            hasAlert: false,
            alertType: "danger",
            alertMessage: "Sample Alert"
        };
        this.typeClickHandler = this.typeClickHandler.bind(this);
        this.callItemClickHandler = this.callItemClickHandler.bind(this);
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transcriber/call/count',
            data: {
                "uid": Cookies.get("uid"),
            },
            success: function(response) {
                var data = $.parseJSON(response);
                console.log(response);
                this.setState({items: data.data});
            }.bind(this),
            error: function(response) {
                console.log(response.responseText);
            }
        });
    }
    
    typeClickHandler(key, title) {
        console.log("entered");
        this.setState({title: title});
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transcriber/call/list',
            data: {
                "uid": Cookies.get("uid"),
                "cty": key,
            },
            success: function(response) {
                var data = $.parseJSON(response);
                if (data.length < 1)
                    this.setState({hasAlert:true, 
                                   alertMessage: "No Data Available", 
                                   alertType: "warning"});
                else
                    this.setState({callItems: data, hasAlert:false});
                console.log(response);
            }.bind(this),
            error: function(response){
                console.log(response);
            }
        });
    }
    
    callItemClickHandler(key, type) {
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction',
            data: {
                "uid": Cookies.get("uid"),
                "tid": key,
            },
            success: function(response) {
                console.log(response);
                var data = $.parseJSON(response);
                this.setState({callItems: data});
                console.log(response);
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
        });
    }
    
    render() {
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    <Content>
                        {this.state.hasAlert === true &&
                            <Alert type={this.state.alertType} message={this.state.alertMessage}/>
                        }
                        <TypeList items = {this.state.items} onClick = {this.typeClickHandler}/>
                        <CallList title={this.state.title} items={this.state.callItems} onClick = {this.callItemClickHandler}/>
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

export default TranscriptionPage;