import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

class AutoSuggestText extends Component{
    constructor(props){
        super(props);
        var val = props.value;
        if (val == undefined)
            val = "";
        this.state = {
            data : [],
            value : val
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    handleSearch(event){
        var value = event.target.value;
        this.setState({value: event.target.value});
        console.log(event.target.value);
        
        if (event.target.value.length > 2){
            $.ajax({
            method: 'get',
            url: this.props.url,
            data: {
                "uid": Cookies.get("uid"),
                "search": event.target.value,
            },
            success: function(response) {
                console.log(response);
                var data = $.parseJSON(response)
                this.setState({data : data});
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
            });
        }
        
        // This handles the data selection segment
        if (this.state.data != []){
            var options = this.state.data;
            console.log(options);
            console.log(value);
            for (var i=0;i<options.length;i++){
                if (options[i].value == value){
                    console.log("Selected: "+options[i].value);
                    if (this.props.onSelect !== undefined){
                        var selectEvent = this.props.onSelect.bind(this);
                        selectEvent(value);
                    }
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
                    onChange={this.handleSearch}
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