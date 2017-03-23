import React, {Component} from  'react';
import Modal from './Modal';
import DataTable from './DataTable';
import TextInput from './TextInput';
import AddNewProductForm from './AddNewProductForm';
import AddNewCategoryForm from './AddNewCategoryForm';
import AutoSuggestText from './AutoSuggestText';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Logger from '../utils/Logger';


class ProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            headers: [],
            modalFields : [],
            modalFieldsNew : [],
            headerCollection: [],
            idCollection: [],
            propsData: [],
            propsHeader: []
        };
        this.receiveData = this.receiveData.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addMoreProducts = this.addMoreProducts.bind(this);
        this.productSelected = this.productSelected.bind(this);
        this.categorySelected = this.categorySelected.bind(this);
        this.log = new Logger();
    }
    
    receiveData(headers, headerCollection, data){
        this.setState({headers: headers, headerCollection: headerCollection, data: data});
    }

    componentWillReceiveProps(newProps){
        this.setState({products: newProps.product});
        var products = newProps.product;
        
        if (products === undefined)
            return;
        
        var headers = [];
        var outputs = [];
        var log = new Logger();
        for (var i =0; i < products.length; i++) {
            log.debug("Inside Product Loop");
            log.debug(products[i]);
            headers[0] = "id";            
            headers[1] = "Product Name";
            headers[2] = "Category";
            headers[3] = "Unit Price";
            headers[4] = "Unit";
            headers[5] = "Quantity";
            
            outputs[0] = products[i].product_id;
            outputs[1] = products[i].product_name;
            outputs[2] = products[i].product_category;
            outputs[3] = products[i].product_unit_price;
            outputs[4] = products[i].product_unit;
            outputs[5] = products[i].product_quantity;
            
            var ind = 6;
            for (var key in products[i].attributes){
                headers[ind] = products[i].attributes[key].key;
                log.debug("Inside Attribute Loop");
                log.debug(key);
                outputs[ind++] = products[i].attributes[key].value;
            }
            var result = JSON.parse(JSON.stringify(outputs));
            var hreslt = JSON.parse(JSON.stringify(headers));
            this.refs.data.setState({columns: hreslt});
            this.refs.data.addRow(result, hreslt);
            log.debug("Final Output");
            log.debug(result);
            log.debug(hreslt);
        }
    }

    
    editRow(headers, data, index){
        document.getElementById("product").value = data[0];
        headers.splice(0,1);
        data.splice(0,1);
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
        this.setState({headers: headers, modalFields: modalFields});
    }
    
    addRow(){
        var output = [];
        var id = document.getElementById("product").value;
        output.push(id);
        for (var i=0; i< this.state.modalFields.length; i++){
            console.log(document.getElementById("item"+i));
            if(document.getElementById("item"+i) !== null){
                output.push(document.getElementById("item"+i).value);
            }            
        }
        
        var idHeader = this.state.headers;
        idHeader.splice(0, 0, "id");
        
        this.setState({headers: idHeader});

        this.setState({currIndex: undefined});
        this.refs.data.setState({columns: idHeader});
        this.refs.data.addRow(output, idHeader, this.state.currIndex);
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
        var callback = function(response, status){
            if (status == "success"){
                var data = new Json(response);
                var output = [];
                var headers = [];
                headers[0] = "Product Name";
                headers[1] = "Category";
                headers[2] = "Unit Price";
                headers[3] = "Unit";
                headers[4] = "Quantity";

                output[0] = {header: "Product Name", data: data.getData().product_name};
                output[1] = {header: "Category", data: data.getData().product_category};
                output[2] = {header: "Unit Price", data: data.getData().product_unit_price};
                output[3] = {header: "Unit", data: data.getData().product_unit};
                output[4] = {header: "Quantity", data: data.getData().product_quantity};

                
                 for (var i=5; i< data.getData().product_attribute.length+5; i++){
                     output[i] = {header: data.getData().product_attribute[i-5], data: ""};
                     headers[i] = data.getData().product_attribute[i-5];
                 }

                var modalFields = output.map(
                    function (product, index){
                        var id = "item"+index;
                        var head = product.header;
                        return(
                            <TextInput key={index} id={id} label={product.header} placeholder={product.header} value={product.data}/>
                        );
                    }
                );
                
                var headerArray = this.refs.data.state.headers.slice();
                headerArray.push(headers);
                this.setState({headers: headers, modalFields: modalFields});        
            }
        }.bind(this);
        
        var params = {
                "uid" : Cookies.get("uid"),
                "pid" : id
            };
        
        var ajax = new Ajax(callback);
        ajax.getData('transaction/product/attribute', params);
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
                                url="transaction/search/product"
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