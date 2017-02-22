import React, {Component} from 'react';
import Row from './Row';
import Col from './Col';

class RadioInput extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return(
			<Row cName="row">
                <Col className="sm-10">
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