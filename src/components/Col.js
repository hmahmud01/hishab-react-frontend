import React, {Component} from 'react';

class Col extends Component{
	constructor(props){
		super(props);
		this.state = {
			value : "col-"+this.props.cName
		};

	}

	render(){
		return(
			<div className={this.state.value} id={this.props.iName}>
				{this.props.children}
			</div>
		);
	}

}

export default Col;