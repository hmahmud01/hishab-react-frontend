import React, {Component} from 'react';
import Cookies from 'js-cookie';
import FormBase from '../components/FormBase';
import TextInput from '../components/TextInput';
import HishabLogo from './images/logo.png';
import Alert from '../components/Alert';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

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
        document.body.classList.add("gray-bg-size");        
        var uid = Cookies.get("uid");
        if (uid !== undefined)
            window.location.hash = "#/home";
    }


    onLoginClicked(event){
        event.preventDefault();
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                Cookies.set(response.cookie);
                Cookies.set('uid', data.get('uid'), { path: '/' });
                Cookies.set('uty', data.get('uty'), { path: '/' });
                Cookies.set('uname', data.get('uname'), { path: '/' });
                Cookies.set('ust', data.get('ust'), { path: '/' });
                window.location.hash="#/home";
            }else if (status === "error"){
                console.log("Error");
                this.setState({isError: true, message: data.get('msg'), alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "uphone": document.getElementById("uphone").value, 
                "upass": document.getElementById("upass").value, 
                "uid": Cookies.get("uid")
            };
                
        var ajax = new Ajax(callback);
        ajax.postData('http://app.hishab.co/api/v1/login', params);
    }
    
    onPasswordForgotClicked(event){
        event.preventDefault();
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({isError: true, message: data.get('msg'), alertType: "success"});
            }else if (status === "error"){
                this.setState({isError: true, message: data.get('msg'), alertType: "danger"});
            }
        }.bind(this);
        
        var params = {"uphone": document.getElementById("uphone").value, uid: Cookies.get("uid")}
        
        var ajax = new Ajax(callback);
        ajax.getData('http://app.hishab.co/api/v1/resetpass', params);
    }
    
    render(){
        return(
        <div className="gray-bg-size">
        <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
                <div>

                    <h1 className="logo-name">
                        <img src={HishabLogo} role="presentation"/>
                    </h1>

                </div>
                
                <h2>Welcome to <strong>Hishab</strong></h2>
                <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                    <FormBase buttonClass="btn-primary block m-b full-width" className="m-t" formheader="Login with credentials" onClick={this.onLoginClicked}>
                        <TextInput id="uphone" type="text" placeholder="Phone Number"/>
                        <TextInput id="upass" type="password" placeholder="password" onClick={this.onLoginClicked}/>
                </FormBase> 
                <a href="#" onClick={this.onPasswordForgotClicked}><small>Forgot password?</small></a>
                <p className="m-t"> <small>Hishab &copy; 2017</small> </p>
            </div>
        </div>
        </div>
        );
    }
}

export default LoginPage;