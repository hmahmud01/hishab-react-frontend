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
        return (
        <div className="col-lg-3">
            <div className="ibox float-e-margins">
                <div className="ibox-content mailbox-content">
                    <div className="file-manager">
                        <div className="space-25">
                        </div>
                        <h5>Call Types</h5>
                        <ul className="folder-list m-b-md" style={divStyle}>
                            <ListItem href="#/" name="Translate" value="10" icon="fa fa-frown-o"/>
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
        return (
        <li>
            <a href={this.props.href}>
                <i className={this.props.icon}></i> 
                {this.props.name}
                <span className="label label-warning pull-right">{this.props.value}</span> 
            </a>
        </li>
        );
    }
}

export default TypeList;