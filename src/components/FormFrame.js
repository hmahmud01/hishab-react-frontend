import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Row from './Row';
import Col from './Col';



class FormFrame extends Component{
	constructor(props){
		super(props);
		this.state = {};
	} 


	render(){
		return(
            <div>
                <Col cName="lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>{this.props.head}</h5>
                        </div>
                        <div className="ibox-content">
                            <Row cName="row">
                                <Col cName="lg-12">
                                    {this.props.children}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </div>


		);		
	}

}


export default FormFrame;