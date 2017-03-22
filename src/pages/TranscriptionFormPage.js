import React, {Component} from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import TranscriptionForm from '../components/TranscriptionForm';
import HishabLogo from './images/logo.png';
import $ from 'jquery';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


class TranscriptionFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.componentWillMount = this.componentWillMount.bind(this);

        this.TRANSACTION_DATA = "data";
        this.TRANSACTION_TYPE = "tty"

        this.TRANSACTION_ID = "tid"
        this.TRANSACTION_STATUS = "tst"
        this.CALLER_NAME = "cin"
        this.TARGET_NAME = "tin"

        this.CALL_AUDIO = "cau"
        this.CALL_TIME = "cti"

        this.STATIC_DATA = "sda"
        this.PRODUCT_DATA = "pda"

        this.PARAM_KEY = 'key'
        this.PARAM_VALUE = 'value'
        this.PARAM_PRODUCT_NAME = 'product_name'
        this.PARAM_PRODUCT_ID = 'product_id'
        this.PARAM_PRODUCT_UNIT_PRICE = 'product_unit_price'
        this.PARAM_PRODUCT_QUANTITY = 'product_quantity'
        this.PARAM_PRODUCT_DISCOUNT = 'product_discount'
        this.PARAM_PRODUCT_COMPLIMENTARY_QUANTITY = 'product_complementary_quantity'
        this.PARAM_ATTRIBUTES = 'attributes'
    }
    
    componentWillMount(){
        var callback = function(response, status){
            if (status == "success"){
                var data = new Json(response);
                this.setState({
                    data: data.get(this.TRANSACTION_DATA),
                });            
            }
        }.bind(this);
        
        var params = new Json();
        params.addParam("uid", Cookies.get("uid"));
        params.addParam(this.TRANSACTION_ID, this.props.transId);
        
        var ajax = new Ajax(callback);
        ajax.getData('forms/get/transaction', params.getData());

    }
        
    
    
    render(){
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Transcription for {this.props.callType} </h1>
                        <TranscriptionForm transId={this.props.transId} data={this.state.data} startTime={this.state.startTime}/>
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

export default TranscriptionFormPage;