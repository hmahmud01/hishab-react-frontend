import React, {Component} from  'react';
import $ from 'jquery';

class SummaryForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onErrorClicked = this.onErrorClicked.bind(this);
    }


    //make url to accept the error report submit
    onErrorClicked(event){
        event.preventDefault();
        console.log($('input[name="error"]:checked').val());
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/error',
            data: {
                "tid": this.props.transId,
                "error" : $('input[name="error"]:checked').val(),
            },
            success: function(response){
                console.log(response);
                var data = $.parseJSON(response);
                this.setState({isError: false, message: data.msg, alertType: "success"});
            }.bind(this),
            error: function(response){
                console.log(response.responseText);
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }.bind(this),
        });
    }

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
                                            <div><label> <input type="radio" name="error" value="opt1" /> one </label></div>
                                            <div><label> <input type="radio" name="error" value="opt2" /> two </label></div>
                                            <div><label> <input type="radio" name="error" value="opt3" /> three </label></div>
                                            <div><label> <input type="radio" name="error" value="opt4" /> 4 </label></div>
                                            
                                        </div>                                       
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onErrorClicked}>Save changes</button>
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