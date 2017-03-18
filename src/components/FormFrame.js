import React, {Component} from 'react';
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
                            { this.props.onClick !== undefined &&
                                <div className="ibox-tools">
                                    <a className="btn btn-xs btn-primary pull-right" onClick={this.props.onClick}>Calculate</a>      
                                </div>
                            }                            
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