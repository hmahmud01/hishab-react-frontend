import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
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



        // var url = "transaction/report?uid="+uid;

        // var url_akij = "http://192.168.5.34:8000/api/v1/reports/sr?uid="+"01817061650";

        
        // setInterval(function(){

            
        //     $.ajax({
        //     method: 'get',
        //     url: 'get/call/count',
        //     data: {
        //         "uid": Cookies.get("uid"),
        //         // this.setState.uid = uid
        //     },
        //     success: function(response) {
        //         var data = $.parseJSON(response);
        //         this.setState({items: data.data});
        //     }.bind(this),
        //     error: function(response) {
        //     }
        // });
        // }.bind(this), 30000);
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