import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import FormBase from '../components/FormBase';
import TextInput from '../components/TextInput';
import Row from '../components/Row';
import Col from '../components/Col';
import HishabLogo from './images/logo.png';
import Alert from '../components/Alert';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: "Username or password invalid",
            isError: false,
            alertType: "danger"
        };
        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.onPasswordForgotClicked = this.onPasswordForgotClicked.bind(this);
    }
    
    componentDidMount(){
        var uid = Cookies.get("uid");
        if (uid !== undefined)
            window.location.hash = "#/home";
    }
    
    onLoginClicked(event){
        event.preventDefault();
        console.log("Clicked Login");
        $.ajax({
            method: 'post',
            url: 'http://192.168.5.2:8000/api/v1/login',
            data: {
                "uphone": document.getElementById("uphone").value, 
                "upass": document.getElementById("upass").value, 
                "uid": Cookies.get("uid")
            },
            success: function(response){
                console.log(response);
                var data = $.parseJSON(response);
                Cookies.set(response.cookie);
                Cookies.set('uid', data.uid, { path: '/' });
                Cookies.set('uty', data.uty, { path: '/' });
                Cookies.set('uname', data.uname, { path: '/' });
                Cookies.set('ust', data.ust, { path: '/' });
                console.log(document.cookie);
                window.location.hash="#/home";
            },
            error: function(response){
                console.log(response.responseText);
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg});
            }.bind(this),
        });
    }
    
    onPasswordForgotClicked(event){
        event.preventDefault();
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/resetpass',
            data: {"uphone": document.getElementById("uphone").value, uid: Cookies.get("uid")},
            success: function(response){
                console.log(response);
                var data = $.parseJSON(response);
                this.setState({isError: true, message: data.msg, alertType: "success"});
            }.bind(this),
            error: function(response){
                console.log(response.responseText);
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }.bind(this),
        });
    }
    
//<form className="m-t" role="form" action="index.html">
//                    {this.state.isError == true &&
//                        <Alert message={this.state.message} type={this.state.alertType}/>
//                    }
//                    <div className="form-group">
//                        <input id="uphone" type="text" className="form-control" placeholder="Phone Number"/>
//                        <input id="upass" type="password" className="form-control" placeholder="Password"/>
//                    </div>
//                    <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.onLoginClicked}>Login</button>
//
//                    <a href="#" onClick={this.onPasswordForgotClicked}><small>Forgot password?</small></a>
//                </form>
    
    

    
    
    render(){
        return(
        <div className="gray-bg-size">
        <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
                <div>

                    <h1 className="logo-name">
                        <img src={HishabLogo}/>
                    </h1>

                </div>
                
                <h2>Welcome to <strong>Hishab</strong></h2>
                       <FormBase buttonClass="btn-primary block m-b full-width" className="m-t" formheader="Login with credentials" onClick={this.onLoginClicked}>
                    <TextInput id="uphone" type="text" placeholder="Phone Number"/>
                    <TextInput id="upass" type="password" placeholder="password"/>
                </FormBase> 
                <p className="m-t"> <small>Hishab &copy; 2017</small> </p>
            </div>
        </div>
        </div>
        );
    }
}

export default LoginPage;