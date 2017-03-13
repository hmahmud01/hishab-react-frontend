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

        var url = "http://app.hishab.co/api/v1/transaction/report?uid="+uid;
        console.log(url)

        var url_akij = "http://192.168.5.34:8000/api/v1/reports/sr?uid="+"01817061650";
        console.log(url_akij);

        $.getJSON(url_akij, function (data) {
            console.log(url_akij);  
            for(var i=0; i<data.length; i++){
                console.log("inside scope number: "+data[i].products.length);
                console.log("buyer phone: "+data[i].buyer.phone+" buyer name: "+data[i].buyer.name);
                console.log("buyer phone: "+data[i].seller.phone+" buyer name: "+data[i].seller.name);
                console.log("status: "+data[i].status);
                console.log("trx_id: "+data[i].trx_id);
                var prod = data[i].products
                var p_length = prod.length;
                for(var k=0; k<p_length; k++){
                    console.log("inside products scope");
                    var item = prod[k];
                    console.log("p_id: "+item.product_id);
                    console.log("p_name: "+item.product_name);
                    console.log("p_unit_price: "+item.product_unit_price);
                    console.log("p_complementary_quantity: "+item.product_complementary_quantity);
                    console.log("p_quantity: "+item.product_quantity);
                    console.log("p_discount: "+item.product_discount);
                    console.log("p_attr: "+item.attributes.length);
                    for(var j=0; j<item.attributes.length; j++){
                        console.log(item.attributes[j].key+" : "+item.attributes[j].value);
                    }
                }
                console.log("paid_amount: "+data[i].paid_amount);
                console.log("total_bill: "+data[i].total_bill);
                console.log("discount_amount: "+data[i].discount_amount);
            }
        });

        $.getJSON(url, function(data){
            var items = [];
            // var val = {this.state.data};
            $.each(data, function(key, val){
                for (var i = 0; i<val.products.length; i++){
                    items.push("<tr>");
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
            url: 'http://app.hishab.co/api/v1/get/call/count',
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
                    <Content>
                        <AkijReport />
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