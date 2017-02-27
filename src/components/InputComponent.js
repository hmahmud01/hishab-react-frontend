import React, {Component} from 'react';

class InputComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : undefined
        };
        this.setValue = this.setValue.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }
    
    setValue(event){
        var value = event.target.value;
        this.onValueChanged(event);
    }

    onValueChanged(event){
        this.setState({value: event.target.value});
        if (this.props.valueChangeListener !== undefined){
            var valueChanged = this.props.valueChangeListener.bind(this);
            valueChanged(event);
        }
    }
}

export default InputComponent;