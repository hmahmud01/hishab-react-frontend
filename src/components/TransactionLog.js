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
			data : []
		};
		this.log = new Logger();
		this.transactionClick = this.transactionClick.bind(this);
	}

	transactionClick(id, buyer){
		this.log.debug(id, buyer);
		this.setState({
			location: "#/transaction",
			buyer: buyer,
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
		ajax.getData('transaction/report', params);

	}

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem id={listItem.trx_id} buyer={listItem.buyer.name} seller={listItem.seller.name} onClick={this.transactionClick}/>
		);

		switch (this.state.location){
			case "#/transaction":
				return(
					<TransactionDetail id={this.state.id} buyer={this.state.buyer}/>
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
						                            <th>Buyer</th>				                            
						                            <th>Seller</th>
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
    	this.props.onClick(this.props.id, this.props.buyer);
    }


	render(){
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.buyer}</td>
				<td>{this.props.seller}</td>
				<td><button className="btn btn-primary" onClick={this.detailClicked}>Detail</button></td>
			</tr>
		);
	}
}


export default TransactionLog; 