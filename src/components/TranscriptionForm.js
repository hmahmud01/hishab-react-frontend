import React, {Component} from  'react'
import sample from '../pages/sound/sample.mp3';
import $ from 'jquery';
import Cookies from 'js-cookie';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';
import FormBase from './FormBase';
import FormFrame from './FormFrame';
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
        
        var headers = this.refs.products.state.headers;
        var products = this.refs.products.state.data;
        
        var output = []
        for (var i=0; i<products.length; i++)
            output[i] = {header: headers, value: products[i]};
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
            data: {
                "buyer": document.getElementById("buyer").value,
                "seller": document.getElementById("seller").value,
                "products": [
                    {
                        "name": "alu",
                        "qty": "5 kg",
                        "price": 10.00,
                        "total": 50.00
                    }
                ],
                "total": document.getElementById("total").value,
                "discount": document.getElementById("discount").value,
                "paid": document.getElementById("paid").value,
                "due": document.getElementById("due").value,
                "uid": Cookies.get("uid"),
                "tid": 1
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
        const divStyle = {
          width: '100%',          
        };
        
		return (
            <div>
                <UserForm ref="userData" transId={this.props.transId} audio={this.props.data.audio} formtype={this.props.data.cty} phone={this.props.data.phone}/>
                <ProductForm ref="products"/>
                <SummaryForm ref="summaryData" onSubmit={this.onTranscriptionClicked}/> 
                <Testform />
            </div>

		);
	}
}

export default TranscriptionForm; 