import React from 'react';
import InputComponent from './InputComponent';

class FormInput extends InputComponent{
    constructor(props){
        super(props);
        this.setValue = this.setValue.bind(this);
    }
    
    setValue(event){
        super.setValue(event);
    }


    //Need to check the update onkey function which updates paid due field.

    render(){
        var classname = this.props.label === undefined ? "col-sm-12" : "col-sm-10";
        var type = this.props.type !== undefined ? this.props.type : "text";
        var key = this.props.key !== undefined ? this.props.key : " ";
        return(
        <div className="form-group">
            { this.props.label !== undefined &&
                <label className="col-sm-2 control-label">{this.props.label}</label>
            }
            <div className={classname}>
                <input id={this.props.id} type={type} placeholder={this.props.placeholder} className="form-control" value={this.state.value} onChange={this.setValue}/>
            </div>
        </div>
        );
    }
}

export default FormInput;