import React, {Component} from 'react';

class TypeList extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    
    render(){
        const divStyle = {
            padding: "0"
        };

        var types = ["Translation", "Buy", "Sell", "Due Payment", "Previous Due", "Error", "Revision", "Lock"];
        const listItems = this.props.items.map((listItem, index) => 
        <ListItem href="#/" name={types[listItem.callType]} value={listItem.count} key={index} icon="fa fa-frown-o" color="warning"/>);
        return (
        <div className="col-lg-3">
            <div className="ibox float-e-margins">
                <div className="ibox-content mailbox-content">
                    <div className="file-manager">
                        <div className="space-25">
                        </div>
                        <h5>Call Types</h5>
                        <ul className="folder-list m-b-md" style={divStyle}>
                            {listItems}
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class ListItem extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        var labelColor = "label pull-right label-"+this.props.color;
        return (
        <li>
            <a href={this.props.href}>
                <i className={this.props.icon}></i> 
                {this.props.name}
                <span className={labelColor}>{this.props.value}</span> 
            </a>
        </li>
        );
    }
}

export default TypeList;