import React, {Component} from 'react';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        const divStyle = {
            color: '#000',
            backgroundColor: '#888',
        };
        return (
        <header>
            <div className="row">
                <div className="col-md-9" style={divStyle}>
                    {this.props.children}
                </div>
            </div>    
        </header>
        );
    }
}

export default Content;