import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';
import Alert from './Alert';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class TranscriptionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            total : 0,
            isError: false,
            alertType: "success",
            message: "None"
        };
        this.onTranscriptionClicked = this.onTranscriptionClicked.bind(this);
        this.onSummary = this.onSummary.bind(this);
    }

    onSummary(){
        var headers = this.refs.products.state.headers;
        var products = this.refs.products.state.data;
        var total = 0;

        var summary = [];
        for (var i=0; i<products.length; i++){
            summary[i] = {header: headers, value: products[i]};
        }

        for (var j=0; j<summary.length; j++){
            var multi = parseInt(summary[j].value[5], 10);
            total += (parseFloat(summary[j].value[3])*multi);
        }

        $("#total").val(total);
    }

    onTranscriptionClicked(event){
        event.preventDefault();
        
        var headers = this.refs.products.state.headerCollection;
        var products = this.refs.products.state.data;
        
        var output = [];
        for (var i=0; i<products.length; i++)
            output[i] = {header: headers[i], value: products[i]};

        var buy = document.getElementById("buyer").value;
        var sell = document.getElementById("seller").value;


        if(buy!==sell){
            var callback = function(response, status){
                var data = new Json(response);
                if (status === "success"){
                    var data = $.parseJSON(response);
                    this.setState({isError: true, message: data.msg, alertType: "success"});
                    window.location.hash="#/home";
                    window.location.reload();
                }else if (status === "error"){
                    var data = $.parseJSON(response.responseText);
                    this.setState({isError: true, message: data.msg, alertType: "danger"});
                }
            }.bind(this);
            
            var params = {
                "buyer": document.getElementById("buyer").value,
                "seller": document.getElementById("seller").value,
                "products": JSON.stringify(output),
                "summary": [],
                "total": document.getElementById("total").value,
                "discount": document.getElementById("discount").value,
                "paid": document.getElementById("paid").value,
                "due": document.getElementById("due").value,
                "tid": this.props.transId,
                "uid": Cookies.get("uid")
            };
            
            var ajax = new Ajax(callback);
            ajax.postData('http://app.hishab.co/api/v1/transcription/submit', params);            
        }else{
            this.setState({isError: true, message: "buyer and seller is same", alertType: "danger"});
        }
    }

    
	render(){
        
		return (
            <div>
                <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                <UserForm ref="userData" transId={this.props.transId} audio={this.props.data.audio} formtype={this.props.data.cty} phone={this.props.data.phone}/>
                <ProductForm ref="products"/>
                <SummaryForm ref="summaryData" onSubmit={this.onTranscriptionClicked} onSummary={this.onSummary}/>                 
            </div>

		);
	}
}

export default TranscriptionForm;