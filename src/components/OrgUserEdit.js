import React, {Component} from  'react';
import Cookies from 'js-cookie';
import $ from 'jquery';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';
import TextInput from './TextInput';


class OrgUserEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: "#/",
			data : [
				{uid:"1", unm: "Rahim", onm: "Gulshan", uty:"admin"},
				{uid:"2", unm: "Salam", onm: "Dhanmondi", uty:"admin"},
				{uid:"3", unm: "Obaidul", onm: "Bolod", uty:"SR"},
			],

			branch : [
				{onm: "Gulshan", oid:"1"},
				{onm: "Dhanmondi", oid:"2"},
				{onm: "Bolod", oid:"3"},
			],

			branchData : [
				{uid :"1", unm: "Rahim", onm: "Gulshan", uty:"SR"},
				{uid :"1", unm: "Salam", onm: "Dhanmondi", uty:"SR"},
				{uid :"1", unm: "Obaidul", onm: "Bolod", uty:"admin"},
			]
		};
		this.log = new Logger();
		this.selectOrg = this.selectOrg.bind(this);
		this.selectBranch = this.selectBranch.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);
	}

	//cho = onm, oid
	//ous = uid, unm, uty, onm

	componentDidMount(){
		var callback = function(response, status){
			var data = new Json(response);
		    if (status == "success"){
				this.setState({branch: data.get('data').cho, data: data.get('data').ous })
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid"),
			"oid": this.props.id
		};
		
		var ajax = new Ajax(callback);
		ajax.postData('system/home/organization_child_org', params);
	}

	selectOrg(){
		this.log.debug("org selected");
	}

	selectBranch(){
		this.log.debug("branch selected");
		var oldData = this.state.data;
		var newData = this.state.branchData;
		var curData = oldData.concat(newData);
		this.log.debug(curData);
		this.setState({data: curData});
		this.forceUpdate();
	}

	onStatusChange(key){
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.log.debug(key);
            }else {
            	this.log.debug(key);
            } 
        }.bind(this);
        
        var params = {
        		"id": key,
                "type": $('#status :selected').val(),                
                "uid": Cookies.get("uid"),
            };
        
        var ajax = new Ajax(callback);
        ajax.postData('', params);
        
    }

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem user={listItem.unm} branch={listItem.onm} type={listItem.uty} id={listItem.uid} onClick={this.selectOrg}/>
		);

		const listBranches = this.state.branch.map(
			(listBranch) => 
				<ListBranch name={listBranch.onm} id={listBranch.oid} onClick={this.selectBranch}/>				
		);

		return(
			<div>
				<div className="row">
				    <div className="col-lg-12">
				    <h1>All Employee List of {this.props.name} {this.props.id}</h1>
				    	<h3>All Branch</h3>
				    	<div className="ibox float-e-margins">
					        <div className="ibox-content">
						        <table id="sales-report" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>
				                            <th></th>
				                            <th>Branch</th>
				                        </tr>
						            </thead>
						            <tbody>
						            	{listBranches}
						            </tbody>
						        </table>
					    	</div>
						</div>

				    	<h3>All Employees</h3>
				        <div className="ibox float-e-margins">
					        <div className="ibox-content">
						        <table id="sales-report" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>
				                            <th>User Name</th>
				                            <th>Branch</th>
				                            <th>User Type</th>
				                            <th>Update</th>
				                        </tr>
						            </thead>
						            <tbody>
						            	{listItems}
						            </tbody>
						        </table>
					    	</div>
						</div>
					</div>
				</div>

				<Modal id="modal-employee" title="Change Employee Status" discard="Exit" success="Submit" onClick={this.onStatusChange}>                    
	                <div className="form-group">
	                    <label className="col-sm-4 control-label">Status</label>
	                    <div className="col-sm-8">
	                        <select className="form-control" name="status" id="status">
	                            <option value="admin">Admin</option>
	                            <option value="sr">SR</option>
	                        </select>                                        
	                    </div>
	                </div>
	            </Modal>			
            </div>
		);
	}
}



class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
        this.statusClick = this.statusClick.bind(this);
    }

    statusClick(event){
    	event.preventDefault();
    	this.log.debug(this.props.user);
    	this.props.onClick(this.props.id);
    }

	render(){
		return(
			<tr>
				<td>{this.props.user}</td>
				<td>{this.props.branch}</td>
				<td>{this.props.type}</td>
				<td><button data-toggle="modal" className="btn btn-md btn-primary" href="#modal-employee" onClick={this.statusClick}>Update Status</button></td>
			</tr>
		);
	}
}

class ListBranch extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
        this.branchClick = this.branchClick.bind(this);
    }

    branchClick(event){
    	event.preventDefault();
    	event.checked;
    	this.log.debug(this.props.branch);
    	this.props.onClick();
    }

	render(){
		return(
			<tr>
				<td><input type="checkbox" name={this.props.name} value={this.props.id} onClick={this.branchClick}/></td>
				<td>{this.props.name}</td>
			</tr>
		);
	}
}

export default OrgUserEdit; 