import React , {Component} from 'react';
import Logger from '../utils/Logger';

class DataTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns : [],
            headers: [],
            rowValues : [],
            idValues: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        
        this.log = new Logger();
    }
    
    /**
    EXPECTED OUTPUT
    
    {
        static_headers: ['Product Name', 'Category Name', 'Unit Price Header, 'Unit Header', 'Quantity Header'],
        values: [
            {static: ['Product', 'Category', 'Unit Price', 'Unit', 'Quantity'], attr: ['Attribute 1', 'Attribute 2'], attrVal: ['1 Value', '2 Value'] },
            {static: ['Product', 'Category', 'Unit Price', 'Unit', 'Quantity'], attr: ['Attribute 1', 'Attribute 2'], attrVal: ['1 Value', '2 Value'] },
            {static: ['Product', 'Category', 'Unit Price', 'Unit', 'Quantity'], attr: ['Attribute 1', 'Attribute 2'], attrVal: ['1 Value', '2 Value'] },
        ]
    }
    
    */
    
    editRow(index){
        var data = this.state.rowValues[index];
        var headers = this.state.headers[index];
        this.props.editRow(headers, data, index);
    }
    
    deleteRow(index){
        var newRows = this.state.rowValues;
        newRows.splice(index, 1);
        this.setState({rowValues : newRows});
        
        var newHeaders = this.state.headers;
        newHeaders.splice(index, 1);
        this.setState({headers : newHeaders});
    }
    
    addRow(data, headers, index){
        /**
        EXPECTED INPUT
        
        {
            values: ['Product', 'Category', 'Unit Price', 'Unit', 'Quantity'],
            attributes: ['Attribute 1', 'Attribute 2'],
            attrValues: ['1 Value', '2 Value']
        }
        
        */
        
        this.log.debug(data);
        this.log.debug(headers);
        
        var newRow = this.state.rowValues;
        var newHeader = this.state.headers;
        
        if (index !== undefined){
            this.deleteRow(index);
            newRow = this.state.rowValues;
            newRow.splice(index, 0, data);
            
            newHeader = this.state.headers;
            newHeader.splice(index, 0, headers);
        }else{
            newRow.push(data);
            newHeader.push(headers);
        }
        this.setState({rowValues : newRow, headers: newHeader});
    }
    
    componentDidMount(){
        var dataPassed = this.props.passData.bind(this);
        dataPassed(this.state.columns, this.state.headers, this.state.rowValues);
    }
    
    render(){
        var rows = this.state.rowValues.map(
            (row, index) => 
                <DataTableRow key={index} data={row} index={index} crow={this.state.headers[index]} deleteRow={this.deleteRow} editRow={this.editRow}/>
        );
        
        return(
        <div className="col-lg-12">
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>{this.props.header}</h5>
                </div>
                <div className="ibox-content">
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <a data-toggle="modal" className="btn btn-primary pull-right" href="#modal-product" onClick={this.props.onClick}>Add Product</a>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <DataTableHeader columns={this.state.columns}/>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class DataTableHeader extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        var columns = this.props.columns.slice(0, 6).map(
            (column, index) => 
                <th key={index}>{column}</th>
        );
        return(
            <thead>
                <tr>
                    {columns}
                    <th>Attributes</th>
                    <th>Actions</th>
                </tr>
            </thead>
        );
    }
}

class DataTableRow extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    edit(event){
        var editRow = this.props.editRow.bind(this);
        editRow(this.props.index);
    }
    
    delete(event){
        var deleteRow = this.props.deleteRow.bind(this);
        deleteRow(this.props.index);
    }
    
    render(){
        var attr = "";
        var rows = this.props.data.slice(0, 6).map(
            (column, index) => 
                <td key={index}>{column}</td>
        );

        for(var i=6; i<this.props.data.length; i++){
            attr += this.props.crow[i] + ": " + this.props.data[i] + ", ";
        }

        attr = attr.slice(0, -2);
        return (
        <tr>
            {rows}
            <td>{attr}</td>
            <td>
                <a data-toggle="modal" className="btn btn-xs btn-info" href="#modal-product" onClick={this.edit}>
                    <i className="fa fa-paste"></i> Edit 
                </a> 
                <button className="btn btn-xs btn-info" type="button" onClick={this.delete}>
                    <i className="fa fa-times"></i> Delete 
                </button>
            </td>
        </tr>
        );
    }
}

export default DataTable;