import React, { Component } from 'react';
import $ from 'jquery';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: window.location.hash
        }
        this.onRouteChange = this.onRouteChange.bind(this);
//        this.setupAjax = this.setupAjax.bind(this);
    }
    
    /** Will need to use this to connect to server to get csrf token */
//    componentWillMount(){
//        
//        $.ajax({
//            method: 'GET',
//            url: 'http://127.0.0.1:8000/',
//            success: function(response){
//                this.setState({csrftoken: response});
//                this.setupAjax();
//                
//            }.bind(this)
//        });
//    }
//    /** setup ajax header for csrf enabled protection */
//    setupAjax(){
//        $.ajaxSetup({
//        beforeSend: function(xhr, settings) {
//            xhr.setRequestHeader("X-CSRFToken", this.state.csrftoken);
//            console.log(this.state.csrftoken);
//            
//        }.bind(this)
//    });
//    }
    
    /** One time fire call. Will ensure that the hash change is being listened to */
    componentDidMount(){
        window.addEventListener("hashchange", this.onRouteChange);
        if (window.location.hash === '' || window.location.hash === undefined){
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
                return (<LoginPage/>);
            case "#/home":
                return (<IndexPage/>);
            default:
                return (<LoginPage/>);
        }
    }
}

export default App;