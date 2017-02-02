import React, {Component} from 'react';

class Header extends Component {
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
                <div className="col-sm-12" style={divStyle}>
                    {this.props.children}
                </div>
            </div>    
        </header>
        );
    }
}

export default Header;