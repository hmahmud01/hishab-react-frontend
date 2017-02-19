import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';


class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
        <div id={this.props.id} className="modal fade" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <ModalHeader title={this.props.title}/>
                    <form className="form-horizontal">
                        <div className="modal-body">
                            <div className="row">
                                {this.props.children}                                        
                            </div>
                        </div>
                        <ModalFooter onClick={this.props.onClick} discard={this.props.discard} success={this.props.success}/>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}


class ModalHeader extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        &times;
                    </span>
                </button>
                <h4 className="modal-title">{this.props.title}</h4>
            </div>
        );
    }
}

class ModalFooter extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">{this.props.discard == undefined ? 'Close' : this.props.discard}</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onClick}>{this.props.success == undefined ? 'Save changes' : this.props.success}</button>
            </div>
        );
    }
}

export default Modal;