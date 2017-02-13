import React, {Component} from 'react';

class TypeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive : false
        };
    }
    
    
    render(){
        const divStyle = {
            padding: "0"
        };

        const types = ['Transcriptions', 'Revision', 'Error', 'Locked','Translation'];
        const colors = ["primary", "success", "danger", "warning", ""];
        const listItems = this.props.items.map(
            (listItem) => 
        <ListItem name={types[listItem.callType % 96]} value={listItem.count} key={listItem.callType} target={listItem.callType} onClick={this.props.onClick} icon="fa fa-tasks" color={colors[listItem.callType % 96]}/>
        );
        return (
        <div className="col-lg-3 animated fadeInUp">
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
        this.state = {
            isActive: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(evemt){
        event.preventDefault();
        this.setState(prevState => 
                      ({isActive: !prevState.isActive}));
        this.props.onClick(this.props.target, this.props.name);
    }
    
    render(){
        var labelColor = "badge pull-right badge-"+this.props.color;
        return (
        <li className={this.state.isActive? "active" : ""}>
            <a href={this.props.href} onClick={this.handleClick}>
                <i className={this.props.icon}></i> 
                {this.props.name}
                <span className={labelColor}>{this.props.value}</span> 
            </a>
        </li>
        );
    }
}

export default TypeList;