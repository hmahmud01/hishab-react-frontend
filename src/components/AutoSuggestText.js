import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

class AutoSuggestText extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            value : ""
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    handleSearch(event){
        var val = event.target.value+event.key;
        console.log(val);
        
        if (val.length > 2){
            $.ajax({
            method: 'get',
            url: this.props.url,
            data: {
                "uid": Cookies.get("uid"),
                "search": val,
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
                    onKeyPress={this.handleSearch}
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