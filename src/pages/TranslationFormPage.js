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
import Logger from '../utils/Logger';


class TranslationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        
        this.log = new Logger();
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";

        var callback = function(response, status){
            if (status == "success"){
                // Json util not workin 
                var data = new Json(response);
                
                this.log.debug(data.getData());
                
                this.setState({
                    audio: data.get('audio'),
                    phone: data.get('phone')
                });
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('translation/details', params);
    }
    
    render(){
        this.log.debug(this.state.audio);
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