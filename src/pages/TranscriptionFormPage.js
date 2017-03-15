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
        this.state = {
            data : "",
            cty : "",
            phone : "",
            audio : ""
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount(){
        
        var callback = function(response, status){
            var data = new Json(response);
            // var data = $.parseJson(response);
            if (status === "success"){
                this.setState({
                    data: data.getData(),
                    cty: data.get('cty'),
                    phone: data.get('phone'),
                    audio: data.get('audio')
                });
            }else if (status === "error"){
                
            }
        }.bind(this);
        
        var params = {"uid": Cookies.get("uid"),"tid": this.props.transId};
        
        var ajax = new Ajax(callback);
        ajax.getData('http://192.168.5.2:8000/api/v1/transaction/details', params);
        
    }
    
    render(){
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Transcription for {this.props.callType} </h1>    
                        <TranscriptionForm transId={this.props.transId} data={this.state.data} cty={this.state.cty} phone={this.state.phone} audio={this.state.audio}/>
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