import React, {Component} from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){

        return (    
        <div className="footer">
            <div className="pull-right">
                <strong>Copyright</strong> <a href="www.hishab.co"> Hishab Ltd </a> © 2017
            </div>
        </div>
        );
    }
}

export default Footer;