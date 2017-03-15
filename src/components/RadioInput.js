import React, {Component} from 'react';
import Row from './Row';
import Col from './Col';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class RadioInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
	}

	getData(){

		var callback = function(response, status){
		    if (status == "success"){	
		    	var data = new Json(response);
				this.setState({data : data});		
		    }else if (status == "error"){
		
		    }
		}.bind(this);
		
		var params = {
				id: "1",
				value: "value"
			};
		
		var ajax = new Ajax(callback);
		ajax.getData(this.props.url, params);
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