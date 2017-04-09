import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';
import Alert from './Alert';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Logger from '../utils/Logger';

class TranscriptionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            total : 0,
            isError: false,
            alertType: "success",
            message: "None",
            buyer: "",
            seller: ""
        };
        this.onTranscriptionClicked = this.onTranscriptionClicked.bind(this);
        this.onSummary = this.onSummary.bind(this);
        this.onErrorClicked = this.onErrorClicked.bind(this);
        this.log = new Logger();
    }

    componentDidMount(){
        this.setState({startTime: new Date().getTime()})
    }


    componentWillReceiveProps(newProps){
        this.setState({
            audio: newProps.data.cau, 
            phone: newProps.data.cin,
            buyer: newProps.data.bin,
            seller: newProps.data.sin,
            cty: newProps.data.tty
        });

        if (newProps.data.hasOwnProperty('pda')){
            this.setState({
                product: newProps.data.pda
            });
        }
    }

    onSummary(){
        var headers = this.refs.products.state.headers;
        var products = this.refs.products.state.data;
        var total = 0;
        var logger = new Logger();
        var summary = [];
        for (var i=0; i<products.length; i++){
            summary[i] = {header: headers, value: products[i]};
        }

        for (var j=0; j<summary.length; j++){
            var multi = parseInt(summary[j].value[5]);
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

        var buy_call = document.getElementById("buyer").value;
        var sell_call = document.getElementById("seller").value;
        var endTime = new Date().getTime()

        if(buy_call!==sell_call){
            var callback = function(response, status){
                var data = new Json(response);
                if (status === "success"){
                    var data = $.parseJSON(response);
                    this.setState({isError: true, message: data.msg, alertType: "success"});
                    window.location.hash = "#/home";
                    window.location.reload();
                    console.log("not refreshed");
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
                "uid": Cookies.get("uid"),
                "sTime": this.state.startTime,
                'eTime': endTime
            };
            
            var ajax = new Ajax(callback);
            ajax.postData('forms/submit/transaction', params);            
        }else{
            this.setState({isError: true, message: "Buyer and Seller is same", alertType: "danger"});
        }        
    }


    onErrorClicked(event){
        event.preventDefault();
        var endTime = new Date().getTime()
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
                "tid": this.props.transId,
                "error": $('input[name="errorS"]:checked').val(), 
                "sTime": this.state.startTime,
                'eTime': endTime,
            };

        console.log(params);
        var ajax = new Ajax(callback);
        ajax.postData('forms/error/transaction', params);
    }

    
	render(){
        
		return (
            <div>
                <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                <UserForm ref="userData" transId={this.props.transId} buyer={this.state.buyer} seller={this.state.seller} audio={this.state.audio} formtype={this.state.cty} phone={this.state.phone}/>
                <ProductForm ref="products" product={this.state.product}/>
                <SummaryForm ref="summaryData" callState={this.props.callState} onSubmit={this.onTranscriptionClicked} onSummary={this.onSummary} onError={this.onErrorClicked}/>                 
            </div>

		);
	}
}

export default TranscriptionForm;