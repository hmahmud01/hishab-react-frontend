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
        this.state = {
            response : ""
        };
        this.createMarkup = this.createMarkup.bind(this);
    }
    
    createMarkup() {
        return {__html: this.state.response};
    }
    
    componentDidMount(){
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/get/form/user',
            success: function(response){

                this.setState({response: response});
            }.bind(this),
            error: function(response){
                console.log(response.responseText);
            }.bind(this)
        })
    }
    
    render(){
        return(

            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Registration </h1>                   
                        <form className="" role="form" >
                            
                            <div className="form-group dynamic-forms" dangerouslySetInnerHTML={this.createMarkup()}>
                            </div>
                        </form>
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