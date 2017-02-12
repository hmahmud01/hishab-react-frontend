import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TranscriptionPage from './TranscriptionPage';
import UserPage from './UserPage';

class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            location : "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        console.log("Entered Mount State");
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        var uty = Cookies.get("uty");
        switch (uty){
            case '0':
                this.setState( {location:  "#/user"});
                break;
            case '1':
                this.setState( {location:  "#/user"});
                break;
            case '2':
                this.setState( {location:  "#/orgs"});
                break;
            case '3':
                this.setState( {location:  "#/tran"});
                break;
            default:
                this.setState( {location:  "#/user"});
                break;
        }
        
    }
    
    render() {
        switch (this.state.location){
            case "#/user":
                return(
                    <UserPage/>
            );
            case "#/tran":    
                return(
                    <TranscriptionPage/>
                );
            default:
                return(
                    <TranscriptionPage/>
                );
        }
    }
}

export default IndexPage;