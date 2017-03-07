import React, {Component} from  'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';
import Testform from './Testform';

class TranscriptionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data
        };
        this.onTranscriptionClicked = this.onTranscriptionClicked.bind(this);
    }

    onTranscriptionClicked(event){
        event.preventDefault();
        
        var headers = this.refs.products.state.headerCollection;
        var products = this.refs.products.state.data;
        
        var output = []
        for (var i=0; i<products.length; i++)
            output[i] = {header: headers[i], value: products[i]};
        var data = {
                "buyer": document.getElementById("buyer").value,
                "seller": document.getElementById("seller").value,
                "products": output,
                "total": document.getElementById("total").value,
                "discount": document.getElementById("discount").value,
                "paid": document.getElementById("paid").value,
                "due": document.getElementById("due").value,
                "uid": Cookies.get("uid"),
                "tid": 1
        };
        console.log(data);
        //TODO create a tabletojson function to store the table products in json format
        $.ajax({
            method: 'post',
            url: 'http://192.168.5.2:8000/api/v1/transcription/submit',
            data: data,

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
        
		return (
            <div>
                <UserForm ref="userData" transId={this.props.transId} audio={this.props.data.audio} formtype={this.props.data.cty} phone={this.props.data.phone}/>
                <ProductForm ref="products"/>
                <SummaryForm ref="summaryData" onSubmit={this.onTranscriptionClicked}/> 
            </div>

		);
	}
}

export default TranscriptionForm; 