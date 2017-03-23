import React from 'react';
import InputComponent from './InputComponent';
import $ from 'jquery';
import Logger from '../utils/Logger';

class LoginForm extends InputComponent{
    constructor(props){
        super(props);
        this.setValue = this.setValue.bind(this);
        this.onClick = this.onClick.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.log = new Logger();
    }
    
    setValue(event){
        super.setValue(event);
    }


    onClick(event){
        if (this.props.onClick !== undefined){
            var clickFunc = this.props.onClick.bind(this);
            clickFunc(event);
        }
    }


    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onClick(event);            
        }
    }

    render(){
        return(
            <form className="m-t">
                <h5>Login with credentials</h5>
                <div className="form-group">
                    <div className="col-md-12">
                        <input id="uphone" type="text" placeholder="Phone Number" className="form-control" onChange={this.setValue} onKeyPress={this._handleKeyPress}/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-12">
                        <input id="upass" type="password" placeholder="Password" className="form-control" onChange={this.setValue} onKeyPress={this._handleKeyPress}/>
                    </div>
                </div>
                <div className="hr-line-dashed"></div>
                <div className="form-group">
                    <button id="formSubmit" type="button" className="btn btn-primary block m-b full-width" onClick={this.onClick}>Submit</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;