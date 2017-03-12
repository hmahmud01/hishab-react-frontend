import React, {Component} from  'react'

class AkijReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            productList : ["Marlboro", "Winston", "Sheikh"], 
            dataList : [{sr: "Abul", route: "Gulshan", sales: [{buy: 30, sell: 15, ret: 10},
            													{buy: 15, sell: 20, ret: 22},
            													{buy: 25, sell: 45, ret: 60}]},
                       {sr: "Kashem", route: "Dhanmondi", sales: [{buy: 14, sell: 15, ret: 10},
            													{buy: 115, sell: 20, ret: 22},
            													{buy: 225, sell: 45, ret: 60}]},
                       {sr: "Rashid", route: "Bonani", sales: [{buy: 2230, sell: 15, ret: 10},
            													{buy: 415, sell: 20, ret: 22},
            													{buy: 525, sell: 45, ret: 60}]}]
        };
    }
    
//    dataList : [[30,15,10],[15,20,22],[25,45,60],
//                       [30,15,10],[15,20,22],[25,45,60],
//                       [30,15,10],[15,20,22],[25,45,60]]
    

	render(){
        var headerDesign = {
            verticalAlign: "middle",
            textAlign: "center",
            border: "1px solid"
        };
        
        var productHeaders = this.state.productList.map(function(product, index){
            return(
                <th key={index} colSpan="3" style={headerDesign}>{product}</th>
            );
        });
        
        var productSubHeaders = this.state.productList.map(function(product, index){
            var subHeading = ["Buy", "Sell", "Return"];
            return subHeading.map(function(subHead, ind){
                return (
                    <th key={ind} style={headerDesign}>{subHead}</th>
                );
                }
            );
        });


        
        var dataRows = this.state.dataList.map(function(data, index){
            return(
                <tr key={index}>
            	    <td >{data.sr}</td>
            	    <td >{data.route}</td>
                    {data.sales.map(function(individualData,index){
                    	return (
                			<td key={index}>{individualData.buy} {individualData.sell} {individualData.ret}</td>
                			// <td key={index}>{individualData.buy}</td>
                			// <td key={index}>{individualData.buy}</td>
                    	)
                    })
                	}
                </tr>
            );
        });

            
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
                                        {productHeaders}
								  	</tr>
                                    <tr>
									    {productSubHeaders}
								  	</tr>
							  	</thead>
							  	<tbody>
								  	{dataRows}
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