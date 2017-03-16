import React, {Component} from  'react'
import $ from 'jquery';
import Cookies from 'js-cookie';

import Json from '../utils/Json';
import Ajax from '../utils/Ajax';
import Logger from '../utils/Logger';

class AkijReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            productList : [], 
            dataList : []
        };
        this.download_csv = this.download_csv.bind(this);
        this.export_table_to_csv = this.export_table_to_csv.bind(this);
        this.tableDownload = this.tableDownload.bind(this);
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
        ajax.getData('reports/sr', params);

    }

    //export csv is currently in deploy

    download_csv(csv, filename){
        var csvFile;
        var downloadLink;

        csvFile = new Blob([csv], {type: "text/csv"});

        downloadLink = document.createElement("a");

        downloadLink.download = filename;

        downloadLink.href = window.URL.createObjectURL(csvFile);

        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        downloadLink.click();
        console.log("end of download csv");
    }

    export_table_to_csv(filename){
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        // console.log("inside row");
        // console.log(rows);
        for(var i=0; i<rows.length; i++){
            var row = [];
            console.log("inside col_0");            
            var col_0 = rows[0];
            console.log(col_0);
            console.log("inside col_1");            
            var col_1 = rows[1];
            console.log(col_1);

            var _th = "<th><th>";
            col_1 = _th + _th + col_1;
            // col_1.unshift(_th);
            console.log(col_1[0]);

            var cols = rows[i].querySelectorAll("td, th");
            // console.log("inside col");
            // console.log(cols);

            for (var j=0; j<cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }
        // console.log("in table to csv before download");
        this.download_csv(csv.join("\n"), filename);
        // console.log("in table to csv after download");
    }

    tableDownload(){
        this.export_table_to_csv("table.csv");
        // console.log("inside table download function");
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
			                <h5>Akij Reports <button className="btn btn-xs btn-primary" onClick={this.tableDownload}>Export to CSV</button></h5>
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