import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TextInput from './TextInput';
import Modal from './Modal';


class AddNewCategoryForm extends Component{
	constructor(props){
		super(props);
		this.state = {};
		this.addNewCategory = this.addNewCategory.bind(this);
	}
    
    

    
    addNewCategory(){
        var datia = {
                "cname": document.getElementById("category-name").value, 
                "cfield": (document.getElementById("category-fields").value).trim().split(", "),
                "uid": Cookies.get("uid")
            };
        $.ajax({
            method: 'get',
            url: 'http://app.hishab.co/api/v1/transaction/submit/category',
            data: {
                "cname": document.getElementById("category-name").value, 
                "cfield": (document.getElementById("category-fields").value).trim().split(","),
                "uid": Cookies.get("uid")
            },
            success: function(response){
            },
            error: function(response){
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg});
            }.bind(this),
        });
    }

	render(){
		return(

			<Modal id="modal-category-new" title="New Category" discard="Exit" success="Add Category" onClick={this.addNewCategory}>
                <TextInput id="category-name" label="Category Name" placeholder="Category Name"/>
                <TextInput id="category-fields" label="Category Fields" placeholder="Category Fields"/>
            </Modal>
		);
	}
}

export default AddNewCategoryForm;