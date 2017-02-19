import React , {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';

class DataTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns : ["Product Name", "Quantity", "Unit Price", "Total"],
            rowValues : [
                [
                    "Alu", 10, 100, 1000
                ],[
                    "Potol", 10, 100, 1000
                ],[
                    "Rice", 10, 100, 1000
                ],[
                    "Biscuit", 10, 100, 1000
                ],[
                    "Coffee", 10, 100, 1000
                ],[
                    "Benson", 10, 100, 1000
                ]
            ]
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    
    editRow(index){
        var data = this.state.rowValues[index];
        var headers = this.state.columns;
        this.deleteRow(index);
        this.props.editRow(headers, data);
    }
    
    deleteRow(index){
        var newRows = this.state.rowValues;
        newRows.splice(index, 1);
        this.setState({rowValues : newRows});
    }
    
    addRow(data){
        var newRow = this.state.rowValues;
        newRow.push(data);
        this.setState({rowValues : newRow});
    }
    
    componentDidMount(){
        var dataPassed = this.props.passData.bind(this);
        dataPassed(this.state.columns, this.state.rowValues);
    }
    
    render(){
        var rows = this.state.rowValues.map(
            (row, index) => 
                <DataTableRow key={index} data={row} index={index} deleteRow={this.deleteRow} editRow={this.editRow}/>
        );
        
        return(
        <div className="col-lg-12">
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>{this.props.header}</h5>
                    <div className="ibox-tools">
                        <a className="collapse-link">
                            <i className="fa fa-chevron-up"></i>
                        </a>       
                    </div>
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
        var columns = this.props.columns.map(
            (column, index) => 
                <th key={index}>{column}</th>
        );
        return(
            <thead>
                <tr>
                    {columns}
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
        console.log(this.props.index);
        editRow(this.props.index);
    }
    
    delete(event){
        var deleteRow = this.props.deleteRow.bind(this);
        deleteRow(this.props.index);
    }
    
    render(){
        var columns = this.props.data.map(
            (column, index) => 
                <td key={index}>{column}</td>
        );
        return (
        <tr>
            {columns}
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