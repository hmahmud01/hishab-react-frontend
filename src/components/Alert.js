import React, {Component} from 'react';

class Alert extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var alertType = "alert animated fadeInRight alert-"+this.props.type;
        return (
            <div>
            {this.props.isVisible &&
                <div className={alertType}>
                    {this.props.message}
                </div>
            }
            </div>
        );
    }
    
}
export default Alert