import React, {Component} from  'react';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import c3 from 'c3';
import $ from 'jquery';

class CallLog extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : [{
				    "duration": 0,
				    "aid": "1490680956.12",
				    "call_type": "1",
				    "date": "2017-03-28 06:02",
				    "phone": "01817061650"
				},
			],
			vData : [
			            ['data1', 1030, 1200, 1100, 1400, 1150, 1250],
			            ['data2', 2130, 2100, 2140, 2200, 2150, 1850]
			        ]
			        

		};
		this.log = new Logger();
		this.smsClick = this.smsClick.bind(this);
		this.boxClick = this.boxClick.bind(this);
	}

	smsClick(key, text){
		this.log.debug(key);
		this.log.debug(text);
	}

	boxClick(event){
		event.preventDefault();
		var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
	}

	componentDidMount(){
		var callback = function(response, status){
			var data = new Json(response);
		    if (status === "success"){
				this.log.debug(data.getData());
				this.log.debug(response);
				this.setState({data: data.getData()});
		    }else if (status === "error"){
		
		    }
		}.bind(this);
		
		var params = {
			"uid": Cookies.get("uid")
		};
		
		var ajax = new Ajax(callback);
		ajax.getData('http://192.168.5.70:8080/API/call_log/', params);


		var chart = c3.generate({
			data : {
				columns: this.state.vData,
				type: 'bar',
				colors: {
		            data1: '#86D0C2',
		            data2: '#FFAE70'
		        },
			},
			axis: {
				x: {
					type: 'categorized'
				}
			},
			bar: {
				width: {
					ratio: 0.3
				},
			}
		});

	}

	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem phone={listItem.phone} aid={listItem.aid} date={listItem.date} call_type={listItem.call_type} duration={listItem.duration} onClick={this.smsClick}/>
		);

		return(
			<div>
				<div className="row">
				    <div className="col-lg-12">
				    <h1>Call Log</h1>
				        <div className="ibox float-e-margins">
				        	<div className="ibox-title">
			                    <h5>Call Log Details</h5>
			                    <div className="ibox-tools">
			                        <a className="collapse-link">
			                            <i className="fa fa-chevron-up" onClick={this.boxClick}></i>
			                        </a>
			                    </div>
			                </div>
					        <div className="ibox-content">
						        <table id="sales-report" className="table table-striped table-bordered table-hover">
						            <thead>
						                <tr>			                            
				                            <th>Phone Number</th>
				                            <th>Asterisk Id</th>
				                            <th>Date</th>
				                            <th>Call Type</th>
				                            <th>duration</th>
				                        </tr>
						            </thead>
						            <tbody>
						            	{listItems}
						            </tbody>
						        </table>
					    	</div>
						</div>
					</div>
				</div>
				<div className="row">
				    <div className="col-lg-12">
				    <h1>Call Log Chart</h1>
				        <div className="ibox float-e-margins">
					        <div className="ibox-title">
			                    <h5>Chart</h5>
			                    <div className="ibox-tools">
			                        <a className="collapse-link">
			                            <i className="fa fa-chevron-up"></i>
			                        </a>
			                    </div>
			                </div>
					        <div className="ibox-content">
					        	<div id="chart"></div>
					    	</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



class ListItem extends Component{
	constructor(props){
        super(props);
        this.state = {};
        this.resendClick = this.resendClick.bind(this);
    }

    resendClick(event){
    	event.preventDefault();
    	this.props.onClick(this.props.tid, this.props.text);
    }

	render(){
		return(
			<tr>
				<td>{this.props.phone}</td>
				<td>{this.props.aid}</td>
				<td>{this.props.date}</td>
				<td>{this.props.call_type}</td>
				<td>{this.props.duration}</td>
			</tr>
		);
	}
}


export default CallLog; 