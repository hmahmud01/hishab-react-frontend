import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import TextInput from './TextInput';
import Modal from './Modal';
import Alert from './Alert';
import Ajax from '../utils/Ajax';
import Logger from '../utils/Logger';


class AddNewCategoryForm extends Component{
	constructor(props){
		super(props);
		this.state = {
            isError: false,
            alertType: "success",
            message: "None"
        };
		this.addNewCategory = this.addNewCategory.bind(this);
        this.log = new Logger();
	}
    
    

    
    addNewCategory(){        
        var callback = function(response, status){
            if (status == "error"){
                alert("Category Already Exist");
                var data = $.parseJSON(response.responseText);
                this.setState({isError: true, message: data.msg, alertType: "danger"});
            }
        }.bind(this);
        
        var params = {
                "cname": document.getElementById("category-name").value, 
                "cfield": (document.getElementById("category-fields").value).trim().split(","),
                "uid": Cookies.get("uid")
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('transaction/submit/category', params);
        
    }

	render(){
		return(

			<Modal id="modal-category-new" title="New Category" discard="Exit" success="Add Category" onClick={this.addNewCategory}>
                <Alert isVisible={this.state.isError} message={this.state.message} type={this.state.alertType}/>
                <TextInput id="category-name" label="Category Name" placeholder="Category Name"/>
                <TextInput id="category-fields" label="Category Fields" placeholder="Category Fields"/>
            </Modal>
		);
	}
}

export default AddNewCategoryForm;