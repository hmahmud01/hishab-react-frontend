import React, {Component} from 'react';
import TypeList from './TypeList.js';
import CallList from './CallList.js';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
        <div className="wrapper wrapper-content">
        <div className="row">
            <TypeList/>
            <CallList/>
        </div>
        </div>
        );
    }
}

export default Content;