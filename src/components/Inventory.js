import React, {Component} from  'react'
import Cookies from 'js-cookie';

import Json from '../utils/Json';
import Ajax from '../utils/Ajax';
import Logger from '../utils/Logger';

class Inventory extends Component {
    constructor(props){
        super(props);
        this.state = {
            productList : [],
            dataList : []
        };
        this.log = new Logger();
    }


    componentDidMount(){        
        var callback = function(response, status){
            if (status === "success"){
                var data = new Json(response);
                this.log.debug(data.getData());
                this.setState({productList:data.getData()[0].product, dataList:data.getData()[1].trx});
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid")
            };
                
        var ajax = new Ajax(callback);
        ajax.getData('reports/inventory', params);

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
                <th key={index} colSpan="4" style={headerDesign}>{product}</th>
            );
        });
        
        var productSubHeaders = this.state.productList.map(function(product, index){
            var subHeading = ["Stock", "Factory Recieve", "Memo Number", "Sell"];
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
                    {
                        data.sales.map(function(individualData,idx){
                            var stock = 0;
                            var prevStock = 0;
                            this.log.debug(individualData);
                            if (index > 0){
                                this.log.debug("Previous Data:");
                                prevStock = this.state.dataList[index-1].sales[idx];
                            }
                            stock =  parseInt(prevStock) + individualData[0] - individualData[individualData.length-1];
                            individualData.unshift(stock);
                            return individualData.map(function(cell, di){
                                return(
                                    <td key={di}>{cell}</td>
                                )
                            });
                        }.bind(this))
                	}
                </tr>
            );
        }.bind(this));

            
		return (

			<div className="row">
			    <div className="col-lg-12">
			        <div className="ibox float-e-margins">
			            <div className="ibox-title">
			                <h5>Akij Inventory</h5>
                            <div className="btn-group pull-right">
                                <button className="btn btn-xs btn-primary" onClick={this.tableDownload}>Export to CSV</button>
                                <button className="btn btn-xs btn-warning" onClick={this.tableJsonDownload}>Export to Json</button>
                                <button className="btn btn-xs btn-danger" onClick={this.tableJsonDownload}>Export to XML</button>
                            </div>
			            </div>
				        <div className="ibox-content" style={tableDesign}>
					        <table id="akij-report" className="table table-striped table-bordered table-hover">
							  	<thead>
								  	<tr>
									    <th rowSpan="2" style={headerDesign}>Day</th>
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

export default Inventory; 