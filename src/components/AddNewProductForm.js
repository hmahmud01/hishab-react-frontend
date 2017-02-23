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
            modalFields : []
		};
		this.productSelected = this.productSelected.bind(this);
	}


	productSelected(id){
        console.log(id);
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/product/attribute',
            data: {
                "uid" : Cookies.get("uid"),
                "pid" : id
            },
            success: function(response){
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
                
                for (var i=3; i< data.product_attribute; i++){
                    output[i] = {header: data.product_attribute[i-3], data: ""};
                    headers[i] = data.product_attribute[i-3];
                }
                var modalFields = output.map(
                    function (product, index){
                        var id = "item"+index;
                        return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                this.refs.data.setState({columns : headers});
                this.setState({headers: headers, modalFields: modalFields});
            }.bind(this),
            error: function(response){
                
            }
        });
    }

	render(){
		return(
			<Modal id="modal-product-new" title="New Product Addition" discard="Exit" success="Add Product">
               	<div className="form-group"><label className="col-sm-4 control-label">Category</label>
                    <div className="col-sm-8">
                	    <AutoSuggestText 
	                    	id="category"
	                        placeholder="Category"
	                        datalist="categorylist"
	                        url="http://192.168.5.2:8000/api/v1/transaction/search/category"
	                        onSelect={this.productSelected}>
	                       	<span className="input-group-btn">
	                        	<a data-toggle="modal" className="btn btn-primary" href="#modal-category-new" onClick={this.addNewCategory}>
	                            	<i className="fa fa-plus" aria-hidden="true"></i>
	                            </a>
	                        </span>
                   		</AutoSuggestText>
               		</div>
            	</div>
        		{this.state.modalFields}
    		</Modal>
		);
	}

}

export default AddNewProductForm;