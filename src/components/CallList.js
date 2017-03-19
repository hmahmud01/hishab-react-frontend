import React, {Component} from 'react';
import Ajax from '../utils/Ajax';

class CallList extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        
        const listItems = this.props.items.map(
            (listItem) => 
                <ListItem tid={this.props.transId} uid={this.props.uid} title={this.props.title} isRead={false} caller={listItem.caller} time={listItem.time} type={listItem.type} target={listItem.id} 
                    onClick={this.props.onClick} key={listItem.id}/>
        );
        
        return (
        <div className="col-lg-9 animated fadeInRight">
            <div className="mail-box-header">
                <h2>
                    {this.props.title}
                </h2>
                <div className="mail-tools tooltip-demo m-t-md">
                    <div className="btn-group pull-right">
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-right"></i></button>

                    </div>
                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i className="fa fa-refresh"></i> Refresh</button>
                
                </div>
            </div>
                <div className="mail-box">
                <table className="table table-hover table-mail">
                <thead>
                    <tr>
                        <td><h3>Transaction ID</h3></td>
                        <td><h3>Caller</h3></td>
                        <td><h3>Call Time</h3></td>
                        <td><h3>Call Type</h3></td>
                        <td><h3>Transcriber</h3></td>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
                </table>


                </div>
            </div>
        );
        
    }
}

class ListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUnread : !this.props.isRead
        };
        this.handleClick = this.handleClick.bind(this);
        this.unLockClick = this.unLockClick.bind(this);
    }
    
    handleClick(event){
        event.preventDefault();
        this.props.onClick(this.props.target, this.props.type);
    }

    unLockClick(event){
        event.preventDefault();
        console.log("inside unlock");
        console.log(this.props.target + " : : " +this.props.uid);
        var callback = function(response, status){
            if (status == "success"){
                alert("Call redirected to the transcription list");
                console.log(response);
                window.location.reload();

            }else if (status == "error"){
                alert("Call Incorrect");
                console.log(response.responseText);
            }
        }.bind(this);
        
        var params = {
            "uid": this.props.uid,
            "tid": this.props.target
        };
        
        var ajax = new Ajax(callback);
        ajax.postData('forms/unlock/transaction', params);
    }



    
    render(){
        var type = ["Register", "Buy", "Sell", "Due", "Repay"]
        var labelColor = ["danger", "success", "primary", "warning", "warning"]
        
        var labelStyle = {
            font: "sans-serif"
        }
        
        var label = "label label-"+labelColor[this.props.type];
        return(
            <tr className={ this.state.isUnread === true ? "unread" : "read"}>                    
                <td className="">
                    <span>{this.props.target}</span>
                </td>
                <td className="mail-contact">
                    <span>{this.props.caller}</span>
                </td>
                <td className="mail-subject">
                    <span>{this.props.time}</span>
                </td>
                <td>
                    <span className={label}>{type[this.props.type]}</span>
                </td>
                <td className="text-right mail-date">
                    <span>{this.props.transcriber}</span>
                </td>
                <td className="text-center mail-date">
                    <button className="btn btn-success" onClick={ this.props.title === "Locked" ? this.unLockClick: this.handleClick}>
                        <i className="fa fa-tty"></i> &nbsp;|&nbsp;
                            {this.props.title === "Locked" ? "Unlock" : "Transcribe" }
                    </button>
                </td>
            </tr>
        );
    }
}

export default CallList;