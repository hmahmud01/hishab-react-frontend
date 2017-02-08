import React, {Component} from 'react';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
        <div className="wrapper wrapper-content">
        <div className="row">
            {this.props.children}
        </div>
        </div>
        );
    }
}

export default Content;