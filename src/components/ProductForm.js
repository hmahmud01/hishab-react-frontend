import React, {Component} from  'react';
import Modal from './Modal';
import DataTable from './DataTable';
import TextInput from './TextInput';
import AddNewProductForm from './AddNewProductForm';
import AddNewCategoryForm from './AddNewCategoryForm';
import AutoSuggestText from './AutoSuggestText';
import $ from 'jquery';
import Cookies from 'js-cookie';


class ProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            headers: [],
            modalFields : [],
            modalFieldsNew : [],
            headerCollection: []
        };
        this.receiveData = this.receiveData.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addMoreProducts = this.addMoreProducts.bind(this);
        this.productSelected = this.productSelected.bind(this);
        this.categorySelected = this.categorySelected.bind(this);
    }
    
    receiveData(headers, headerCollection, data){
        this.setState({headers: headers, headerCollection: headerCollection, data: data});
    }
    
    editRow(headers, data, index){
        console.log(headers);
        console.log(data);
        this.setState({modalFields: [], currIndex: index});
        var output = [];
        for (var i =0; i< data.length; i++){
            output[i] = ({header: headers[i], data: data[i]});
        }
        var modalFields = output.map(
            function (product, index){
                var id = "item"+index;
                return(
                    <TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                );
            }
        );
        console.log("After Creating Modal Fields: ");
        console.log(output);
        this.setState({headers: headers, modalFields: modalFields});
    }
    
    addRow(){
        var output = [];
        var n = this.state.modalFields.length;
        for (var i=0; i< this.state.modalFields.length; i++){
            output[i] = document.getElementById("item"+i).value;
        }
        console.log("Result: "+output);
        this.setState({currIndex: undefined});
        this.refs.data.setState({columns: this.state.headers});
        this.refs.data.addRow(output, this.state.headers, this.state.currIndex);
    }
        
    addMoreProducts(){
        var headers = this.refs.data.state.columns;
        var output = [];
        for (var i =0; i< headers.length; i++){
            output[i] = ({header: headers[i], data: ""});
        }
        var modalFields = output.map(
            function (product, index){
                var id = "item"+index;
                return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                );
            }
        );
        this.setState({modalFields: modalFields});
    }
    
    productSelected(id){
        console.log(id);
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/product/attribute',
            data: {
                "uid" : Cookies.get("uid"),
                "pid" : id
            },
            success: function(response){
                var data = $.parseJSON(response);
                console.log(data);
                var output = [];
                var headers = [];
                headers[0] = "Product Name";
                headers[1] = "Category";
                headers[2] = "Unit Price";
                headers[3] = "Unit";
                headers[4] = "Quantity";

                output[0] = {header: "Product Name", data: data.product_name};
                output[1] = {header: "Category", data: data.product_category};
                output[2] = {header: "Unit Price", data: data.product_unit_price};
                output[3] = {header: "Unit", data: data.product_unit};
                output[4] = {header: "Quantity", data: data.product_quantity};

                
                 for (var i=5; i< data.product_attribute.length+5; i++){
                     output[i] = {header: data.product_attribute[i-5], data: ""};
                     headers[i] = data.product_attribute[i-5];
                 }

                var modalFields = output.map(
                    function (product, index){
                        var id = "item"+index;
                        var head = product.header;
                        console.log("fileds"+id);
                        console.log(head);
                        return(
                            <TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                
                var headerArray = this.refs.data.state.headers.slice();
                headerArray.push(headers);
                
                
//                this.refs.data.setState({columns : headers, headers : headerArray});
                this.setState({headers: headers, modalFields: modalFields});
            }.bind(this),
            error: function(response){
                
            }
        });
    }
    
    categorySelected(id){
        
    }
    
	render(){
		return (
            <div>
                <DataTable header="Added Products" ref="data" passData={this.receiveData} editRow={this.editRow} onClick={this.addMoreProducts}/>

                <Modal id="modal-product" title="Add Product to Transaction" onClick={this.addRow}>
                    <div className="form-group"><label className="col-sm-4 control-label">Product</label>
                        <div className="col-sm-8">
                            <AutoSuggestText 
                                id="product"
                                placeholder="Product"
                                datalist="productlist"
                                url="http://192.168.5.2:8000/api/v1/transaction/search/product"
                                onSelect={this.productSelected}>
                                <span className="input-group-btn">
                                    <a data-toggle="modal" className="btn btn-primary" href="#modal-product-new" onClick={this.addMoreProducts}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </a>
                                </span>
                            </AutoSuggestText>
                        </div>
                    </div>
                    {this.state.modalFields}
                </Modal>

                <AddNewProductForm />
                
                <AddNewCategoryForm />
            </div>
		);
	}
}

export default ProductForm; 