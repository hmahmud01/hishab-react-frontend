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
        this.download_csv = this.download_csv.bind(this);
        this.export_table_to_csv = this.export_table_to_csv.bind(this);
        this.tableDownload = this.tableDownload.bind(this);
        this.download_json = this.download_csv.bind(this);
        this.export_table_to_json = this.export_table_to_csv.bind(this);
        this.tableJsonDownload = this.tableJsonDownload.bind(this);
        this.download_pdf = this.download_pdf.bind(this);
        this.export_table_to_pdf = this.export_table_to_pdf.bind(this);
        this.tablePDFDownload = this.tablePDFDownload.bind(this);
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

        downloadLink.click();
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
                if (i == 0 && j > 0){
                    row.push(cols[j].innerText);
                    row.push('');
                    row.push('');
                    row.push('');
                }else if (i == 1 && j == 0){
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

    tableDownload(event){
        event.preventDefault();
        this.log.debug("inside debug");
        console.log("end of download csv");
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

        downloadLink.click();
        this.log.debug("inside debug");
        console.log("end of download JSON");

    }

    export_table_to_json(filename){
        var json = [];
        var rows = document.querySelectorAll("table tr");
        for(var i=0; i<rows.length; i++){
            var row = [];
            var cols = rows[i].querySelectorAll("td, th");

            for (var j=0; j<cols.length; j++){
                if (i == 0 && j > 1){
                    row.push(cols[j].innerText);
                    row.push('');
                    row.push('');
                    row.push('');
                }else if (i == 1 && j == 0){
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

    tableJsonDownload(event){
        event.preventDefault();
        // this.export_table_to_json("report.json");
        this.export_table_to_json("report.json");
        this.log.debug("json Download");
        console.log("json");
    }


    /////////////////////
    ////pdf download////
    /////////////////////
    download_pdf(json, filename){
        var pdfFile;
        var downloadLink;

        pdfFile = new Blob([json], {type: "application/pdf"});

        downloadLink = document.createElement("a");

        downloadLink.download = filename;

        downloadLink.href = window.URL.createObjectURL(pdfFile);

        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        downloadLink.click();
        this.log.debug("inside debug");
        this.log.debug("end of download PDF");

    }

    export_table_to_pdf(filename){
        var json = [];
        var rows = document.querySelectorAll("table tr");
        for(var i=0; i<rows.length; i++){
            var row = [];
            var cols = rows[i].querySelectorAll("td, th");

            for (var j=0; j<cols.length; j++){
                if (i == 0 && j > 1){
                    row.push(cols[j].innerText);
                    row.push('');
                    row.push('');
                    row.push('');
                }else if (i == 1 && j == 0){
                    row.push('');
                    row.push(cols[j].innerText);
                }else{
                    row.push(cols[j].innerText);
                }
            }

            json.push(row.join(","));
        }
        this.download_pdf(json.join("\n"), filename);
    }

    tablePDFDownload(event){
        event.preventDefault();
        // this.export_table_to_json("report.json");
        this.export_table_to_pdf("report.pdf");
        this.log.debug("json Download");
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
            var subHeading = ["Stock", "Factory Recieve", "Delivary Chalan No.", "Sell"];
            return subHeading.map(function(subHead, ind){
                return (
                    <th key={ind} style={headerDesign}>{subHead}</th>
                );
                }
            );
        });
        
        var dataRows = this.state.dataList.reverse().map(function(data, index){
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
                                <button className="btn btn-xs btn-danger" onClick={this.tablePDFDownload}>Export to PDF</button>
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