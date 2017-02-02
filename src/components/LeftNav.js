import React, {Component} from 'react';

class LeftNav extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
<nav className="navbar navbar-default navbar-fixed-left">
  <div className="container-fluid">
    <NavbarHeader text="Hishab" href="#/"/>   
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <NavbarNavPanel align="left">
            <NavbarNavLinks isActive={false} value="Home" href="#"/>
            <NavbarDropdown title="Reports">
                <NavbarNavLinks isActive={false} value="Some Link" href="#/dashboard"/>
                <NavbarNavLinks isActive={false} value="Some Other Link" href="#/dashboard"/>
            </NavbarDropdown>
        </NavbarNavPanel>
        <NavbarNavPanel align="right">
            <NavbarDropdown title="Profile">
                <NavbarNavLinks isActive={true} value="Profile Settings" href="#/profile/settings"/>
                <NavbarNavLinks isActive={false} value="Logout" href="#/logout"/>
            </NavbarDropdown>
        </NavbarNavPanel>
    </div>
  </div>
</nav>
        );
    }
}

class NavbarHeader extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Open Navigator</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href={this.props.href}>{this.props.text}</a>
    </div>
    );
    }
}

class NavbarNavPanel extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        var alignment = "nav navbar-nav navbar-"+this.props.align;
        return(
      <ul className={alignment}>
        {this.props.children}
      </ul>  
    );
    }
}

class NavbarNavLinks extends Component{
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
    }
    
    render(){
        return (
        <li className={this.state.isActive? "active" : ""}>
            <a href={this.props.href} onClick={this.handleClick}>{this.props.value}</a>
        </li>
        );
    }
}

class NavbarDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.title} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            {this.props.children}
          </ul>
        </li>
        );
    }
}

export default LeftNav;