import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TextInput from './TextInput';
import AutoSuggestText from './AutoSuggestText'
import Modal from './Modal';
import Alert from './Alert';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Logger from '../utils/Logger';


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
        this.log = new Logger();
	}
    
    productNewSelected(id){
        var callback = function(response, status){
            if(status == "success"){
                var data = new Json(response);
                var output = [];
                var headers = [];
                headers[0] = "Product Name";
                headers[1] = "Category";
                headers[2] = "Unit Price";
                
                output[0] = {header: "Product Name", data: ""};
                output[1] = {header: "Category", data: data.getData().product_category};
                output[2] = {header: "Unit Price", data: ""};

                var modalFields = output.map(
                    function (product, index){                        
                        var id = "itemn"+index;
                        return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                this.setState({headers: headers, modalFieldsNew: modalFields});
            }else if(status == "error"){
                var data = new Json(response.responseText);
                this.setState({isError: true, message: data.getData().msg, alertType: "danger"});

            }
        }.bind(this);

        var params = {
                "uid" : Cookies.get("uid"),
                "cid" : id
            };

        var ajax = new Ajax(callback);
        ajax.getData('transaction/category/attribute', params)

    }
    
    createNewProduct(){
        var callback = function(response, status){
            if(status == "error"){
                alert("Product Already Exist");
                var data = new Json(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }
        }.bind(this);

        var params = {
                "pname": document.getElementById("itemn0").value, 
                "pcatg": document.getElementById("itemn1").value,
                "punpr": document.getElementById("itemn2").value,
                "uid": Cookies.get("uid")
            };

        var ajax = new Ajax(callback);
        ajax.postData('transaction/submit/product', params);

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
	                        url="transaction/search/category"
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