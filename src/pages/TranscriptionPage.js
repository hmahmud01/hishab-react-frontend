import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import RegistrationFormPage from './RegistrationFormPage';
import TranscriptionFormPage from './TranscriptionFormPage'
import TranslationFormPage from './TranslationFormPage';
import RevisionFormPage from './RevisionFormPage';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import HishabLogo from './images/logo.png';
import TypeList from '../components/TypeList';
import CallList from '../components/CallList';
import Alert from '../components/Alert';

import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


class TranscriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            callItems : [
                {id: 1, caller: "Sadat", time: "12:24 PM", type: "REG"},
                {id: 2, caller: "Hasan", time: "12:30 PM", type: "PRD"},
                {id: 3, caller: "Shovan", time: "12:36 PM", type: "DUE"}
            ],
            title: "",
            hasAlert: false,
            alertType: "danger",
            alertMessage: "Sample Alert",
            location : "#/",
            transId : "",
            callType: ""
        };
        this.typeClickHandler = this.typeClickHandler.bind(this);
        this.callItemClickHandler = this.callItemClickHandler.bind(this);
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.typeClickHandler(data.get('data')[1].callType, "Transcriptions");
                this.setState({items: data.get('data')});
            }else if (status === "error"){
                // todo: Create error alert
            }
        }.bind(this);
        
        var params = {"uid": Cookies.get("uid")};
        
        var ajax = new Ajax(callback);
        ajax.getData('http://app.hishab.co/api/v1/get/call/count', params);
        
        
        window.autoInterval = setInterval(
            ajax.getData('http://app.hishab.co/api/v1/get/call/count', params), 
            30000);
    }
    
    componentWillUnmount(){
        window.clearInterval(window.autoInterval);
    }
    
    typeClickHandler(key, title) {
        this.setState({title: title});
        
        var callback = function(response, status){
            if (status === "success"){
                var data = $.parseJSON(response);
                if (data.length < 1)
                    this.setState({hasAlert:true, alertMessage: "No Data Available", alertType: "warning",callItems: data});
                else
                    this.setState({callItems: data, hasAlert:false});
            }else if (status === "error"){
                this.setState({hasAlert:true, alertMessage: "No Data Available", alertType: "danger",callItems: data});
            }
        }.bind(this);
        
        var params = {"uid": Cookies.get("uid"),"cty": key};
        
        var ajax = new Ajax(callback);
        ajax.getData('http://app.hishab.co/api/v1/get/transaction/list', params);
    }
    
    callItemClickHandler(key, type) {
        if (type >= 100){
            this.setState({location: "#/translation", transId: key});
            window.location.hash = "#/translation";
        }else if (type === "0"){
            this.setState({location: "#/register", transId: key});
            window.location.hash = "#/register";
        }else if (type === "1"){
            this.setState({location: "#/transcription", transId: key, callType: "Buy"});
            window.location.hash = "#/transcription";
        }else if (type === "2"){
            this.setState({location: "#/transcription", transId: key, callType: "Sell"});
            window.location.hash = "#/transcription";
        }else{
            this.setState({location: "#/transcription", transId: key});
            window.location.hash = "#/transcription";
        }
    }
    
    render() {
        switch (this.state.location){
            case "#/register":
                return(
                    <RegistrationFormPage transId={this.state.transId}/>
                );
            case "#/transcription":
                return(
                    <TranscriptionFormPage transId={this.state.transId} callType={this.state.callType}/>
                );
            case "#/translation":
                return(
                    <TranslationFormPage transId={this.state.transId}/>
                );
            case "#/revision":
                return(
                    <RevisionFormPage transId={this.state.transId}/>
                );
            default:
                return(
                <div className="wrapper">
                    <LeftNav logo={HishabLogo}/>
                    <ContentWrapper>
                        <Header username={Cookies.get("uname")}/>
                        <Content>
                            <Alert isVisible={this.state.hasAlert} type={this.state.alertType} message={this.state.alertMessage}/>
                            <TypeList items={this.state.items} onClick={this.typeClickHandler}/>
                            <CallList title={this.state.title} items={this.state.callItems} onClick={this.callItemClickHandler}/>
                        </Content>
                        <Footer/>
                    </ContentWrapper>
                </div>
                );
        }
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