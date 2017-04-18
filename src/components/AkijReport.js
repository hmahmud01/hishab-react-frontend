import React, {Component} from  'react'
import $ from 'jquery';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
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
        this.tableJsonDownload = this.tableJsonDownload.bind(this);
        this.export_pdf = this.export_pdf.bind(this);
        this.setData = this.setData.bind(this);
        this.log = new Logger();
    }



    componentDidMount(){
        this.log.debug("Component Just Mounted");
        var callback = function(response, status){
            this.log.debug(response);
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

    setData(data){
        this.log.debug("Inside Akij Report");
        this.log.debug(data.getData());

        this.setState({productList:data.getData()[0].product, dataList:data.getData()[1].trx});
        this.forceUpdate();
        
        this.log.debug(this.state.productList);
        this.log.debug(this.state.dataList);
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

    tableJsonDownload(event){
        event.preventDefault();
        // this.export_table_to_json("report.json");
        this.export_table_to_json("report.json");
        this.log.debug("json Download");
        console.log("json");
    }

    export_pdf(event){
        event.preventDefault();
        this.log.debug("inside pdf");
        var pdf = new jsPDF('p', 'pt', 'letter');
        var source = $('#akij-report')[0];
        this.log.debug(source);
        var specialElementHandlers = {
            '#bypassme' : function (element, renderer){
                return true               
            }
        }

        var margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };

        pdf.fromHTML (
            source,
            margins.left,
            margins.top, {
                // 'width': margins.width,
                'elementHandlers' : specialElementHandlers
            },
            function(dispose){
                pdf.save('Test.pdf');
            }, margins
        );
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
        
        var productHeaders = this.state.productList.map(function(product, index){
            return(
                <th key={index} colSpan="3" style={headerDesign}>{product}</th>
            );
        });
        
        var productSubHeaders = this.state.productList.map(function(product, index){
            // this.log.debug(product);
            var subHeading = ["Buy", "Sell", "Return"];
            return subHeading.map(function(subHead, ind){
                return (
                    <th key={ind} style={headerDesign}>{subHead}</th>
                );
                }
            );
        });
        
        var dataRows = this.state.dataList.map(function(data, index){
            // this.log.debug(data);
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

            
//                                <button className="btn btn-xs btn-warning" onClick={this.tableJsonDownload}>Export to Json</button>
//                                <button className="btn btn-xs btn-danger" onClick={this.export_pdf}>Export to PDF</button>
		return (

			<div className="row">
			    <div className="col-lg-12">
			        <div className="ibox float-e-margins">
			            <div className="ibox-title">
			                <h5>Akij Reports</h5>                            
                            <div className="btn-group pull-right">
                                <button className="btn btn-xs btn-primary" onClick={this.tableDownload}>Export to CSV</button>
                            </div>
			            </div>
				        <div className="ibox-content" style={tableDesign} id="reportexp">
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