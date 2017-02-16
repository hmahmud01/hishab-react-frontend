import React, {Component} from  'react'
import sample from '../pages/sound/sample.mp3';

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData : {}
        };
    }
    
	render(){
        const divStyle = {
          width: '100%',          
        };
		return (
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Vocie And User</h5>
                    </div>
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-6">
                                <form className="form-horizontal">
                                    <h5>Caller Information</h5>
                                        <div className="form-group"><label className="col-sm-4 control-label">Phone Number</label>
                                        <div className="col-sm-8">
                                            <input type="text" placeholder="Phone Number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" placeholder="Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Address</label>
                                        <div className="col-sm-8">
                                            <input type="text" placeholder="Address" className="form-control" />
                                            <input type="text" placeholder="Address" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Organization</label>
                                        <div className="col-sm-8">
                                            <input type="text" placeholder="Organization" className="form-control" />
                                        </div>
                                    </div>  
                                    <div className="hr-line-dashed"></div>
                                    <button type="button" className="btn btn-primary pull-right">Submit</button>
                                    <a data-toggle="modal" className="btn btn-warning" href="#modal-error">Report Error</a>
                                </form>
                            </div>
                            <h5>Call Information</h5>
                            <div className="col-lg-3">
                                <div className="widget style1 lazur-bg">
                                    <div className="row">
                                        <div className="col-xs-12 text-right">
                                            <span> <i className="fa fa-phone"></i> Call From </span>
                                            <h2 className="font-bold">01797123123</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="widget style1 yellow-bg">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <span className="pull-right"> <i className="fa fa-music"></i> Audio </span>
                                            <h2 className="font-bold">
                                                <audio style={divStyle} ref="audio_tag" src={sample} controls />
                                            </h2>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default RegistrationForm; 