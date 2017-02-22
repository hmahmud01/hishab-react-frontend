import React, {Component} from 'react';
import Row from './Row';
import Col from './Col';
import $ from 'jquery';

class RadioInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
	}

	getData(){
		$.ajax({
			method: 'get',
			url: this.props.url,
			data: {
				id: "1",
				value: "value"
			},
			success: function(response){
				console.log(response);
				var data = $.parseJSON(response)
				this.setState({data : data})
			}.bind(this),
			error: function(response){
				console.log(response)
			}


		});
	}

	render(){
		return(
			<Row cName="row">
                <Col className="sm-12">
                    <div><label> <input type="radio" value="option1" name="a" /> one </label></div>
                    <div><label> <input type="radio" value="option2" name="a" /> two </label></div>
                    <div><label> <input type="radio" value="option3" name="a" /> three </label></div>
                    <div><label> <input type="radio" value="option4" name="a" /> <i></i> four </label></div>                                            
                </Col>                                       
            </Row>

		);
	}

}

export default RadioInput;