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
    
    render(){
        return(

            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Registration </h1>    
                        <RegistrationForm />
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