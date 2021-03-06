import React, {Component} from 'react';
import Ajax from '../utils/Ajax';
import Cookies from 'js-cookie';
import Logger from '../utils/Logger';

class CallList extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
    }
    
    render(){
        this.log.debug(this.props);
        const listItems = this.props.items.map(
            (listItem) => 
                <ListItem tid={this.props.transId} title={this.props.title} isRead={false} caller={listItem.caller} time={listItem.time} type={listItem.type} target={listItem.id} transcriber={listItem.transcriber} reviewer={listItem.reviewer}
                    onClick={this.props.onClick} key={this.props.transId}/>
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
                        <td><h3>Reviewer</h3></td>
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
        this.log = new Logger();
    }
    
    handleClick(event){
        event.preventDefault();
        this.props.onClick(this.props.target, this.props.type, this.props.title);
    }

    unLockClick(event){
        event.preventDefault();
        var callback = function(response, status){
            if (status == "success"){
                window.location.reload();
            }else if (status == "error"){
                window.location.reload();
            }
        }.bind(this);
        
        var params = {
            "uid": Cookies.get("uid"),
            "tid": this.props.target
        };
        
        var ajax = new Ajax(callback);
        ajax.postData('forms/unlock/transaction', params);
    }



    
    render(){
        this.log.debug(this.props);
        var type = ["Register", "Buy", "Sell", "Due", "Repay"]
        var labelColor = ["danger", "success", "primary", "warning", "warning"]
        
        var labelStyle = {
            font: "sans-serif"
        }
        
        var label = "label label-"+labelColor[this.props.type];

        var datetime = this.props.time;
        datetime = datetime.split(" ");

        var date = datetime[0];
        var time = datetime[1];

        time = time.split(":");

        var hour = time[0];
        var minit = time[1];

        var hourint = parseInt(hour) + 6;
        var hourstring = hourint.toString();
        var newDateTime = date + " " + hourstring + ":" + minit;

        return(
            <tr className={ this.state.isUnread === true ? "unread" : "read"}>                    
                <td className="">
                    <span>{this.props.target}</span>
                </td>
                <td className="mail-contact">
                    <span>{this.props.caller}</span>
                </td>
                <td className="mail-subject">
                    <span>{newDateTime}</span>
                </td>
                <td>
                    <span className={label}>{type[this.props.type]}</span>
                </td>
                <td className="text-right mail-date">
                    <span>{this.props.transcriber}</span>
                </td>
                <td className="text-right mail-date">
                    <span>{this.props.reviewer}</span>
                </td>
                <td className="text-center mail-date">
                    <button className="btn btn-success" onClick={ this.props.title === "Locked" ? this.unLockClick: this.handleClick}>
                        <i className={this.props.title === "Locked" ? "fa fa-unlock" : "fa fa-tty"}></i> &nbsp;|&nbsp;
                            {this.props.title === "Locked" ? "Unlock" : "Transcribe" }
                    </button>
                </td>
            </tr>
        );
    }
}

export default CallList;