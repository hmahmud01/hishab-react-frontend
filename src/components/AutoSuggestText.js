import React from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import InputComponent from './InputComponent';

class AutoSuggestText extends InputComponent{
    constructor(props){
        super(props);
        this.state = {
            data : []
        };
        this.setValue = this.setValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }
    
    setValue(event){
        super.setValue(event);
        
        // This handles the data field loading
        if (event.target.value.length > 2){
            $.ajax({
            method: 'get',
            url: this.props.url,
            data: {
                "uid": Cookies.get("uid"),
                "search": event.target.value,
            },
            success: function(response) {
                var data = $.parseJSON(response)
                this.setState({data : data});
            }.bind(this),
            error: function(response) {
            }
            });
        }
        
        // This handles the data selection segment
        if (this.state.data !== []){
            this.onSelect(event.target.value);    
        }
    }
    
    onSelect(value){
        var options = this.state.data;
        for (var i=0;i<options.length;i++){
            if (options[i].value.toString() === value){
                if (this.props.onSelect !== undefined){
                    var selectEvent = this.props.onSelect.bind(this);
                    selectEvent(value);
                }
            }
        }
    }
    
    render(){
        var listItems = this.state.data.map(
            (listItem, index) => 
            <option key={index} value={listItem.value}>{listItem.id}</option>
        );
        return (
            <div className="input-group">
                <input 
                    list={this.props.datalist} 
                    type="text" 
                    placeholder={this.props.placeholder} 
                    id={this.props.id}
                    ref="field"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.setValue}
                />
                <datalist id={this.props.datalist}>
                    {listItems}
                </datalist>
                {this.props.children}
            </div>
        );
    }

}

export default AutoSuggestText;