import React, {Component} from  'react'
import sample from '../pages/sound/sample.mp3';

class ProductForm extends Component {

	render(){
		return (
            <div>
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Product Information table</h5>
                            <div className="ibox-tools">
                                <a className="collapse-link">
                                    <i className="fa fa-chevron-up"></i>
                                </a>       
                            </div>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-sm-3 pull-right">
                                    <a data-toggle="modal" className="btn btn-primary pull-right" href="#modal-product">Add Product</a>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Action</th>                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Alu</td>
                                            <td>5kg</td>
                                            <td>23.00</td>
                                            <td>115.00</td>
                                            <td><a data-toggle="modal" className="btn btn-xs btn-info" href="#modal-product"><i className="fa fa-paste"></i> Edit </a> <button className="btn btn-xs btn-info" type="button"><i className="fa fa-times"></i> Delete </button></td>
                                        </tr>
                                        <tr>
                                            <td>Alu</td>
                                            <td>5kg</td>
                                            <td>23.00</td>
                                            <td>115.00</td>
                                            <td><a data-toggle="modal" className="btn btn-xs btn-info" href="#modal-product"><i className="fa fa-paste"></i> Edit </a> <button className="btn btn-xs btn-info" type="button"><i className="fa fa-times"></i> Delete </button></td>
                                        </tr>
                                        <tr>
                                            <td>Alu</td>
                                            <td>5kg</td>
                                            <td>23.00</td>
                                            <td>115.00</td>
                                            <td><a data-toggle="modal" className="btn btn-xs btn-info" href="#modal-product"><i className="fa fa-paste"></i> Edit </a> <button className="btn btn-xs btn-info" type="button"><i className="fa fa-times"></i> Delete </button></td>
                                        </tr>
                                        <tr>
                                            <td>Alu</td>
                                            <td>5kg</td>
                                            <td>23.00</td>
                                            <td>115.00</td>
                                            <td><a data-toggle="modal" className="btn btn-xs btn-info" href="#modal-product"><i className="fa fa-paste"></i> Edit </a> <button className="btn btn-xs btn-info" type="button"><i className="fa fa-times"></i> Delete </button></td>
                                        </tr>                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="modal-product" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add Product</h4>
                            </div>

                            <form className="form-horizontal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="form-group"><label className="col-sm-4 control-label">Product name</label>
                                            <div className="col-sm-6">
                                                <select className="form-control m-b" name="product">
                                                    <option>alu</option>
                                                    <option>potol</option>
                                                    <option>am</option>
                                                    <option>kathal</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-2">
                                                <a data-toggle="modal" className="btn btn-primary" href="#modal-product-new"><i className="fa fa-plus" aria-hidden="true"></i></a>
                                            </div>                                            
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Quantity</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Quantity" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Unit</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Unit" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Price</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Price" className="form-control" />                                               
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="modal-product-new" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add Product</h4>
                            </div>

                            <form className="form-horizontal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="form-group"><label className="col-sm-4 control-label"> Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Name" className="form-control" />
                                            </div>                                            
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Alternative Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Alternative Name" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Bangla Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Bangla Name" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group"><label className="col-sm-4 control-label">Category</label>
                                            <div className="col-sm-8">
                                                <select className="form-control m-b" name="category">
                                                    <option>sim</option>
                                                    <option>simkit</option>
                                                    <option>recharge</option>
                                                    <option>card</option>
                                                </select>                                              
                                            </div>
                                        </div>

                                        <div className="form-group"><label className="col-sm-4 control-label">Product Code</label>
                                            <div className="col-sm-8">
                                                <input type="text" placeholder="Product Code" className="form-control" />                             
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default ProductForm; 