import React, {Component} from 'react';
import Cookies from 'js-cookie';
import TranscriptionPage from './TranscriptionPage';
import UserPage from './UserPage';
import ReportPage from './ReportPage'
import SystemAdminPage from './SystemAdminPage';
import PasswordResetPage from './PasswordResetPage';
import akij from './akij';
import Logger from '../utils/Logger'

class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            location : "",
            userType: 0,
            userStatus: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.reRoute = this.reRoute.bind(this);
        this.log = new Logger();

    }
    
    componentDidMount() {
        document.body.classList.remove("gray-bg-size");   
        document.body.classList.add("mini-navbar");
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        var ust = Cookies.get("ust");
        if (ust === "false"){
            this.setState({location: "#/reset"});
        }else{
            this.reRoute();
        }
    }
    
    reRoute(){
        var uty = Cookies.get("uty");
        switch (uty){
            case '0':
                this.setState({location:  "#/user", userType: 0});
                break;
            case '1':
                this.setState({location:  "#/user", userType: 1});
                break;
            case '2':
                this.setState({location:  "#/orgs", userType: 2});
                break;
            case '3':
                this.setState({location:  "#/tran", userType: 3});
                break;
            case '4':
                this.setState({location:  "#/sysa", userType: 4});
                this.log.debug(uty);
                break;
            default:
                this.setState({location:  "#/user", userType: 4});
                this.log.debug("default");
                this.log.debug(uty);
                break;
        }
    }
    
    render() {
        switch (this.state.location){
            case "#/user":
                var username = Cookies.get("uname");
                return(
                    <UserPage type={this.state.userType} name={username}/>
            );
            case "#/orgs":
                return (
                    <UserPage />
                );
            case "#/sysa":
                return (
                    <SystemAdminPage />
                );
            case "#/tran":    
                return(
                    <TranscriptionPage />
                );
            case "#/reset":
                return(
                    <PasswordResetPage />
                ); 
            default:
                return(
                    <TranscriptionPage />
                );
        }
    }
}

export default IndexPage;