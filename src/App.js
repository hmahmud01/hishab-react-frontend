import React, { Component } from 'react';
import IndexPage from './pages/IndexPage';
import Dashboard from './pages/Dashboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: window.location.hash
        }
        this.onRouteChange = this.onRouteChange.bind(this)
    }

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
                return (<IndexPage/>);
            case "#/dashboard":
                return (<Dashboard/>);
            default:
                return (<IndexPage/>);-
        }
    }
}

export default App;