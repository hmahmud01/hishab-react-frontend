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
    }
    
    componentDidMount(){
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
        ajax.getData('http://192.168.5.2:8000/api/v1/transaction/details', params);


        // $.ajax({
        //     method: 'get',
        //     url: 'http://192.168.5.2:8000/api/v1/transaction/details',
        //     data: {
        //         "uid": Cookies.get("uid"),
        //         "tid": this.props.transId,
        //     },
        //     success: function(response) {
        //         var data = $.parseJSON(response);
        //         this.setState({
        //             audio: data.audio,
        //             phone: data.phone
        //         });
        //     }.bind(this),
        //     error: function(response){
        //     }
        // });
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