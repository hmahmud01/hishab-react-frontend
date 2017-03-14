import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import TranslationForm from '../components/TranslationForm';
import HishabLogo from './images/logo.png';


class TranslationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            audio: "",
            phone: ""
        };
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        $.ajax({
            method: 'get',
            url: 'http://app.hishab.co/api/v1/translation/details',
            data: {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            },
            success: function(response) {
                var data = $.parseJSON(response);
                this.setState({
                    audio: "http://app.hishab.co"+data.audio,
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
                    <h1> Translation </h1>    
                        <TranslationForm tid={this.props.transId} audio={this.state.audio} phone={this.state.phone}/>
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

export default TranslationFormPage;