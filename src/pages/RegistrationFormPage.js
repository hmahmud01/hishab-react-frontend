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
        
        this.TRANSACTION_ID = "tid";
        this.TRANSACTION_DATA = "data";

        this.TRANSACTION_STATUS = "tst";
        this.CALLER_NAME = "cin";
        this.CALL_AUDIO = "cau";
        this.CALL_TIME = "cti";

        this.STATIC_DATA = "sda";
        this.USER_DATA = "uda";

        this.USER_NAME = "una";
        this.USER_ADDRESS = "uad";
        this.USER_ORGANIZATION = "uor";

        this.ORGANIZATION_ID = "oid";
        this.ORGANIZATION_NAME = "ona";
    }
    
    componentDidMount(){

        //static data from server
        var callback = function(response, status){
            if (status == "success"){
                var data = new Json(response);
                this.setState({
                    data: data.get(this.TRANSACTION_DATA)
                });            
            }
        }.bind(this);
        
        var params = new Json();
        params.addParam("uid", Cookies.get("uid"));
        params.addParam(this.TRANSACTION_ID, this.props.transId);
        
        var ajax = new Ajax(callback);
        ajax.getData('forms/get/registration', params.getData());

    }
    
    render(){
        return(

            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Registration </h1>    
                        <RegistrationForm transId={this.props.transId} data={this.state.data}/>
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