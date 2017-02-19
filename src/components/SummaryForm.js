import React, {Component} from  'react'
import sample from '../pages/sound/sample.mp3';

class SummaryForm extends Component {

	render(){

		return (
            <div>
                <div className="col-lg-6 col-lg-offset-6">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Transaction summary</h5>
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
                                    <div className="col-sm-10"><input type="text" id="paid" className="form-control" /></div>
                                </div>

                                <div className="form-group"><label className="col-sm-2 control-label">Due</label>
                                    <div className="col-sm-10"><input type="text" id="due" className="form-control" /></div>
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
                                            <div><label> <input type="radio" value="Audio Issue" name="audio" /> <i></i> Audio Issue </label></div>
                                            <div><label> <input type="radio" value="System error" name="system" /> <i></i> System Error </label></div>
                                            <div><label> <input type="radio" value="Insufficient Data" name="insufficient" /> <i></i> Insufficient Data </label></div>
                                            <div><label> <input type="radio" value="Others" name="others" /> <i></i> Others </label></div>

                                            <div><label> <input type="radio" value="option1" name="a" /> <i></i> one </label></div>
                                            <div><label> <input type="radio" checked="" value="option2" name="a" /> <i></i> two checked </label></div>
                                            <div><label> <input type="radio" checked="" value="option2" /> <i></i> three checked and disabled </label></div>
                                            <div><label> <input type="radio" disabled="" name="a" /> <i></i> four disabled </label></div>
                                            
                                        </div>                                       
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
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