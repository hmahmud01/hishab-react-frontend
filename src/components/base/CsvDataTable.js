import React, {Component} from 'react';

class CsvDataTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            headerRows: 3,
            dataString: ",,,Marlboro,,,Sheikh,,\nSR Name,Route,,Buy,Sell,Return,Buy,Sell,Return\n,Route Area,Route Country,,,,,,\nShovan,Gulshan,Bangladesh,15,16,17,15,16,17\nShovan,Gulshan,Bangladesh,15,16,17,15,16,17"
        };
    }
    
    stringSplit(val, delimeter){
        return val.split(delimeter);
    }

    render(){
        var rowsStrings = this.stringSplit(this.state.dataString, "\n");
        var headers =  rowsStrings.map(function(row, index){
            if (index < this.state.headerRows){
            return (
                <CsvDataRow type="header" key={index} value={row}/>
            );
            }
        }.bind(this));
        
        var rows = rowsStrings.map(function(row, index){
            if (index >= this.state.headerRows){
            return (
                <CsvDataRow type="data" key={index} value={row}/>
            );
            }
        }.bind(this));
        return(
          <table className="table table-striped table-bordered table-hover">
            <thead>
                {headers}
            </thead>
            <tbody>
                {rows}
            </tbody>
          </table>
        );
    }
}

class CsvDataRow extends Component{
    constructor(props){
        super(props);
        this.state = {
          colString : this.props.value
        };
        this.stringSplit = this.stringSplit.bind(this);
    }
    
    componentWillReceiveProps(props){
        this.setState({colString: props});
    }
    
    stringSplit(val,delimeter){
        return val.split(delimeter);
    }
    
    render(){
        
        var cols = this.stringSplit(this.state.colString, ",");
        var cells = cols.map(function(value, index){
            return(
                <CsvDataCell type={this.props.type} key={index} value={value}/>
            );
        }.bind(this));
        return(
            <tr>
            {cells}
            </tr>
        );
    }
}

class CsvDataCell extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var headerDesign = {
            verticalAlign: "middle",
            textAlign: "center",
            border: "1px solid"
        };
        
        if (this.props.type === "header"){
            return (
                <th style={headerDesign}>{this.props.value}</th>
            );
        }else{
            return (
                <td>{this.props.value}</td>
            );
        }
    }
}

export default CsvDataTable;