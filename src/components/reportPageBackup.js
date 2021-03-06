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



        var url = "transaction/report?uid="+uid;

        var url_akij = "http://192.168.5.34:8000/api/v1/reports/sr?uid="+"01817061650";

        $.getJSON(url_akij, function (data) {
            for(var i=0; i<data.length; i++){
                var prod = data[i].products
                var p_length = prod.length;
                for(var k=0; k<p_length; k++){
                    var item = prod[k];
                    for(var j=0; j<item.attributes.length; j++){
                    }
                }
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
        })
        .fail(function() {
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
        })
        .fail(function() {
        });

        //purchase report
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
        })
        .done(function() {
        })
        .fail(function() {
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
        })
        .fail(function() {
        });

        
        setInterval(function(){
            var callback = function(response, status){
                if (status == "success"){
                    var data = new Json(response);
                    this.setState({items: data.data});            
                }
            }.bind(this);
            
            var params = {
                "uid": Cookies.get("uid"),
            };
            
            var ajax = new Ajax(callback);
            ajax.getData('get/call/count', params);

        //     $.ajax({
        //     method: 'get',
        //     url: 'get/call/count',
        //     data: {
        //         "uid": Cookies.get("uid"),
        //     },
        //     success: function(response) {
        //         var data = $.parseJSON(response);
        //         this.setState({items: data.data});
        //     }.bind(this),
        //     error: function(response) {
        //     }
        // });
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