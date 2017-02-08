import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: window.location.hash,
            loggedIn: false
        }
        this.onRouteChange = this.onRouteChange.bind(this);
    }
    
    
    /** One time fire call. Will ensure that the hash change is being listened to */
    componentDidMount(){
        window.addEventListener("hashchange", this.onRouteChange);
        var loggedIn = Cookies.get('uid');
        if (loggedIn !== undefined || loggedIn !== ''){
            this.setState({loggedIn: true})
            window.location.hash = '#/home';
        }
        else if (window.location.hash === '' || window.location.hash === undefined){
                window.location.hash = "#/";
        }
    }

    /** Every time the hash value is changed, this function will be called */
    onRouteChange(){
        if (this.state.location === window.location.hash){
            return;
        }else{
            this.setState({location: window.location.hash});
        }
    }
    

    /** Routing takes place in this render function */
    render() {
        switch (this.state.location){
            case "#/":
                if (this.state.loggedIn)
                    return (<IndexPage/>);
                else
                    return (<LoginPage/>);
            case "#/home":
                return (<IndexPage/>);
            default:
                if (this.state.loggedIn)
                    return (<IndexPage/>);
                else
                    return (<LoginPage/>);
        }
    }
}

export default App;