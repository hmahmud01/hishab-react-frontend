import React from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import InputComponent from './InputComponent';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

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
            var callback = function(response, status){
                if (status == "success"){
                    var data = new Json(response);
                    this.setState({data : data.getData()});
                }else if (status == "error"){

                }
            }.bind(this);

            var params = {
                "uid": Cookies.get("uid"),
                "search": event.target.value,
            };

            var ajax = new Ajax(callback);
            ajax.getData(this.props.url, params);

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
            function(listItem, index) {
                return (
                    <option key={index} value={listItem.value}>{listItem.id}</option>
                );
            }
        );
        return (
            <div className="input-group">
                <input 
                    list={this.props.datalist} 
                    type="text" 
                    value={this.props.value}
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