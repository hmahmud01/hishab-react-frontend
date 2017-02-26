import React, {Component} from  'react'
import $ from 'jquery';
import Cookies from 'js-cookie';
import AutoSuggestText from './AutoSuggestText';

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData : {},
            isError: false,
            message: "None",
            alertType: "success",
            phoneNumber: "0101",
            orgdata: []
        };
        this.onRegistrationClicked = this.onRegistrationClicked.bind(this);
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }

    onRegistrationClicked(event){
        event.preventDefault();
        
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/register',
            data: {
                "tid": this.props.transId,
                "uphone": document.getElementById("ph_number").value, 
                "uname": document.getElementById("name").value,
                "utype": 0,
                "uadr": document.getElementById("address1").value + " " + document.getElementById("address2").value, 
                "uorg": document.getElementById("organization").value,
                "uid": Cookies.get("uid"),
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
        var listItems = this.state.orgdata.map(
            (listItem, index) => 
            <option key={index} value={listItem.org_name}>{listItem.org_id}</option>
        );
        const divStyle = {
          width: '100%',          
        };
		return (
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Voice And User</h5>
                    </div>
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-6">
                                <form className="form-horizontal">
                                    <h5>Caller Information</h5>
                                        <div className="form-group"><label className="col-sm-4 control-label">Phone Number</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="ph_number" className="form-control" value={this.props.phone} />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="name" placeholder="Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Address</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="address1" placeholder="Address" className="form-control" />
                                            <input type="text" id="address2" placeholder="Address" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="col-sm-4 control-label">Organization</label>
                                        <div className="col-sm-8">
                                            <AutoSuggestText 
                                                    id="organization"
                                                    placeholder="Organization"
                                                    datalist="orglist"
                                                    url="http://192.168.5.2:8000/api/v1/transaction/search/organization"
                                                >
                                                    <span className="input-group-btn"> 
                                                        <a data-toggle="modal" className="btn btn-primary" href="#modal-user">
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </a>
                                                    </span>
                                                </AutoSuggestText>
                                        </div>
                                    </div>  
                                    <div className="hr-line-dashed"></div>
                                    <button type="button" className="btn btn-primary pull-right" onClick={this.onRegistrationClicked}>Submit</button>
                                    <a data-toggle="modal" className="btn btn-warning" href="#modal-error">Report Error</a>
                                </form>
                            </div>
                            <h5>Call Information</h5>
                            <div className="col-lg-3">
                                <div className="widget style1 lazur-bg">
                                    <div className="row">
                                        <div className="col-xs-12 text-right">
                                            <span> <i className="fa fa-phone"></i> Call From </span>
                                            <h2 className="font-bold">{this.props.phone}</h2>
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
                                                <audio style={divStyle} ref="audio_tag" src={this.props.audio} controls />
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