import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import HishabLogo from './images/logo.png';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


class RegistrationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
        var TRANSACTION_ID = "tid";

        var TRANSACTION_STATUS = "tst";
        var CALLER_NAME = "cin";
        var CALL_AUDIO = "cau";
        var CALL_TIME = "cti";

        var STATIC_DATA = "sda";
        var USER_DATA = "uda";

        var USER_NAME = "una";
        var USER_ADDRESS = "uad";
        var USER_ORGANIZATION = "uor";

        var ORGANIZATION_ID = "oid";
        var ORGANIZATION_NAME = "ona";
    }
    
    componentDidMount(){

        //static data from server
        var callback = function(response, status){
            if (status == "success"){
                var data = new Json(response);
                this.setState({
                    audio: data.getData().audio,
                    phone: data.getData().phone
                });            
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('transaction/details', params);


        //user data from server
        var callback = function(response, status){
            if (status == "success"){
        
            }else if (status == "error"){
        
            }
        }.bind(this);
        
        var params = {
            "tid": this.props.transId
        };
        
        var ajax = new Ajax(callback);
        ajax.getData('forms/get/registration', params);


    }
    
    render(){
        return(

            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Registration </h1>    
                        <RegistrationForm transId={this.props.transId} audio={this.state.audio} phone={this.state.phone}/>
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

export default RegistrationFormPage;