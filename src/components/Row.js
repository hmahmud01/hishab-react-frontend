import React, {Component} from 'react';

class Row extends Component{

	render(){
		return(
			<div className={this.props.cName} id={this.props.iName}>
				{this.props.children}
			</div>
		);
	}

}

export default Row;