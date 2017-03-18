import React, {Component} from  'react';
import $ from 'jquery';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class SummaryForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.update = this.update.bind(this);
    }

    update() {
        var due = 0;
        due = $("#total").val() - $("#paid").val();
        $("#due").val(due);
    }


	render(){

		return (
            <div>
                <div className="col-lg-6 col-lg-offset-6">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Transaction summary</h5>
                            <div className="ibox-tools">
                                <a className="btn btn-primary pull-right" onClick={this.props.onSummary}>Calculate</a>      
                            </div>
                        </div>
                        <div className="ibox-content">                                            
                            <form className="form-horizontal">                        
                                <div className="form-group"><label className="col-sm-2 control-label">Total</label>
                                    <div className="col-sm-10"><input type="text" id="total" disabled="" className="form-control" /></div>
                                </div>

                                <div className="form-group"><label className="col-sm-2 control-label">Discount</label>
                                    <div className="col-sm-10"><input type="text" id="discount" className="form-control" /></div>
                                </div>

                                <div className="form-group"><label className="col-sm-2 control-label">Paid</label>
                                    <div className="col-sm-10"><input type="text" id="paid" className="form-control" onKeyUp={this.update}/></div>
                                </div>

                                <div className="form-group"><label className="col-sm-2 control-label">Due</label>
                                    <div className="col-sm-10"><input type="text" id="due" className="form-control" onKeyUp={this.update}/></div>
                                </div>             
                            </form>   
                            <div className="hr-line-dashed"></div>
                            <button type="button" className="btn btn-primary pull-right" onClick={this.props.onSubmit}>Submit</button>
                            <a data-toggle="modal" className="btn btn-warning" href="#modal-error">Report Error</a>
                            
                        </div>
                    </div>
                </div>


                <div id="modal-error" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Error Type</h4>
                            </div>

                            <form className="form-horizontal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <div><label> <input type="radio" value="0" name="errorS"/> Audio Issue </label></div>
                                            <div><label> <input type="radio" value="1" name="errorS" /> System Error </label></div>
                                            <div><label> <input type="radio" value="2" name="errorS" /> Insufficient Data </label></div>
                                            <div><label> <input type="radio" value="3" name="errorS" /> Others </label></div>                                            
                                        </div>                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onError}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

		);
	}
}

export default SummaryForm; 