import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Alert from '../components/Alert';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Logger from '../utils/Logger';
import Modal from './Modal';

class TranslationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isError: false,
            message: "None",
            alertType: "success"
        };
        this.onTranslationClicked = this.onTranslationClicked.bind(this);
        this.onErrorClicked = this.onErrorClicked.bind(this);
        this.log = new Logger();
    }

    onTranslationClicked(event){
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
                "uid": Cookies.get("uid"),
                "tid": this.props.tid,
                "tda": document.getElementById("trans_data").value
            };
        
        var ajax = new Ajax(callback);
        ajax.postData('translation/submit', params);
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
                "tid": this.props.tid,
                "error": $('input[name="errorS"]:checked').val(), 
            };

        console.log(params);
        var ajax = new Ajax(callback);
        ajax.postData('forms/error/translation', params);
    }
    

	render(){
        const divStyle = {
          width: '100%',          
        };
        var audio = this.props.audio;
        var results = undefined;
        if (audio !== undefined){
            results = audio.map(function(audioLink, index){
                var aud = new Ajax().baseUrl+audioLink;
                return (
                    <audio key={index} style={divStyle} ref="audio_tag" src={aud} controls />
                );
            });
        }
		return (
            <div>
                {this.state.isError === true &&
                    <Alert message={this.state.message} type={this.state.alertType}/>
                }
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
                                        <div className="form-group"><label className="col-lg-2 control-label">Translate</label>
                                            <div className="col-lg-10">
                                                <textarea id="trans_data" name="audio_translate" cols="50" rows="5"></textarea>
                                            </div>
                                        </div>
                                        <div className="hr-line-dashed"></div>
                                        <button type="button" className="btn btn-primary pull-right" onClick={this.onTranslationClicked}>Submit</button>
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

export default TranslationForm; 