import React, {Component} from  'react';
import $ from 'jquery';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';
import TextInput from './TextInput';
import FormInput from './FormInput';
import FormFrame from './FormFrame';
import Logger from '../utils/Logger';

class SummaryForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            val: 0
        };
        this.update = this.update.bind(this);
        this.onDone = this.onDone.bind(this);
        this.log = new Logger();
    }

    update() {
        console.log("updating")
        var due = 0;
        due = $("#total").val() - $("#paid").val();
        $("#due").val(due);
    }

    onDone(){
        console.log("inside On done");
        if(document.getElementById('transcribeButtonSubmit').disabled === true){
            console.log("button is disabled");
        }

        $('#transcribeButtonSubmit').one("click", function(){
            console.log("transcribe button clicked");
            alert("once");
            document.getElementById('transcribeButtonSubmit').disabled = true;
            this.props.onSubmit;
        });
    }


	render(){

		return (
            <div>
                <div className="col-lg-6 col-lg-offset-6">
                    <FormFrame head="Transaction summary" onClick={this.props.onSummary}>
                        <form className="form-horizontal">    
                            {this.props.callState}   
                            <FormInput id="total" label="Total" placeholder="Total" value="0"/>       
                            <FormInput id="discount" label="Discount" placeholder="Discount" value="0"/>
                            <FormInput id="paid" label="Paid" placeholder="Paid" Key={this.update} value="0"/>
                            <FormInput id="due" label="Due" placeholder="Due" Key={this.update} value="0"/>                     
                        </form>   
                        <div className="hr-line-dashed"></div>

                        <button type="button" id="transcribeButtonSubmit" className="btn btn-primary pull-right" onClick={this.props.onSubmit}>Submit</button>
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