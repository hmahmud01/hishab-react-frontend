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
        this.download_json = this.download_csv.bind(this);
        this.export_table_to_json = this.export_table_to_csv.bind(this);
        this.tableJsonDownload = this.tableDownload.bind(this);
        this.log = new Logger();
    }


    componentDidMount(){
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({productList:data.getData()[0].product, dataList:data.getData()[1].trx});
            }
        }.bind(this);
        
        var params = {
                "uid": Cookies.get("uid")
            };
                
        var ajax = new Ajax(callback);
        ajax.getData('reports/sr', params);

    }

    //export csv is currently in deploy

    /////////////////////
    ////CSV  download////
    /////////////////////

    download_csv(csv, filename){
        var csvFile;
        var downloadLink;

        csvFile = new Blob([csv], {type: "text/csv"});

        downloadLink = document.createElement("a");

        downloadLink.download = filename;

        downloadLink.href = window.URL.createObjectURL(csvFile);

        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        // downloadLink.click();
        this.log.debug("inside debug");
        console.log("end of download csv");
    }

    export_table_to_csv(filename){
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        for(var i=0; i<rows.length; i++){
            var row = [];
            var cols = rows[i].querySelectorAll("td, th");

            for (var j=0; j<cols.length; j++){
                if (i == 0 && j > 1){
                    row.push('');
                    row.push(cols[j].innerText);
                    row.push('');
                }else if (i == 1 && j == 0){
                    row.push('');
                    row.push('');
                    row.push(cols[j].innerText);
                }else{
                    row.push(cols[j].innerText);
                }
            }

            csv.push(row.join(","));
        }
        this.download_csv(csv.join("\n"), filename);
    }

    tableDownload(){
        this.export_table_to_csv("table.csv");
    }

    /////////////////////
    ////json download////
    /////////////////////
    download_json(json, filename){
        var jsonFile;
        var downloadLink;

        jsonFile = new Blob([json], {type: "application/json"});

        downloadLink = document.createElement("a");

        downloadLink.download = filename;

        downloadLink.href = window.URL.createObjectURL(jsonFile);

        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        // downloadLink.click();
    }

    export_table_to_json(filename){
        var json = [];
        var rows = document.querySelectorAll("table tr");
        for(var i=0; i<rows.length; i++){
            var row = [];
            var cols = rows[i].querySelectorAll("td, th");

            for (var j=0; j<cols.length; j++){
                if (i == 0 && j > 1){
                    row.push('');
                    row.push(cols[j].innerText);
                    row.push('');
                }else if (i == 1 && j == 0){
                    row.push('');
                    row.push('');
                    row.push(cols[j].innerText);
                }else{
                    row.push(cols[j].innerText);
                }
            }

            json.push(row.join(","));
        }
        this.download_json(json.join("\n"), filename);
    }

    tableJsonDownload(){
        // this.export_table_to_json("report.json");
        this.log.debug("json Download");
        console.log("json");
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
			                <h5>Akij Reports 
                                <div className="btn-group">
                                    <button className="btn btn-xs btn-primary" onClick={this.tableDownload}>Export to CSV</button>
                                    <button className="btn btn-xs btn-warning" onClick={this.tableJsonDownload}>Export to Json</button>
                                    <button className="btn btn-xs btn-danger" onClick={this.tableJsonDownload}>Export to XML</button>
                                </div>
                            </h5>
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