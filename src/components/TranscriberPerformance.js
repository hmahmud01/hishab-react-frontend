import React, {Component} from  'react';

class TranscriberPerformance extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : [
				{id: 1, name: "Faysal", avg_trans: "70", total_trans: "300", avg_time: "45.0"},
				{id: 1, name: "Obaidul", avg_trans: "11", total_trans: "12", avg_time: "4500.0"},
				{id: 1, name: "Arif", avg_trans: "65", total_trans: "391", avg_time: "30.0"},
			]
		};
	}
	render(){
		const listItems = this.state.data.map(
			(listItem) => 
				<ListItem id={listItem.id} name={listItem.name} avg_trans={listItem.avg_trans} total_trans={listItem.total_trans} avg_time={listItem.avg_time} />
		);

		return(
			<div className="row">
			    <div className="col-lg-12">
			    <h1>Transcriber Performance</h1>
			        <div className="ibox float-e-margins">
				        <div className="ibox-content">
					        <table id="sales-report" className="table table-striped table-bordered table-hover">
					            <thead>
					                <tr>
			                            <th>Transcriber ID</th>
			                            <th>Transcriber Name</th>
			                            <th>Avrage Transaction(Daily)</th>
			                            <th>Total Transaction</th>
			                            <th>Average Time take</th>
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
    	console.log("sms resent: ");
    	console.log(event);
    }

	render(){
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.name}</td>
				<td>{this.props.avg_trans}</td>
				<td>{this.props.total_trans}</td>
				<td>{this.props.avg_time}</td>
			</tr>
		);
	}
}


export default TranscriberPerformance; 