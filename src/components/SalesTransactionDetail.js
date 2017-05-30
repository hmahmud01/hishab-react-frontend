import React, {Component} from  'react'

class SalesTransactionDetail extends Component {
	render(){
		return (
			<div>
				<div className="col-lg-12">
	                <h1>Sales Transaction Reports</h1>
	                <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
	            </div>
				<div className="row">
				    <div className="col-lg-12">
				        <div className="ibox float-e-margins">
				            <div className="ibox-title">
				                <h5>Sales Transactions Detail</h5>
				            </div>
					        <div className="ibox-content">
						        <table id="sales-transaction-detail" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>
						                    <th>Transaction ID</th>
						                    <th>Organization</th>
						                    <th>Person</th>
						                    <th>Total Sell</th>
						                    <th>Payment Received</th>
						                    <th>Receivable</th>
						                    <th>Date</th>
						                </tr>
						            </thead>
						            <tbody>
						                <tr>
						                    <td>11</td>
						                    <td>Organization 2</td>
						                    <td>person X</td>
						                    <td>2400.00</td>
						                    <td>2000.00</td>
						                    <td>400.00</td>
						                    <td>12/12/12</td>
						                </tr>
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

export default SalesTransactionDetail;