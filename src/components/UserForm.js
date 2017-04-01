import React, {Component} from  'react';
import Cookies from 'js-cookie';
import $ from 'jquery';
import AutoSuggestText from './AutoSuggestText';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';
import TextInput from './TextInput';
import Alert from './Alert';
import Logger from '../utils/Logger';


class UserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            buyerVal : "",
            sellerVal : "",
            formData : {},
            isError: false,
            message: "None",
            alertType: "success",
            orgdata: []
        };
        this.onUserAddClicked = this.onUserAddClicked.bind(this);
        this.onOrganizationAddClicked = this.onOrganizationAddClicked.bind(this);
        this.log = new Logger();
    }
    
    componentWillReceiveProps(props){
        this.log.debug(props.formtype)
        if (props.formtype === "1"){
            if (props.buyer !== undefined && props.seller !== undefined){
                this.setState({buyerVal: props.buyer, sellerVal : props.seller});
            }else{
                this.setState({buyerVal: props.phone});
            }                
        }else if(props.formtype === "2"){
            if (props.buyer !== undefined && props.seller !== undefined){
                this.setState({buyerVal: props.buyer, sellerVal : props.seller});
            }else{
                this.setState({sellerVal: props.phone});
            }
        }else{
            if (props.buyer !== undefined && props.seller !== undefined)
                this.setState({buyerVal: props.buyer, sellerVal : props.seller});            
        }
    }
    
    onUserAddClicked(event){
        
        var callback = function(response, status){
            var data = new Json(response);
            if (status === "success"){
                this.setState({isError: false, message: data.get('msg'), alertType: "success"});
            }else if (status === "error"){
                alert("Phone Number Matches with Existing User");
                this.setState({isError: true, message: data.get('msg'), alertType: "danger"});
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
                alert("Invalid Input. Please Check Input Fields Carefully");
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

	render(){
        const divStyle = {
          width: '100%',          
        };
        

        var audio = this.props.audio;
        var results = undefined;
        if (audio !== undefined)
            results = audio.map(function(audiolink, index){
                var aud = new Ajax().baseUrl+audiolink;
                return(
                    <audio key={index} style={divStyle} ref="audio_tag" src={aud} controls />
                );
            });
        
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
                                        <div className="form-group"><label className="col-lg-2 control-label">Buyer</label>
                                            <div className="col-lg-8">
                                                <AutoSuggestText 
                                                    id="buyer"
                                                    placeholder="Buyer"
                                                    value={this.state.buyerVal}
                                                    datalist="buyerlist"
                                                    url="transaction/search/user"
                                                >
                                                    <span className="input-group-btn">
                                                        <a data-toggle="modal" className="btn btn-primary" href="#modal-user">
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </a> 
                                                    </span>
                                                </AutoSuggestText>
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-lg-2 control-label">Seller</label>
                                            <div className="col-lg-8">
                                                <AutoSuggestText 
                                                    id="seller"
                                                    placeholder="Seller"
                                                    value={this.state.sellerVal}
                                                    datalist="sellerlist"
                                                    url="transaction/search/user"
                                                >
                                                    <span className="input-group-btn"> 
                                                        <a data-toggle="modal" className="btn btn-primary" href="#modal-user">
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </a> 
                                                    </span>
                                                </AutoSuggestText>
                                            </div>
                                        </div>
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


                <Modal id="modal-user" title="Add Seller/Buyer" discard="Exit" success="Submit" onClick={this.onUserAddClicked}>
                    <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                    <TextInput id="ph_number" label="Phone Number" placeholder="Phone Number"/>
                    <TextInput id="name" label="Name" placeholder="Name"/>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">User Type</label>
                        <div className="col-sm-8">
                            <select className="form-control" name="type" id="type">
                                <option value="0">INDIVIDUAL</option>
                                <option value="1">ORGANIZATION REPRESENTATIVE</option>
                                <option value="2">ORGANIZATION ADMIN</option>
                                <option value="3">TRANSCRIBER</option>
                            </select>                                        
                        </div>
                    </div>

                    <div className="form-group"><label className="col-sm-4 control-label">Organization</label>
                        <div className="col-sm-8">
                            <AutoSuggestText 
                                id="organization"
                                placeholder="Organization"
                                datalist="orglist"
                                url="transaction/search/organization"
                            >
                                <span className="input-group-btn"> 
                                    <a data-toggle="modal" className="btn btn-primary" href="#modal-org">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </AutoSuggestText>
                        </div>
                    </div> 

                    <TextInput id="address1" label="Address" placeholder="Address"/>
                    <TextInput id="address2" label="Address" placeholder="Address"/>
                </Modal>

                <Modal id="modal-org" title="Add Orgnization" discard="Exit" success="Submit" onClick={this.onOrganizationAddClicked}>
                    <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                    <TextInput id="org_name" label="Organization Name" placeholder="Organization Name"/>
                    <TextInput id="org_code" label="Organization Code" placeholder="Organization Code"/>
                    <TextInput id="org_trade" label="Trade License Number" placeholder="Trade License Number"/>
                    <TextInput id="org_email" type="email" label="Email" placeholder="Email"/>
                    <TextInput id="org_phone" label="Official Phone Number" placeholder="Official Phone Number"/>
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
                    <TextInput id="org_add1" label="Address" placeholder="Address"/>
                    <TextInput id="org_add2" label="Address" placeholder="Address"/>
                </Modal>

            </div>
		);
	}
}

export default UserForm; 