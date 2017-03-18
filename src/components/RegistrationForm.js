import React, {Component} from  'react'
import $ from 'jquery';
import Cookies from 'js-cookie';
import AutoSuggestText from './AutoSuggestText';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData : {},
            isError: false,
            message: "None",
            alertType: "success",
            phoneNumber: "0101",
            orgdata: [],
            data: [],

        };
        this.onRegistrationClicked = this.onRegistrationClicked.bind(this);
        this.onOrganizationAddClicked = this.onOrganizationAddClicked.bind(this);
        this.onErrorClicked = this.onErrorClicked.bind(this);
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    componentWillReceiveProps(newProps){
        this.setState({
            audio: newProps.data.cau, 
            phone: newProps.data.cin,
            username: newProps.data.uda.una,
            usertype: newProps.data.uda.uty,
            useraddr: newProps.data.uda.uad === null ? undefined : newProps.data.uda.uad,
        });
        if (newProps.data.uda.hasOwnProperty('uor')){
            this.setState({
                orgId: newProps.data.uda.uor.oid,
                orgName: newProps.data.uda.uor.ona
            });
        }
    }

    onRegistrationClicked(event){
        event.preventDefault();

        var callback = function(response, status){
            if (status == "success"){
                var data = $.parseJSON(response);
                this.setState({isError: false, message: data.msg, alertType: "success"});
                window.location.hash = "#/home";
                window.location.reload();
            }else if (status == "error"){
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
                window.location.hash="#/home";
            }
        }.bind(this);
        
        var params = {
                "tid": this.props.transId,
                "uphone": document.getElementById("ph_number").value, 
                "uname": document.getElementById("name").value,
                "utype": $('#type :selected').val(),
                "uadr": document.getElementById("address1").value + " " + document.getElementById("address2").value, 
                "uorg": document.getElementById("organization").value,
                "uid": Cookies.get("uid"),
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('register', params);
    
    }

    onOrganizationAddClicked(event){
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({isError: false, message: data.get('msg'), alertType: "success"});
            }else if (status === "error"){
                this.setState({isError: true, message: data.get('msg'), alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "tid": this.props.transId,                
                "oname": document.getElementById("org_name").value,
                "ocode": document.getElementById("org_code").value,
                "otrade": document.getElementById("org_trade").value,
                "oemail": document.getElementById("org_email").value,
                "ophone": document.getElementById("org_phone").value, 
                "otype": $('#org_type :selected').val(),
                "oadr": document.getElementById("org_add1").value + " " + document.getElementById("org_add2").value, 
                "uid": Cookies.get("uid"),
            };
        
        var ajax = new Ajax(callback);
        ajax.postData('transaction/submit/organization', params);
        
    }


    onErrorClicked(event){
        event.preventDefault();

        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                window.location.hash="#/home";
                window.location.reload();
            }else if (status === "error"){
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "tid": this.props.transId,
                "error": $('input[name="errorS"]:checked').val(), 
            };

        console.log(params);
        var ajax = new Ajax(callback);
        ajax.postData('forms/error/registration', params);
    }
    
	render(){
        const divStyle = {
          width: '100%',          
        };
        var audio = this.state.audio;
        var results = undefined;
        if (audio !== undefined){
            results = audio.map(function(audioLink, index){
                var aud = new Ajax().baseUrl+audioLink;
                return (
                    <audio key={index} style={divStyle} ref="audio_tag" src={aud} controls />
                );
            });
        }
        
        var userTypes = ['INDIVIDUAL', 'ORGANIZATION REPRESENTATIVE', 'ORGANIZATION ADMIN', 'TRANSCRIBER']
        var typeOptions = userTypes.map(function(type, index){
            if (this.state.usertype !== undefined && this.state.usertype.toString() === index.toString())
                return (<option key={index} selected value={index}>{type}</option>);
            else
                return (<option key={index} value={index}>{type}</option>);
        }.bind(this));
		return (
            <div>
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
                                                <input type="text" id="ph_number" className="form-control" value={this.state.phone} />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="name" placeholder="Name" className="form-control" value={this.state.username}/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">User Type</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" name="type" id="type">
                                                    {typeOptions}
                                                </select>                                        
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Address</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="address1" placeholder="Address" className="form-control" value={this.state.useraddr}/>

                                                <input type="text" id="address2" placeholder="Address" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Organization</label>
                                            <div className="col-sm-8">
                                                <AutoSuggestText 
                                                    id="organization"
                                                    placeholder="Organization"
                                                    value={this.state.orgName}
                                                    datalist="orglist"
                                                    url="transaction/search/organization">
                                                    <span className="input-group-btn"> 
                                                        <a data-toggle="modal" className="btn btn-primary" href="#modal-org">
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
                                                <h2 className="font-bold">{this.state.phone}</h2>
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
                                                    {results}
                                                </h2>                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>

                <div id="modal-org" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add Organization</h4>
                            </div>

                            <form className="form-horizontal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="form-group"><label className="col-sm-4 control-label">Organization Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_name" placeholder="Organization Name" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Organization Code</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_code" placeholder="Organization Code" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Trade License Number</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_trade" placeholder="Trade License Number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Email</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_email" placeholder="Email" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Official Phone</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_phone" placeholder="Official Phone Number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Orgnaization Type</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" name="org_type" id="org_type">
                                                    <option value="0">Grocery</option>
                                                    <option value="1">Distributor</option>
                                                    <option value="2">Telco</option>
                                                    <option value="3">Telco Distributor</option>
                                                </select>                                        
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Address</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="org_add1" placeholder="Address" className="form-control" />
                                                <input type="text" id="org_add2" placeholder="Address" className="form-control" />
                                            </div>
                                        </div>                                  
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>                                
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onOrganizationAddClicked}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Modal id="modal-error" title="Error Type" onClick={this.onErrorClicked}>
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

export default RegistrationForm; 