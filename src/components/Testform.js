import React, {Component} from 'react';
import FormBase from './FormBase';
import FormFrame from './FormFrame';
import AutoSuggestText from './AutoSuggestText';
import TextInput from './TextInput';
import RadioInput from './RadioInput';

class Testform extends Component {
	constructor(props){
		super(props);
		this.state ={};
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(){
		alert('Form submit working');
	}

	render(){
		return(
			<FormFrame head="Voice information">
<<<<<<< HEAD
                <FormComp formheader="Caller Form" onClick={this.submitForm}>
=======
                <FormBase formheader="Caller Form">
>>>>>>> 12331742b83c03f2cffe05f3be460e46d9535296

                	<TextInput id="ph_numer" label="Phone Number" placeholder="Phone Number"/>
                	<TextInput id="name" label="Name" placeholder="Name"/>

	                <div className="form-group"><label className="col-sm-4 control-label">Organization</label>
	                    <div className="col-sm-8">
	                        <AutoSuggestText 
	                            id="organization"
	                            placeholder="Organization"
	                            datalist="orglist"
	                            url="http://192.168.5.2:8000/api/v1/transaction/search/organization"
	                        >
		                        <span className="input-group-btn"> 
		                        	<a data-toggle="modal" className="btn btn-primary" href="#modal-user">
		                            	<i className="fa fa-plus" aria-hidden="true"></i>
		                            </a>
		                        </span>
	                     	</AutoSuggestText>
	                    </div>
	                </div>  

	                <RadioInput />
                </FormBase>
            </FormFrame>   
		);
	}
}

export default Testform;