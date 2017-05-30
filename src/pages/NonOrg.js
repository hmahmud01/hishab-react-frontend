import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import SalesReport from '../components/SalesReport';
import SalesTransactionDetail from '../components/SalesTransactionDetail';
import PurchaseReport from '../components/PurchaseReport';
import PurchaseTransactionDetail from '../components/PurchaseTransactionDetail';
import AkijReport from '../components/AkijReport';
import HishabLogo from './images/logo.png';
import example from './example.json';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import DateSelect from '../components/DateSelect';
import IconButtonWidget from '../components/IconButtonWidget';
import TransactionLogPage from './TransactionLogPage';

class NonOrg extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "01737233902",
            uid: "", 
            location: "#/"           
        };
        this.salseClicked = this.salseClicked.bind(this);
        this.salseDetailClicked = this.salseDetailClicked.bind(this);
        this.purchaseClicked = this.purchaseClicked.bind(this);
        this.purchaseDetailClicked = this.purchaseDetailClicked.bind(this);
        this.TransactionLogClicked = this.TransactionLogClicked.bind(this);
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }

    salseClicked(widgetLocation){
        this.setState({
            location: "#/sales",
            reportType: widgetLocation
        })
    }

    salseDetailClicked(widgetLocation){
        this.setState({
            location: "#/salesdetails",
            reportType: widgetLocation
        })
    }

    purchaseClicked(widgetLocation){
    	this.setState({
    		location: "#/purchase",
    		reportType: widgetLocation
    	})
    }

    purchaseDetailClicked(widgetLocation){
    	this.setState({
    		location: "#/purchasedetail",
    		reportType: widgetLocation
    	})
    }

    TransactionLogClicked(widgetLocation){
        this.setState({
            location: "#/transactionlog",
            reportType: widgetLocation,
            phone: widgetLocation
        })
    }
    
    
    render() {
    	switch (this.state.location){
    		case "#/sales":
    			return(
    				<div className="wrapper">
		                <LeftNav logo={HishabLogo}/>
		                <ContentWrapper>
		                    <Header username={Cookies.get("uname")}/>
		                    <Content>
		                    	<SalesReport />
		                    </Content>                    

		                    <Footer/>
		                </ContentWrapper>
		            </div>    				
    			);
    		case "#/salesdetails":
    			return(
    				<div className="wrapper">
		                <LeftNav logo={HishabLogo}/>
		                <ContentWrapper>
		                    <Header username={Cookies.get("uname")}/>
		                    <Content>
		                    	<SalesTransactionDetail />
		                    </Content>                    

		                    <Footer/>
		                </ContentWrapper>
		            </div>    				
    			);
    		case "#/purchase":
    			return(
    				<div className="wrapper">
		                <LeftNav logo={HishabLogo}/>
		                <ContentWrapper>
		                    <Header username={Cookies.get("uname")}/>
		                    <Content>
		                    	<PurchaseReport />
		                    </Content>                    

		                    <Footer/>
		                </ContentWrapper>
		            </div>    				
    			);
    		case "#/purchasedetail":
    			return(
    				<div className="wrapper">
		                <LeftNav logo={HishabLogo}/>
		                <ContentWrapper>
		                    <Header username={Cookies.get("uname")}/>
		                    <Content>
		                    	<PurchaseTransactionDetail />
		                    </Content>                    

		                    <Footer/>
		                </ContentWrapper>
		            </div>    				
    			);
            case "#/transactionlog":
                return(
                    <TransactionLogPage />
                );
    		default:
    			return(
		            <div className="wrapper">
		                <LeftNav logo={HishabLogo}/>
		                <ContentWrapper>
		                    <Header username={Cookies.get("uname")}/>
		                    <Content>
		                    	<div className="col-lg-12">
                                    <h1>Reports</h1>
                                    <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
                                </div>
                                <div className="row">
                                	<IconButtonWidget icon="newspaper-o" header="Sales" subheader="All" className="blue-bg" onClick={this.salseClicked}/>
		    						<IconButtonWidget icon="calendar-o" header="Sales" subheader="Detail" className="yellow-bg" onClick={this.salseDetailClicked}/>
		    						<IconButtonWidget icon="file-text-o" header="Purchase" subheader="All" className="red-bg" onClick={this.purchaseClicked}/>
		    						<IconButtonWidget icon="usd" header="Purchase" subheader="All" className="lazur-bg" onClick={this.purchaseDetailClicked}/>
                                    <IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.TransactionLogClicked}/>
                                </div>		                    	
		                    </Content>                    

		                    <Footer/>
		                </ContentWrapper>
		            </div>
		        );
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

export default NonOrg;