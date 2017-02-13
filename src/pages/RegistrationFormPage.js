import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';


class RegistrationFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            response : ""
        };
        this.createMarkup = this.createMarkup.bind(this);
    }
    
    createMarkup() {
        return {__html: this.state.response};
    }
    
    componentDidMount(){
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/get/form/user',
            success: function(response){
                this.setState({response: response});
            }.bind(this),
            error: function(response){
                console.log(response.responseText);
            }.bind(this)
        })
    }
    
    render(){
        return(
            <form className="" role="form" >
                <div className="form-group dynamic-forms" dangerouslySetInnerHTML={this.createMarkup()}>
                </div>
            </form>
        );
    }
    
}

export default RegistrationFormPage;