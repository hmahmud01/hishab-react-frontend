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
        console.log(value);
        this.setState({value: value});
    }
    
    render(){
        return(
        <div className="form-group">
            <label className="col-sm-4 control-label">{this.props.label}</label>
            <div className="col-sm-8">
                <input id={this.props.id} type="text" placeholder={this.props.placeholder} className="form-control" value={this.state.value} onChange={this.setValue}/>
            </div>
        </div>
        );
    }
}

export default TextInput;