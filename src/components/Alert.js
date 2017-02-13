import React, {Component} from 'react';

class Alert extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var alertType = "alert animated fadeInRight alert-"+this.props.type;
        return (
        <div className={alertType}>
            {this.props.message}
        </div>
        );
    }
    
}
export default Alert