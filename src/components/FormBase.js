import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import AutoSuggestText from './AutoSuggestText';

class FormBase extends Component{
	constructor(props){
		super(props);
		this.state = {};
        this.onClick = this.onClick.bind(this);
	}
    
    onClick(event){
        if (this.props.onClick !== undefined){
            var clickFunc = this.props.onClick.bind(this);
            clickFunc(event);
        }
    }

	render(){
        var buttonClass = this.props.buttonClass === undefined ? "btn" : "btn " + this.props.buttonClass;
		return(
			<form className={this.props.className === undefined ? "form-horizontal" : this.props.className}>
                <h5>{this.props.formheader}</h5>
                {this.props.children}   
                <div className="hr-line-dashed"></div>
                <div className="form-group">
                    <button type="button" className={buttonClass} onClick={this.onClick}>{this.props.submission === undefined ? "Submit" : this.props.submission}</button>
                </div>
            </form>
		);		
	}

}


export default FormBase;