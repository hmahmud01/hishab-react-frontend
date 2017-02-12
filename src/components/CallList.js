import React, {Component} from 'react';

class CallList extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        
        const listItems = this.props.items.map(
            (listItem) => 
                <ListItem isRead={false} caller={listItem.caller} time={listItem.time} type={listItem.type} target={listItem.id} 
                    onClick={this.props.onClick} key={listItem.time}/>
        );
        
        return (
        <div className="col-lg-9 animated fadeInRight">
            <div className="mail-box-header">

                <form method="get" action="#" className="pull-right mail-search">
                    <div className="input-group">
                        <input type="text" className="form-control input-sm" name="search" placeholder="Search email"/>
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-sm btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
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
    }
    
    handleClick(){
        event.preventDefault();
        this.props.onClick(this.props.target, this.props.type);
    }
    
    render(){
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
                        <span className="label label-danger">{this.props.type}</span>
                    </td>
                    <td className="text-right mail-date">
                        <span>{this.props.transcriber}</span>
                    </td>
                    <td className="text-center mail-date">
                        <button className="btn btn-success" onClick={this.handleClick}>
                            <i className="fa fa-tty"></i> &nbsp;|&nbsp;
                                 Transcribe
                        </button>
                    </td>
                </tr>
        );
    }
}

export default CallList;