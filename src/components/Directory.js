import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from '../pages/ReportPage';
import InventoryPage from '../pages/InventoryPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from '../pages/images/logo.png';

import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Logger from '../utils/Logger';

class Directory extends Component{
	constructor(props){
		super(props);
		this.state = {
			location: "#/",
		};
		this.ReportClicked = this.ReportClicked.bind(this);
		this.InventoryClicked = this.InventoryClicked.bind(this);
		this.log = new Logger();
	}

	ReportClicked(){
        this.setState({
            location: "#/report",
            phone: this.props.phone,
        })
    }

    InventoryClicked(){
        this.setState({
            location: "#/inventory",
            phone: this.props.phone,
        })
    }

	render() {
		switch(this.state.location){
			case "#/report" :
				return(<ReportPage phone={this.state.phone} />);
			case "#/inventory" :
				return(<InventoryPage phone={this.state.phone} />);
			default:
				return(
					<div className="wrapper">
                    <LeftNav logo={HishabLogo}/>
                    	<ContentWrapper>
                        	<Header username={Cookies.get("uname")}/>
                            	<Content>
                                	<div className="border-bottom page-heading">
                                    	<div className="col-lg-12">
                                        	<h1>Reports</h1>
                                            <h3>User Name: {this.props.name}</h3>
                                        </div>
                                    </div>
                                    <div className="row"> 
                                    	<IconButtonWidget icon="newspaper-o" header="Report" subheader="Directory" className="yellow-bg" onClick={this.ReportClicked}/>                                          
                                        <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>    
                                    </div>
                                </Content>
                            <Footer/>
                        </ContentWrapper>
                    </div>
				)
		}
		
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

export default Directory;