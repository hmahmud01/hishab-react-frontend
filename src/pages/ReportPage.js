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
            id: "01737233902",
            uid: "",            
        };
    }

    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
        
        //TODO extract json data to sales transaction table
        //Sales report

        var url = "http://192.168.5.2:8000/api/v1/transaction/report?uid="+uid;
        console.log(url)
        $.getJSON(url, function(data){
            var items = [];
            // var val = {this.state.data};
            $.each(data, function(key, val){
                for (var i = 0; i<val.products.length; i++){
                    items.push("<tr>");
                    //organization
                    //total purchase
                    //paid amount
                    //payable
                    //last paid amount
                    //last payment date
                    items.push("<td>" +val.seller.phone+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("<td>" +val.paid_amount+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("<td>" +val.products[i].product_name+"</td>" );
                    items.push("<td>" +val.products[i].product_quantity+"</td>" );
                    items.push("</try>");
                }
            });
            $("<tbody/>", { html: items.join( "" ) }).appendTo( "#sales-report" );    
        })
        .done(function() {
            console.log( "in salse report" );
            console.log( "success" );
        })
        .fail(function() {
            console.log( "in salse report" );
            console.log( "error" );
        });

        //Sales detail report        
        $.getJSON(url, function(data){
            var items = [];
            $.each(data, function(key, val){
                for (var i = 0; i<val.products.length; i++){
                    items.push("<tr>");
                    //transaction id
                    //organization
                    //person
                    //total sell
                    //payment received
                    //receivable
                    //date
                    items.push("<td>" +val.status+"</td>" );
                    items.push("<td>" +val.trx_id+"</td>" );
                    items.push("<td>" +val.products[i].product_name+"</td>" );
                    items.push("<td>" +val.products[i].product_quantity+"</td>" );
                    items.push("<td>" +val.products[i].product_unit_price+"</td>" );
                    items.push("<td>" +val.paid_amount+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("</try>");

                }
            });
            $("<tbody/>", { html: items.join( "" ) }).appendTo( "#sales-transaction-detail" );       
        })
        .done(function() {
            console.log( "in salse detail report" );
            console.log( "success" );
        })
        .fail(function() {
            console.log( "in sales detail report" );
            console.log( "error" );
        });

        //purchase report
        // console.log(url)
        $.getJSON(url, function(data){
            var items = [];
            $.each(data, function(key, val){
                for (var i; i < val.products.length; i++){
                    items.push("<tr>");
                    //organization
                    //total purchase
                    //pad amount
                    //payable
                    //last paid amount
                    //last payment date
                    items.push("<td>" +val.seller.phone+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("<td>" +val.paid_amount+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("<td>" +val.products[i].product_name+"</td>" );
                    items.push("<td>" +val.products[i].product_quantity+"</td>" );
                    items.push("</try>");

                }
            });
            $("<tbody/>", { html: items.join( "" ) }).appendTo( "#purchase-report" );    
            // console.log(items)     
        })
        .done(function() {
            console.log( "in purchase report" );
            console.log( "success" );
        })
        .fail(function() {
            console.log( "in purchase report" );
            console.log( "error" );
        });

        //purchase detail report
        $.getJSON(url, function(data){
            var items = [];
            $.each(data, function(key, val){
                for (var i = 0; i<val.products.length; i++){
                    items.push("<tr>");
                    //transaction id
                    //organization
                    //person
                    //total sell
                    //payment received
                    //receivable
                    //date
                    items.push("<td>" +val.trx_id+"</td>" );
                    items.push("<td>" +val.buyer.phone+"</td>" );
                    items.push("<td>" +val.buyer.phone+"</td>" );
                    items.push("<td>" +val.products[i].product_quantity+"</td>" );
                    items.push("<td>" +val.products[i].product_unit_price+"</td>" );
                    items.push("<td>" +val.paid_amount+"</td>" );
                    items.push("<td>" +val.total_bill+"</td>" );
                    items.push("</try>");

                }
            });
            $("<tbody/>", { html: items.join( "" ) }).appendTo( "#purchase-transaction-detail" );       
        })
        .done(function() {
            console.log( "in purchase detail report" );
            console.log( "success" );
        })
        .fail(function() {
            console.log( "in purchase detail report" );
            console.log( "error" );
        });

        
        setInterval(function(){
            $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/get/call/count',
            data: {
                "uid": Cookies.get("uid"),
                // this.setState.uid = uid
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