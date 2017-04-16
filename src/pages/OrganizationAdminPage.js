import React, {Component} from 'react';

import Cookies from 'js-cookie';
import Logger from '../utils/Logger';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import HishabLogo from './images/logo.png';

import OrgList from '../components/OrgList';

class OrganizationAdminPage extends Component {
	constructor(props){
		super(props);
		this.state = {}
		this.log = new Logger();
	}

	render(){
		return(
			<div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    <Content>
                        <OrgList />
                    </Content>
                    <Footer/>
                </ContentWrapper>
            </div>
		);
	}
}


class ContentWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div id="page-wrapper" className="gray-bg">
                {this.props.children}
            </div>
        );
    }
}


export default OrganizationAdminPage;