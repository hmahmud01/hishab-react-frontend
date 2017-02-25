import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TextInput from './TextInput';
import AutoSuggestText from './AutoSuggestText'
import Modal from './Modal';


class AddNewProductForm extends Component{
	constructor(props){
		super(props);
		this.state ={
			data : [],
            headers: [],
            modalFieldsNew : []
		};
		this.productNewSelected = this.productNewSelected.bind(this);
        this.createNewProduct = this.createNewProduct.bind(this);
	}
    
    productNewSelected(id){
        console.log(id);
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/product/attribute',
            data: {
                "uid" : Cookies.get("uid"),
                "pid" : id
            },
            success: function(response){
//                {"product_category": "test", "product_attribute": [], "product_id": 1, "product_unit_price": 10.0, "product_name": "test product"}
                var data = $.parseJSON(response);
                console.log(data);
                var output = [];
                var headers = [];
                headers[0] = "Product Name";
                headers[1] = "Category";
                headers[2] = "Unit Price";
                
                output[0] = {header: "Product Name", data: data.product_name};
                output[1] = {header: "Category", data: data.product_category};
                output[2] = {header: "Unit Price", data: data.product_unit_price};
                
                for (var i=3; i < data.product_attribute.length+3; i++){
                    output[i] = {header: data.product_attribute[i-3], data: ""};
                    headers[i] = data.product_attribute[i-3];
                }
                var modalFields = output.map(
                    function (product, index){
                        
                        var id = "itemn"+index;
                        return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                this.setState({headers: headers, modalFieldsNew: modalFields});
                console.log("Updated State");
            }.bind(this),
            error: function(response){
                
            }
        });
    }
    
    createNewProduct(){
        console.log("in add new product");
        $.ajax({
            method: 'post',
            url: 'http://192.168.5.2:8000/api/v1/transaction/submit/product',
            data: {
                "pname": document.getElementById("itemn0").value, 
                "pcatg": document.getElementById("itemn1").value,
                "punpr": document.getElementById("itemn2").value,
                "uid": Cookies.get("uid")
            },
            success: function(response){
                console.log(response);
            },
            error: function(response){
                console.log(response.responseText);
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg});
            }.bind(this),
        });
    }


	render(){
		return(
			<Modal id="modal-product-new" title="New Product Addition" discard="Exit" success="Add Product" onClick={this.createNewProduct}>
               	<div className="form-group"><label className="col-sm-4 control-label">Category</label>
                    <div className="col-sm-8">
                	    <AutoSuggestText 
	                    	id="category"
	                        placeholder="Category"
	                        datalist="categorylist"
	                        url="http://192.168.5.2:8000/api/v1/transaction/search/category"
	                        onSelect={this.productNewSelected}>
	                       	<span className="input-group-btn">
	                        	<a data-toggle="modal" className="btn btn-primary" href="#modal-category-new">
	                            	<i className="fa fa-plus" aria-hidden="true"></i>
	                            </a>
	                        </span>
                   		</AutoSuggestText>
               		</div>
            	</div>
        		{this.state.modalFieldsNew}
    		</Modal>
		);
	}

}

export default AddNewProductForm;