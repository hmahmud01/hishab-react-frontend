import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        console.log("Hello");
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/logout',
            data: {
                uid: Cookies.get('uid')
            },
            success: function(response){
                console.log(response);
                Cookies.remove('uid');
                Cookies.remove('uty');
                Cookies.remove('uname');
                Cookies.remove('ust');
                console.log(document.cookie);
                window.location.hash="#/";
            },
            error: function(status, response){
                if (status === 400)
                    Cookies.remove("uid")
                console.log(response);
                var data = $.parseJSON(response);
                alert(data.msg);
            },
        });
    }
    
    render(){
        const divStyle = {
            marginBottom: "0",
        };
        return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top white-bg" role="navigation" style={divStyle}>
                <LeftNavCollapser/>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <span className="m-r-sm text-muted welcome-message">Welcome {this.props.username}</span>
                    </li>
                    <TopNavLinks onClick={this.logout}>
                        <i className="fa fa-sign-out"></i>
                        <span>LogOut</span>
                    </TopNavLinks>
                </ul>

            </nav>
        </div>
        );
    }
}

class LeftNavCollapser extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
    }
    
    render(){
        return (
            <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#" onClick={this.handleClick}>
                <i className="fa fa-bars"></i> 
            </a>
        </div>
        );
    }
}

class TopNavLinks extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive : props.isActive
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => 
                      ({isActive: !prevState.isActive}));
        console.log(this.props);
        this.props.onClick();
    }
    
    render(){
        return (
        <li className={this.state.isActive? "active" : ""}>
            <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>
        </li>
        );
    }
}

export default Header;