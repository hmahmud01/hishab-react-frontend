import React, {Component} from  'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import DataTable from './DataTable';
import TextInput from './TextInput';
import AutoSuggestText from './AutoSuggestText';
import sample from '../pages/sound/sample.mp3';
import $ from 'jquery';
import Cookies from 'js-cookie';

class ProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            headers: [],
            modalFields : []
        };
        this.receiveData = this.receiveData.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addMoreProducts = this.addMoreProducts.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
    }
    
    receiveData(headers, data){
        this.setState({headers: headers, data: data});
    }
    
    editRow(headers, data){
        console.log(headers);
        console.log(data);
        this.setState({modalFields: []});
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
        this.setState({modalFields: modalFields});
    }
    
    addRow(){
        var output = [];
        for (var i=0; i< this.state.modalFields.length; i++)
            output[i] = document.getElementById("item"+i).value;
        console.log("Result: "+output);
        this.refs.data.addRow(output);
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
                return(<TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>);
            }
        );
        this.setState({modalFields: modalFields});
    }
            
    addNewCategory(){
        
    }
    
	render(){
		return (
            <div>
                <DataTable ref="data" passData={this.receiveData} editRow={this.editRow} onClick={this.addMoreProducts}/>

                <Modal id="modal-product" title="Add Product to Transaction" onClick={this.addRow}>
                    <AutoSuggestText 
                        id="product"
                        placeholder="Product"
                        datalist="productlist"
                        url="http://192.168.5.2:8000/api/v1/transaction/search/product"
                    >
                        <span className="input-group-btn">
                            <a data-toggle="modal" className="btn btn-primary" href="#modal-product-new" onClick={this.addMoreProducts}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </a>
                        </span>
                    </AutoSuggestText>
                    {this.state.modalFields}
                </Modal>

                <Modal id="modal-product-new" title="New Product Addition" discard="Exit" success="Add Product">
                    <AutoSuggestText 
                        id="category"
                        placeholder="Category"
                        datalist="categorylist"
                        url="http://192.168.5.2:8000/api/v1/transaction/search/category"
                    >
                        <span className="input-group-btn">
                            <a data-toggle="modal" className="btn btn-primary" href="#modal-category-new" onClick={this.addNewCategory}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </a>
                        </span>
                    </AutoSuggestText>    
                </Modal>
                <Modal id="modal-category-new" title="New Category" discard="Exit" success="Add Category">
                    <TextInput id="category-name" label="Category Name" placeholder="Category Name"/>
                    <TextInput id="category-fields" label="Category Fields" placeholder="Category Fields"/>
                </Modal>
            </div>
		);
	}
}

export default ProductForm; 