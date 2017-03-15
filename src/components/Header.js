import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Ajax from '../utils/Ajax';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    
    logout(){
        
        var callback = function(response, status){
            if (status == "success"){
                
            }else if (status == "error"){
                
            }
            Cookies.remove('uid');
            Cookies.remove('uty');
            Cookies.remove('uname');
            Cookies.remove('ust');
            window.location.hash="#/";
        }
        
        var params = {
            uid: Cookies.get('uid')
        };
        
        var ajax = new Ajax(callback);
        ajax.getData('logout', params)
        
    }

    onBack(){
        window.location.reload();
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
        this.onBack = this.onBack.bind(this);
    }
    
    handleClick(event){
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
    }

    onBack(){
        window.location.reload();
    }
    
    render(){
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-minimalize minimalize-styl-2 btn btn-sm btn-info" onClick={this.onBack}>Back</button>            
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