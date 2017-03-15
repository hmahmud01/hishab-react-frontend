import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TextInput from './TextInput';
import AutoSuggestText from './AutoSuggestText'
import Modal from './Modal';
import Alert from './Alert';


class AddNewProductForm extends Component{
	constructor(props){
		super(props);
		this.state ={
			data : [],
            headers: [],
            modalFieldsNew : [],
            isError: false,
            alertType: "success",
            message: "None"
		};
		this.productNewSelected = this.productNewSelected.bind(this);
        this.createNewProduct = this.createNewProduct.bind(this);
	}

    //Add new product correction:
    //  1. Select Product Attributes by Category.
    //  2. Select Category from auto suggest.
    //  3. Display product attribute from attribute list.
    //  4. Create product attribute edit form.
    
    productNewSelected(id){
        $.ajax({
            method: 'get',
            url: 'http://app.hishab.co/api/v1/transaction/category/attribute',
            data: {
                "uid" : Cookies.get("uid"),
                "cid" : id
            },
            success: function(response){
                var data = $.parseJSON(response);
                var output = [];
                var headers = [];
                headers[0] = "Product Name";
                headers[1] = "Category";
                headers[2] = "Unit Price";
                
                output[0] = {header: "Product Name", data: ""};
                output[1] = {header: "Category", data: data.product_category};
                output[2] = {header: "Unit Price", data: ""};

                var modalFields = output.map(
                    function (product, index){                        
                        var id = "itemn"+index;
                        return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                this.setState({headers: headers, modalFieldsNew: modalFields});
            }.bind(this),
            error: function(response){
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }
        });
    }
    
    createNewProduct(){
        $.ajax({
            method: 'post',
            url: 'http://app.hishab.co/api/v1/transaction/submit/product',
            data: {
                "pname": document.getElementById("itemn0").value, 
                "pcatg": document.getElementById("itemn1").value,
                "punpr": document.getElementById("itemn2").value,
                // "punit": document.getElementById("itemn3").value,
                // "pqty": document.getElementById("itemn4").value,
                "uid": Cookies.get("uid")
            },
            success: function(response){
            },
            error: function(response){
                alert("Product Already Exist");
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }.bind(this),
        });
    }


	render(){
		return(
			<Modal id="modal-product-new" title="New Product Addition" discard="Exit" success="Add Product" onClick={this.createNewProduct}>
                <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
               	<div className="form-group"><label className="col-sm-4 control-label">Category</label>
                    <div className="col-sm-8">
                	    <AutoSuggestText 
	                    	id="category"
	                        placeholder="Category"
	                        datalist="categorylist"
	                        url="http://app.hishab.co/api/v1/transaction/search/category"
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