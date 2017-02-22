import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import AutoSuggestText from './AutoSuggestText';

class FormComp extends Component{
	constructor(props){
		super(props);
		this.state = {};

		this.getJSON = this.getJSON.bind(this);
	}

	getJSON(){
		return null;
	}

	render(){
		return(
			<form className="form-horizontal">
                <h5>{this.props.formheader}</h5>
                {this.props.children}   
                <div className="hr-line-dashed"></div>
                <button type="button" className="btn btn-primary pull-right" onClick={this.onRegistrationClicked}>Submit</button>
                <a data-toggle="modal" className="btn btn-warning" href="#modal-error">Report Error</a>
            </form>


		);		
	}

}


export default FormComp;