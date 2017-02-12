import React, {Component} from 'react';

class LeftNav extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
<nav className="navbar-default navbar-static-side" role="navigation">
  <div className="sidebar-collapse">
    <NavbarNavPanel>
        <NavbarHeader logo={this.props.logo}/>
        <NavbarNavLinks>
            <i className="fa fa-th-large"></i> 
            <span className="nav-label">Dashboard</span>
        </NavbarNavLinks>
    </NavbarNavPanel>
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
        const imgStyle = {
            width: "100%"
        };
        return (
    <li className="nav-header">
        <div className="dropdown profile-element"> 
            <img src={this.props.logo} style={imgStyle}/>
            <h2 className="text-center">Hishab</h2>
        </div>
        <div className="logo-element">
            <img src={this.props.logo} style={imgStyle}/>
            <h5 className="text-center">Hishab</h5>
        </div>
    </li>
    );
    }
}

class NavbarNavPanel extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
      <ul className="nav metismenu" id="side-menu">
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
            <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>
        </li>
        );
    }
}

//class NavbarDropdown extends Component {
//    constructor(props){
//        super(props);
//        this.state = {};
//    }
//    
//    render(){
//        return (
//        <li className="dropdown">
//          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.title} <span className="caret"></span></a>
//          <ul className="dropdown-menu">
//            {this.props.children}
//          </ul>
//        </li>
//        );
//    }
//}

export default LeftNav;