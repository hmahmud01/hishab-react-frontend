import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import sample from '../pages/sound/sample.mp3';

class UserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            buyerValue : this.props.buyer,
            sellerValue: this.props.seller,
            data : []
        };
        this.handleUserSearch = this.handleUserSearch.bind(this)
    }
    
    handleUserSearch(event){
        var val = event.target.value+event.key;
        console.log(val);
        console.log(this.refs.buyer.value);
        
        if (val.length > 2){
            $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/search/user',
            data: {
                "uid": Cookies.get("uid"),
                "search": val,
            },
            success: function(response) {
                console.log(response);
                var data = $.parseJSON(response)
                this.setState({data : data});
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
        });
        }
    }
    
	render(){
        const divStyle = {
          width: '100%',          
        };
        var listItems = this.state.data.map(
            (listItem, index) => 
            <option key={index} value={listItem.user_phone}>{listItem.user_name}</option>
        );
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
                                                <div className="input-group">
                                                    <input list="buyerlist" type="text" placeholder="Buyer" id="buyer" ref="buyer" className="form-control" value={this.state.buyerValue} onKeyPress={this.handleUserSearch}/>
                                                    <datalist id="buyerlist">
                                                        {listItems}
                                                    </datalist>
                                                    <span className="input-group-btn"> <a data-toggle="modal" className="btn btn-primary" href="#modal-user"><i className="fa fa-plus" aria-hidden="true"></i></a> 
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-lg-2 control-label">Seller</label>
                                            <div className="col-lg-8">
                                                <div className="input-group">
                                                <input list="sellerlist" type="text" placeholder="Seller" id="seller" ref="seller" className="form-control" value={this.state.sellerValue} onKeyPress={this.handleUserSearch}/>
                                                <datalist id="sellerlist">
                                                        {listItems}
                                                </datalist>
                                                <span className="input-group-btn"> 
                                                <a data-toggle="modal" className="btn btn-primary" href="#modal-user"><i className="fa fa-plus" aria-hidden="true"></i></a> </span></div>
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
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>                                
                                    <button type="button" className="btn btn-primary">Submit</button>
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