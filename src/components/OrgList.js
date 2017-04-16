import React, {Component} from  'react';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import OrgUserEdit from './OrgUserEdit';


class OrgList extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: "#/",
			data : [
				{oid: "AKij", onm: "AKij"},
				{oid: "Anarosh", onm: "Anarosh"},
				{oid: "Gaja", onm: "Gaja"},
			],
		};
		this.log = new Logger();
		this.selectOrg = this.selectOrg.bind(this);
	}

	componentDidMount(){
		var callback = function(response, status){
			var data = new Json(response);
		    if (status == "success"){
				this.setState({data: data.get('data')})
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid")
		};
		
		var ajax = new Ajax(callback);
		ajax.getData('system/home/all_organizations', params);
	}

	selectOrg(key, onm){
		this.log.debug("org selected");
		this.setState({location: "#/useredit", oid: key, name: onm});
	}




	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem orgid={listItem.oid} name={listItem.onm} onClick={this.selectOrg}/>
		);

		switch (this.state.location){
			case "#/useredit":
				return (
					<OrgUserEdit id={this.state.oid} name={this.state.name}/>
				);
			default: 
				return(
					<div className="row">
					    <div className="col-lg-12">
					    <h1>Update Organization User List</h1>
					        <div className="ibox float-e-margins">
						        <div className="ibox-content">
							        <table id="sales-report" className="table table-striped table-bordered table-hover">
							            <thead>
							                <tr>
					                            <th>Organization Id</th>
					                            <th>Organizatio Name</th>
					                            <th>Select</th>
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
				);
		}
	}
}



class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
        this.orgClick = this.orgClick.bind(this);
    }

    orgClick(event){
    	event.preventDefault();
    	this.log.debug(this.props.name);
    	this.props.onClick(this.props.orgid, this.props.name);
    }

	render(){
		return(
			<tr>
				<td>{this.props.orgid}</td>
				<td>{this.props.name}</td>
				<td><button className="btn btn-md btn-primary" onClick={this.orgClick}>Select</button></td>
			</tr>
		);
	}
}


export default OrgList; 