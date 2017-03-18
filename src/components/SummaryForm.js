import React, {Component} from  'react';
import $ from 'jquery';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';
import TextInput from './TextInput';
import FormInput from './FormInput';
import FormFrame from './FormFrame';

class SummaryForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.update = this.update.bind(this);
    }

    update() {
        console.log("updating")
        var due = 0;
        due = $("#total").val() - $("#paid").val();
        $("#due").val(due);
    }


	render(){

		return (
            <div>
                <div className="col-lg-6 col-lg-offset-6">
                    <FormFrame head="Transaction summary" onClick={this.props.onSummary}>
                        <form className="form-horizontal">       
                                <FormInput id="total" label="Total" placeholder="Total"/>       
                                <FormInput id="discount" label="Discount" placeholder="Discount"/>
                                <FormInput id="paid" label="Paid" placeholder="Paid" Key={this.update}/>
                                <FormInput id="due" label="Due" placeholder="Due" Key={this.update}/>                     
                        </form>   
                        <div className="hr-line-dashed"></div>
                        <button type="button" className="btn btn-primary pull-right" onClick={this.props.onSubmit}>Submit</button>
                        <a data-toggle="modal" className="btn btn-warning" href="#modal-error">Report Error</a> 
                    </FormFrame>
                </div>

                <Modal id="modal-error" title="Error Type" onClick={this.props.onError}>
                    <div className="col-sm-10">
                        <div><label> <input type="radio" value="0" name="errorS"/> Audio Issue </label></div>
                        <div><label> <input type="radio" value="1" name="errorS" /> System Error </label></div>
                        <div><label> <input type="radio" value="2" name="errorS" /> Insufficient Data </label></div>
                        <div><label> <input type="radio" value="3" name="errorS" /> Others </label></div>                                            
                    </div>                                        
                </Modal>
            </div>

		);
	}
}

export default SummaryForm; 