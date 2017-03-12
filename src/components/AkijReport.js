import React, {Component} from  'react'

class AkijReport extends Component {
	render(){
        var headerDesign = {
            verticalAlign: "middle",
            textAlign: "center",
            border: "1px solid"
        };
		return (

			<div className="row">
			    <div className="col-lg-12">
			        <div className="ibox float-e-margins">
			            <div className="ibox-title">
			                <h5>Akij Reports</h5>
			            </div>
				        <div className="ibox-content">
					        <table id="akij-report" className="table table-striped table-bordered table-hover">
							  	<thead>
								  	<tr>
									    <th rowSpan="2" style={headerDesign}>S.R. Name</th>
									    <th rowSpan="2" style={headerDesign}>Route</th>
									    <th colSpan="3" style={headerDesign}>Marlboro</th>
                                        <th colSpan="3" style={headerDesign}>Winston</th>
								  	</tr>
                                    <tr>
									    
									    <th style={headerDesign}>Buy</th>
                                        <th style={headerDesign}>Sell</th>
                                        <th style={headerDesign}>Return</th>
                                        <th style={headerDesign}>Buy</th>
                                        <th style={headerDesign}>Sell</th>
                                        <th style={headerDesign}>Return</th>
								  	</tr>
							  	</thead>
							  	<tbody>
								  	<tr>
									    <td>Abul</td>
									    <td>Gulshan</td>
            
									    <td>30 Stick</td>
									    <td>30 Stick</td>
									    <td>30 Stick</td>
            
									    <td>30 Stick</td>
									    <td>10 stick</td>
									    <td>50 stick</td>
               
								  	</tr>
								  	<tr>
									    <td>Kashen</td>
									    <td>Dhanmondi</td>
            
									    <td>50 stick</td>
									    <td>20 Stick</td>
									    <td>30 stick</td>
            
									    <td>10 stick</td>
									    <td>05 Stick</td>
									    <td>05 stick</td>
								  	</tr>
							  	</tbody>	
							</table>
				    	</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AkijReport; 