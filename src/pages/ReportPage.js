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
import HishabLogo from './images/logo.png';

class ReportPage extends Component {
    
    render() {
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    /** Sales report Contents */
                    <Content>                    	
                    	<SalesReport />
			            <SalesTransactionDetail />
                    </Content>
                    /** Purchase report Contents */
                    <Content>
                    	<PurchaseReport />
                    	<PurchaseTransactionDetail />
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

export default ReportPage;