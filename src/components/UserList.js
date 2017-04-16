import React, {Component} from  'react';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import OrgUserEdit from './OrgUserEdit';


class UserList extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: "#/",
			data : []
		};
		this.log = new Logger();
		this.selectUser = this.selectUser.bind(this);
	}

	componentDidMount(){
		var callback = function(response, status){
			var data = new Json(response);
			this.log.debug(data.getData());
		    if (status == "success"){
				this.setState({data: data.get('data')})
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid")
		};
		
		var ajax = new Ajax(callback);
		ajax.getData('system/home/all_users', params);
	}

	selectUser(){
		this.log.debug("org selected");
	}

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem phone={listItem.phn} username={listItem.nme} org={listItem.onm} type={listItem.uty} onClick={this.selectUser}/>
		);

		return(
			<div className="row">
			    <div className="col-lg-12">
				    <h3>All User</h3>
			        <div className="ibox float-e-margins">
				        <div className="ibox-content">
					        <table id="sales-report" className="table table-striped table-bordered table-hover">
					            <thead>
					                <tr>
			                            <th>Phone</th>
			                            <th>UserName</th>
			                            <th>Organization Name</th>
				                        <th>Type</th>
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



class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
        this.userClick = this.userClick.bind(this);
    }

    userClick(event){
    	event.preventDefault();
    	this.log.debug(this.props.org);
    	this.props.onClick();
    }

	render(){
		return(
			<tr>
				<td>{this.props.phone}</td>
				<td>{this.props.username}</td>
				<td>{this.props.org}</td>
				<td>{this.props.type}</td>
				<td><button className="btn btn-md btn-primary" onClick={this.userClick}>Update</button></td>
			</tr>
		);
	}
}


export default UserList; 