import React, {Component} from 'react';
import Cookies from 'js-cookie';

import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class TransactionDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: {
				buyer: "017######",
				seller: "018######",
				buyerName: "Kashem",
				sellerName: "Abul",
				products: [
					{name: "marlboro Advance", qty: 30, total: 330},
					{name: "marlboro Gold", qty: 20, total: 220},
					{name: "marlboro Red", qty: 10, total: 110}
				],
				total: 660,
				paid: 640,
				due: 20
			}
		};
		this.log = new Logger();
	}

	componentDidMount() {
		var uid = Cookies.get("uid");
		if (uid === undefined)
			window.location.hash = "#/";

		var callback = function(response, status){
		    var data = new Json(response);
		    if (status === "success"){
				this.log.debug(data.getData());
				this.setState({data: data.getData()});
				this.log.debug("from state");
				this.log.debug(data);
		    }else if (status === "error"){
		
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid"),
			"tid": this.props.id,
		};
		
		var ajax = new Ajax(callback);
		ajax.getData('transaction/report_details', params);
	}

	render() {
		const listItems = this.state.data.products.map(
			(listItem) => 
				<ListItem name={listItem.product_name} qty={listItem.product_quantity} total={listItem.product_unit_price}/>
		);
		return (
			<div>
				<div className="row">
				    <div className="col-lg-12">
					    <h1>Transaction Detail</h1>

					    <div className="ibox float-e-margins">
					    	<div className="ibox-title">
					    		<h5>Transaction Call information</h5>
					    	</div>

					    	<div className="ibox-content">
					    		<p>Buyer Number: {this.state.data.buyer.phone}</p><br/>
					    		<p>Buyer Name: {this.state.data.buyer.name}</p><br/>
					    		<p>Seller Number: {this.state.data.seller.phone}</p><br/>
					    		<p>Seller Name: {this.state.data.seller.name}</p><br/>
					    	</div>
					    </div>

					    <div className="ibox float-e-margins">
					       	<div className="ibox-title">
					            <h5>Product Details</h5>
					        </div>
						    <div className="ibox-content">
						        <table id="sales-report" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>
							               	<th>Name</th>			                            
						                    <th>Qantity</th>
						                    <th>Price</th>				                            
						                </tr>
							        </thead>
									<tbody>
								    	{listItems}
								    </tbody>
							    </table>
							</div>
						</div>

						<div className="ibox float-e-margins">
					    	<div className="ibox-title">
					    		<h5>Transaction Summary</h5>
					    	</div>

					    	<div className="ibox-content">
					    		<p>Total: {this.state.data.total_bill}</p><br/>
					    		<p>Paid: {this.state.data.paid_amount}</p><br/>
					    		<p>Discount: {this.state.data.discount_amount}</p><br/>					    		
					    	</div>
					    </div>
					</div>
				</div>
			</div>

		)
	}
}

class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
    }

	render(){
		return(
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.qty}</td>
				<td>{this.props.total} tk</td>
			</tr>
		);
	}
}

export default TransactionDetail;