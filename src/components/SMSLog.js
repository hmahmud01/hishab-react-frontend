import React, {Component} from  'react';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class SMSLog extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : [
				{tid: 1, phone: "017979797", text: "SMS text 1", date: "03/03/17", status: "sent"},
				{tid: 2, phone: "017979797", text: "SMS text 2", date: "03/03/17", status: "sent"},
				{tid: 3, phone: "017979797", text: "SMS text 3", date: "03/03/17", status: "unsent"},
			]
		};
		this.log = new Logger();
		this.smsClick = this.smsClick.bind(this);
	}

	smsClick(key, text){
		this.log.debug(key);
		this.log.debug(text);
	}

	componentDidMount(){
		var callback = function(response, status){
			var data = new Json(response);
		    if (status === "success"){
				this.log.debug(data.getData());
				this.log.debug(response);
				this.setState({data: data.getData()});
		    }else if (status === "error"){
		
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid")
		};
		
		var ajax = new Ajax(callback);
		ajax.getData('http://192.168.5.70:8080/API/sms_log/', params);
	}

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem tid={listItem.tid} phone={listItem.phone} text={listItem.text} date={listItem.date} status={listItem.status} onClick={this.smsClick}/>
		);

		return(
			<div className="row">
			    <div className="col-lg-12">
			    <h1>SMS Log</h1>
			        <div className="ibox float-e-margins">
				        <div className="ibox-content">
					        <table id="sales-report" className="table table-striped table-bordered table-hover">
					            <thead>
					                <tr>
			                            <th>Transaction Id</th>
			                            <th>Phone Number</th>
			                            <th>SMS Text</th>
			                            <th>Date</th>
			                            <th>Status</th>
			                            <th>Resend</th>
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
        this.resendClick = this.resendClick.bind(this);
    }

    resendClick(event){
    	event.preventDefault();
    	this.props.onClick(this.props.tid, this.props.text);
    }

	render(){
		return(
			<tr>
				<td>{this.props.tid}</td>
				<td>{this.props.phone}</td>
				<td>{this.props.text}</td>
				<td>{this.props.date}</td>
				<td>
					<span className={this.props.status === "success" ? "label label-success" : "label label-danger"}>
						{this.props.status}
					</span>					
				</td>
				<td><button className="btn btn-md btn-primary" onClick={this.resendClick}>Resend</button></td>
			</tr>
		);
	}
}


export default SMSLog; 