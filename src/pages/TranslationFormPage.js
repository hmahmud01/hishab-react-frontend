import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import TranslationForm from '../components/TranslationForm';
import HishabLogo from './images/logo.png';


class TranslationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            "caller": "010012",
        };
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    render(){
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Translation </h1>    
                        <TranslationForm caller={this.state.caller}/>
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