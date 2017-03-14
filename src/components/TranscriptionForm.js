import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';

class TranscriptionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            total : 0
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

        console.log(total);
        $("#total").val(total);
    }

    onTranscriptionClicked(event){
        event.preventDefault();
        
        var headers = this.refs.products.state.headerCollection;
        var products = this.refs.products.state.data;
        // var id = this.refs.products.state.idCollection;
        
        var output = []
        for (var i=0; i<products.length; i++)
            output[i] = {header: headers[i], value: products[i]};
        var data = {
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
        console.log(data);
        //TODO create a tabletojson function to store the table products in json format
         $.ajax({
             method: 'post',
             url: 'http://192.168.5.2:8000/api/v1/transcription/submit',
             data: data,
             header: {
                 "content-type": "application/json"
             },
             success: function(response){
                 console.log(response);
                 var data = $.parseJSON(response);
                 this.setState({isError: false, message: data.msg, alertType: "success"});
                 location.reload();
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
                <UserForm ref="userData" transId={this.props.transId} audio={this.props.data.audio} formtype={this.props.data.cty} phone={this.props.data.phone}/>
                <ProductForm ref="products"/>
                <SummaryForm ref="summaryData" onSubmit={this.onTranscriptionClicked} onSummary={this.onSummary}/> 
            </div>

		);
	}
}

export default TranscriptionForm;