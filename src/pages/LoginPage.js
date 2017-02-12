import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import HishabLogo from './images/logo.png';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
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
                console.log(document.cookie);
                window.location.hash="#/home";
            },
            error: function(response){
                console.log(response);
                var data = $.parseJSON(response);
                alert(data.msg);
            },
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
                alert(data.msg)
            },
            error: function(response){
                console.log(response);
                var data = $.parseJSON(response);
                alert(data.msg);
            },
        });
    }
    
    render(){
        const bodyStyle = {
          height: window.innerHeight  
        };
        return(
        <div className="gray-bg" style={bodyStyle}>
        <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
                <div>

                    <h1 className="logo-name">
                        <img src={HishabLogo}/>
                    </h1>

                </div>
                
                <h2>Welcome to <strong>Hishab</strong></h2>
                <p>Login with credentials</p>
                <form className="m-t" role="form" action="index.html">
                    <div className="form-group">
                        <input id="uphone" type="text" className="form-control" placeholder="Phone Number"/>
                        <input id="upass" type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.onLoginClicked}>Login</button>

                    <a href="#" onClick={this.onPasswordForgotClicked}><small>Forgot password?</small></a>
                </form>
                <p className="m-t"> <small>Hishab &copy; 2017</small> </p>
            </div>
        </div>
        </div>
        );
    }
}

export default LoginPage;