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
    constructor(props){
        super(props);
        this.state = {
            id: "01737233902"
        };
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        
        //TODO extract json data to table
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/report?uid=01737233902',
            data: {                
                "uid": Cookies.get("uid"),
            },
            success: function(response) {
                var data = $.parseJSON(response);
                console.log(response);
            }.bind(this),
            error: function(response) {
                console.log(response.responseText);
            }
        });
        
        setInterval(function(){
            $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/get/call/count',
            data: {
                "uid": Cookies.get("uid"),
            },
            success: function(response) {
                var data = $.parseJSON(response);
                console.log(response);
                this.setState({items: data.data});
            }.bind(this),
            error: function(response) {
                console.log(response.responseText);
            }
        });
        }.bind(this), 30000);
    }
    
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