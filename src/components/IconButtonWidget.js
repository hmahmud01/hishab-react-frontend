import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';

class IconButtonWidget extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive : false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        event.preventDefault();
        this.setState(prevState => 
                      ({isActive: !prevState.isActive}));
        
        this.props.onClick(this.props.subheader);
    }
    
    render(){
        var icon = "fa fa-5x fa-"+this.props.icon;
        var color = "widget style1 "+this.props.className;
        return (
        <div className="col-lg-3">
            <a href="#" onClick={this.handleClick}>
                <div className={color}>
                    <div className="row">
                        <div className="col-xs-4">
                            <i className={icon}></i>
                        </div>
                        <div className="col-xs-8">
                            <span>{this.props.subheader}</span>
                            <h3 className="font-bold">{this.props.header}</h3>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        );
    }
}

export default IconButtonWidget;