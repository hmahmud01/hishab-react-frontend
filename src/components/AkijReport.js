import React, {Component} from  'react'
import $ from 'jquery';
import Cookies from 'js-cookie';

import Json from '../utils/Json';
import Ajax from '../utils/Ajax';

class AkijReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            productList : [], 
            dataList : []
        };
    }


    componentDidMount(){
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({productList:data.getData()[0].product, dataList:data.getData()[1].trx});
            }else if (status === "error"){
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid")
            };
                
        var ajax = new Ajax(callback);
        ajax.getData('http://192.168.5.2:8000/api/v1/reports/sr', params);

    }
    

	render(){
        var headerDesign = {
            verticalAlign: "middle",
            textAlign: "center",
            border: "1px solid"
        };

        var tableDesign = {
            width: "100%",
            overflow: "auto"
        }


        var productDataList = this.state.dataList.map(function(pData, index){
            return pData.products
        });
        
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
				        <div className="ibox-content" style={tableDesign}>
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