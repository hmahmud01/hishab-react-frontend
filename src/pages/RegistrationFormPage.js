import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import HishabLogo from './images/logo.png';


class RegistrationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    componentDidMount(){
        $.ajax({
            method: 'get',
            url: 'http://app.hishab.co/api/v1/transaction/details',
            data: {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            },
            success: function(response) {
                var data = $.parseJSON(response);
                this.setState({
                    audio: data.audio,
                    phone: data.phone
                });
            }.bind(this),
            error: function(response){
            }
        });
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