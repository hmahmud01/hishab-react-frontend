import React, {Component} from  'react'
import $ from 'jquery';

class AkijReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            productList : ["Marlboro", "Winston", "Sheikh"], 
            dataList : [{
                        sr: "Abul", 
                        route: "Gulshan",
                        products: ["Marlboro", "Winston", "Sheikh"],
                        sales : [[30,15,10],[15,20,22],[25,45,60]]
                        },
                       {
                        sr: "Kashem", route: "Dhanmondi", 
                        products: ["Marlboro", "Winston", "Sheikh"],
                        sales: [[30,15,10],[15,20,22],[25,45,6]]
                        },
                       {
                        sr: "Rashid", route: "Bonani", 
                        products: ["Marlboro", "Winston", "Sheikh"],
                        sales: [[30,15,10],[15,20,22],[25,45,60]]
                        }]
        };
    }

    // componentDidMount(){
    //     var url = "http://192.168.5.2:8000/api/v1/reports/sr?uid=01817061650";

    //     $.getJSON(url, function(data){
    //         var dataList = data.map(function(list, index){

    //         })
    //         .done(function() {
    //             console.log("in akij report success");
    //         })
    //         .fail(function() {
    //             console.log("in akij report error");
    //         });
    //     });
    // }
    

	render(){
        var headerDesign = {
            verticalAlign: "middle",
            textAlign: "center",
            border: "1px solid"
        };

        var productDataList = this.state.dataList.map(function(pData, index){
            return pData.products
        });


        // var productHeaders = this.state.dataList.map(function(pData, index){
        //     return pData.products.map(function(ph, index){
        //         return(
        //         <th key={index} colSpan="3" style={headerDesign}>{ph}</th>
        //         );
        //     });            
        // });
        
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
                    {
                        data.sales.map(function(individualData,index){                    	   
                            return individualData.map(function(cell, di){
                                return(
                                    <th key={di}>{cell}</th>
                                )
                            });
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