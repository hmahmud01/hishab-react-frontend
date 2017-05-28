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
                
                //**************************************************************
                // Date time sort
                var sortedDataList = data.getData()[1].trx.sort(function(a, b) {
                    var aSplit = a.sr.split("-");
                    var bSplit = b.sr.split("-");
                    var adjustedA = aSplit[2]+"-"+aSplit[1]+"-"+aSplit[0];
                    var adjustedB = bSplit[2]+"-"+bSplit[1]+"-"+bSplit[0];
                    a = ""+adjustedA;
                    b = ""+adjustedB;
                    return a>b ? 1 : a<b ? -1 : 0;
                    });
                //**************************************************************
                
                this.setState({productList:data.getData()[0].product, dataList:sortedDataList});
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
                <th key={index} colSpan="6" style={headerDesign}>{product}</th>
            );
        });
        
        var productSubHeaders = this.state.productList.map(function(product, index){
            var subHeading = ["Opening Stock", "Factory Recieved", "SR Chalan", "Damp/Redemption", "SR Return", "Closing Stock"];
            return subHeading.map(function(subHead, ind){
                return (
                    <th key={ind} style={headerDesign}>{subHead}</th>
                );
                }
            );
        });
        
        var dataRows = this.state.dataList.map(function(data, index){
            this.log.debug(data);
            return(
                <tr key={index}>
            	    <td >{data.sr}</td>
                    {
                        data.sales.map(function(individualData,idx){
                            var stock = 0;
                            var prevStock = 0;
                            this.log.debug("PrevData", individualData);
                            if (index > 0){
                                this.log.debug("Previous Data:");
                                //todo THIS IS FUCKED UP ############
                                var ind = this.state.dataList[index-1].sales[idx];
                                prevStock = ind[ind.length-1];
                                this.log.debug(prevStock);
                                // Please destroy this part ##################33
                            }
                            var factoryReceive = individualData[0];
                            var srChalan = individualData[1];
                            var srReturn = individualData[2];
                            var wastage = individualData[3];
                            stock =  parseInt(prevStock) + factoryReceive - srChalan + srReturn - wastage;
                            individualData.unshift(parseInt(prevStock));
                            individualData.splice(1,1, factoryReceive);
                            individualData.splice(2,1,srChalan);
                            individualData.splice(3,1,wastage);
                            individualData.splice(4,1,srReturn)
                            individualData.push(stock);
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


//                                <button className="btn btn-xs btn-warning" onClick={this.tableJsonDownload}>Export to Json</button>
//                                <button className="btn btn-xs btn-danger" onClick={this.tablePDFDownload}>Export to PDF</button>
            
		return (

			<div className="row">
			    <div className="col-lg-12">
			        <div className="ibox float-e-margins">
			            <div className="ibox-title">
			                <h5>Akij Inventory</h5>
                            <div className="btn-group pull-right">
                                <button className="btn btn-xs btn-primary" onClick={this.tableDownload}>Export to CSV</button>
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
                                    <tr><td>Total</td></tr>
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

// test !!!