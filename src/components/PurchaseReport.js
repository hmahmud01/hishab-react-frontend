import React, {Component} from  'react'

class PurchaseReport extends Component {
	render(){
		return (
			<div>
				<div className="col-lg-12">
	                <h1>Purchase Reports</h1>
	                <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
	            </div>
				<div className="row">
				    <div className="col-lg-12">
				        <div className="ibox float-e-margins">
				            <div className="ibox-title">
				                <h5>Purchase Reports</h5>
				            </div>
					        <div className="ibox-content">
						        <table id="purchase-report" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>
				                            <th>Organization Name</th>
				                            <th>Total Purchase</th>
				                            <th>Paid Amount</th>
				                            <th>Payable</th>
				                            <th>Last Paid Amount</th>
				                            <th>Last Payment Date</th>
				                        </tr>
						            </thead>
						            <tbody>
						                <tr>
				                            <td>Organization 1</td>
				                            <td>270.00</td>
				                            <td>200.00</td>
				                            <td>30.00</td>
				                            <td>40.00</td>
				                            <td>30/12/2016</td>
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

export default PurchaseReport; 