import React, {Component} from 'react';

class TextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : this.props.value
        };
        this.setValue = this.setValue.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }
    
    setValue(event){
        var value = event.target.value;
        this.setState({value: value});
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