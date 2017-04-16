import React, {Component} from  'react';
import Cookies from 'js-cookie';
import $ from 'jquery';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Alert from './Alert';
import TextInput from './TextInput';


class AddOrganization extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: "#/",			
            isError: false,
            message: "None",
            alertType: "success"
		};
		this.log = new Logger();
		this.saveOrganization = this.saveOrganization.bind(this);
	}

	saveOrganization(event){
		var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({isError: false, message: data.get('msg'), alertType: "success"});
                window.location.hash = "#/";
            }else if (status === "error"){
                this.setState({isError: true, message: data.get('msg'), alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "tid": this.props.transId,                
                "oname": document.getElementById("org_name").value,
                "ocode": document.getElementById("org_code").value,
                "otrade": document.getElementById("org_trade").value,
                "oemail": document.getElementById("org_email").value,
                "ophone": document.getElementById("org_phone").value, 
                "otype": $('#org_type :selected').val(),
                "oadr": document.getElementById("org_add1").value + " " + document.getElementById("org_add2").value, 
                "uid": Cookies.get("uid"),
            };
        
        var ajax = new Ajax(callback);
        ajax.postData('transaction/submit/organization', params);
	}


	render(){

		return(
			<div className="row">
			    <div className="col-lg-12">
				    <h3>Add Organization</h3>
				    <form className="form-forizontal">
				   		<Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
					    <TextInput id="org_name" label="Organization Name" placeholder="Organization Name"/>
	                    <TextInput id="org_code" label="Organization Code" placeholder="Organization Code"/>
	                    <TextInput id="org_trade" label="Trade License Number" placeholder="Trade License Number"/>
	                    <TextInput id="org_email" type="email" label="Email" placeholder="Email"/>
	                    <TextInput id="org_phone" label="Official Phone Number" placeholder="Official Phone Number"/>
	                    <div className="form-group">
	                        <label className="col-sm-4 control-label">Orgnaization Type</label>
	                        <div className="col-sm-8">
	                            <select className="form-control" name="org_type" id="org_type">
	                                <option value="0">Grocery</option>
	                                <option value="1">Distributor</option>
	                                <option value="2">Telco</option>
	                                <option value="3">Telco Distributor</option>
	                            </select>                                        
	                        </div>
	                    </div>
	                    <TextInput id="org_add1" label="Address" placeholder="Address"/>
	                    <TextInput id="org_add2" label="Address" placeholder="Address"/>
	                    <button type="button" className="btn btn-primary" onClick={this.saveOrganization}>Add Organization</button>
				    </form>
				</div>
			</div>
		);
	}
}




export default AddOrganization; 