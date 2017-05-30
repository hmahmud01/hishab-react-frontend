import React, {Component} from  'react';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import $ from 'jquery';

import TransactionDetail from './TransactionDetail';

class TransactionLog extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: '#/',
			data : [{
				    "duration": 0,
				    "aid": "1490680956.12",
				    "call_type": "1",
				    "date": "2017-03-28 06:02",
				    "phone": "01817061650"
				},
			],
			        

		};
		this.log = new Logger();
		this.transactionClick = this.transactionClick.bind(this);
	}

	transactionClick(id, name){
		this.log.debug(id, name);
		this.setState({
			location: "#/transaction",
			name: name,
			id: id
		})
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
		ajax.getData('http://192.168.5.70:8080/API/call_log/', params);

	}

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem phone={listItem.phone} id={listItem.aid} date={listItem.date} call_type={listItem.call_type} duration={listItem.duration} onClick={this.transactionClick}/>
		);

		switch (this.state.location){
			case "#/transaction":
				return(
					<TransactionDetail />
				);
			default:
				return(
					<div>
						<div className="row">
						    <div className="col-lg-12">
						    <h1>Call Log</h1>
						        <div className="ibox float-e-margins">
						        	<div className="ibox-title">
					                    <h5>Transaction Logs</h5>
					                </div>
							        <div className="ibox-content">
								        <table id="sales-report" className="table table-striped table-bordered table-hover">
								            <thead>
								                <tr>
								                	<th>Id</th>			                            
						                            <th>Phone Number</th>				                            
						                            <th>Date</th>
						                            <th>Call Type</th>
						                            <th>Detail</th>
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
					</div>
				);
		}		
	}
}



class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.detailClicked = this.detailClicked.bind(this);
    }

    detailClicked(){
    	this.props.onClick(this.props.phone, this.props.id);
    }


	render(){
		return(
			<tr>
				<td>{this.props.phone}</td>
				<td>{this.props.id}</td>
				<td>{this.props.date}</td>
				<td>{this.props.call_type}</td>
				<td><button className="btn btn-primary" onClick={this.detailClicked}>Detail</button></td>
			</tr>
		);
	}
}


export default TransactionLog; 