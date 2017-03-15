import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import HishabLogo from './images/logo.png';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class PasswordResetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            alertType: "success",
            message: "None"
        };
        this.onChangeClicked = this.onChangeClicked.bind(this);
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    onChangeClicked(event){
        event.preventDefault();

        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                var data = $.parseJSON(response);
                this.setState({isError: true, message: data.msg, alertType: "success"});
                
                Cookies.remove('uid');
                Cookies.remove('uty');
                Cookies.remove('uname');
                Cookies.remove('ust');
                
                window.location.hash = "#/";
                window.location.reload();
            }else if (status === "error"){
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "pass": document.getElementById("passwd").value, 
                "pasc": document.getElementById("passwc").value, 
                "uid": Cookies.get("uid")
            };
        
        var ajax = new Ajax(callback);
        ajax.postData('http://app.hishab.co/api/v1/changepass', params);

    }
    
    render() {
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    <Content>
                        <div className="border-bottom page-heading">
                            <div className="col-lg-12">
                                {this.state.isError === true &&
                                    <Alert message={this.state.message} type={this.state.alertType}/>
                                }
                                <h1>First Time Login</h1>
                                <h3>Please change your auto-generated password: </h3>
                                <div className="row clearfix"></div>
                                <form className="m-t" role="form" action="index.html">
                                    
                    <div className="form-group">
                        <input id="passwd" type="password" className="form-control" placeholder="Password"/>
                        <input id="passwc" type="password" className="form-control" placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" className="btn btn-success block" onClick={this.onChangeClicked}>Change Password</button>
                    </form>
                            </div>
                        </div>
                        <div className="row">
                            
                        </div>
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

export default PasswordResetPage;