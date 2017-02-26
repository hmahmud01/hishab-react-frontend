import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TranscriptionPage from './TranscriptionPage';
import UserPage from './UserPage';
import ReportPage from './ReportPage'
import PasswordResetPage from './PasswordResetPage';

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
    }
    
    componentDidMount() {
        document.body.classList.remove("gray-bg-size");   
        console.log("Entered Mount State");
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        var ust = Cookies.get("ust");
        console.log(ust);
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
                this.setState( {location:  "#/user", userType: 0});
                break;
            case '1':
                this.setState( {location:  "#/user", userType: 1});
                break;
            case '2':
                this.setState( {location:  "#/orgs", userType: 2});
                break;
            case '3':
                this.setState( {location:  "#/tran", userType: 3});
                break;
            default:
                this.setState( {location:  "#/user", userType: 4});
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
                    <ReportPage />
                );
            case "#/tran":    
                return(
                    <TranscriptionPage/>
                );
            case "#/reset":
                return(
                    <PasswordResetPage/>
                );        
            default:
                return(
                    <TranscriptionPage/>
                );
        }
    }
}

export default IndexPage;