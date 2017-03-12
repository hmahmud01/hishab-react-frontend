import React, {Component} from  'react';
import Cookies from 'js-cookie';
import AutoSuggestText from './AutoSuggestText';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


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
            phoneNumber: "0101",
            orgdata: []
        };
        this.onUserAddClicked = this.onUserAddClicked.bind(this);
    }
    
    componentWillReceiveProps(props){
        if (props.formtype === "1"){
            this.setState({buyerVal: props.phone});
        }else{
            this.setState({sellerVal : props.phone});
        }
    }
    
    onUserAddClicked(event){
        
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
                "uphone": document.getElementById("ph_number").value, 
                "uname": document.getElementById("name").value,
                "utype": 0,
                "uadr": document.getElementById("address1").value + " " + document.getElementById("address2").value, 
                "uorg": document.getElementById("organization").value,
                "uid": Cookies.get("uid"),
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('http://192.168.5.2:8000/api/v1/register', params);
        
    }

	render(){
        const divStyle = {
          width: '100%',          
        };
        
        var audio = this.props.audio;
        if (audio !== undefined)
            audio = "http://192.168.5.2:8000"+audio[0];
		return (
            <div>
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
                                        <div className="form-group"><label className="col-lg-2 control-label">Buyer</label>
                                            <div className="col-lg-8">
                                                <AutoSuggestText 
                                                    id="buyer"
                                                    placeholder="Buyer"
                                                    datalist="buyerlist"
                                                    value={this.state.buyerVal}
                                                    url="http://192.168.5.2:8000/api/v1/transaction/search/user"
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
                                                    datalist="sellerlist"
                                                    value={this.state.sellerVal}
                                                    url="http://192.168.5.2:8000/api/v1/transaction/search/user"
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
                                                    <audio style={divStyle} ref="audio_tag" src={audio} controls />
                                                </h2>                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>


                <div id="modal-user" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add Seller/ Buyer</h4>
                            </div>

                            <form className="form-horizontal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="form-group"><label className="col-sm-4 control-label">Phone Number</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="ph_number" placeholder="Phone Number" className="form-control" />
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
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>                                
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onUserAddClicked}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
		);
	}
}

export default UserForm; 