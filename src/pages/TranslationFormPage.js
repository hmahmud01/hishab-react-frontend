import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import TranslationForm from '../components/TranslationForm';
import HishabLogo from './images/logo.png';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


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

        var callback = function(response, status){
            if (status == "success"){
                // Json util not workin 
                var data = $.parseJSON(response);
                this.setState({
                    audio: "http://192.168.5.2:8000"+data.audio,
                    phone: data.phone
                });
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('http://192.168.5.2:8000/api/v1/translation/details', params);

        // $.ajax({
        //     method: 'get',
        //     url: 'http://192.168.5.2:8000/api/v1/translation/details',
        //     data: {
        //         "uid": Cookies.get("uid"),
        //         "tid": this.props.transId,
        //     },
        //     success: function(response) {
        //         var data = $.parseJSON(response);
        //         this.setState({
        //             audio: "http://192.168.5.2:8000"+data.audio,
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