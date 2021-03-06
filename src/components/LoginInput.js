import React from 'react';
import InputComponent from './InputComponent';
import Logger from '../utils/Logger';

class TextInput extends InputComponent{
    constructor(props){
        super(props);
        this.setValue = this.setValue.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.log = new Logger();
    }
    
    setValue(event){
        super.setValue(event);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        }
    }

    render(){
        var classname = this.props.label === undefined ? "col-sm-12" : "col-sm-8";
        var type = this.props.type !== undefined ? this.props.type : "text";
        return(
        <div className="form-group">
            { this.props.label !== undefined &&
                <label className="col-sm-4 control-label">{this.props.label}</label>
            }
            <div className={classname}>
                <input id={this.props.id} type={type} placeholder={this.props.placeholder} className="form-control" value={this.state.value} onChange={this.setValue}/>
            </div>
        </div>
        );
    }
}

export default TextInput;