import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from './ReportPage';
import akij from './akij';
import TranscriberPerformancePage from './TranscriberPerformancePage';
import SMSLogPage from './SMSLogPage';
import CallLogPage from './CallLogPage';
import InventoryPage from './InventoryPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from './images/logo.png';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            reportType: ""
        };
        this.widgetClicked = this.widgetClicked.bind(this);
        this.akijClicked = this.akijClicked.bind(this);
        this.SMSClicked = this.SMSClicked.bind(this);
        this.CallClicked = this.CallClicked.bind(this);
        this.TranscriberClicked = this.TranscriberClicked.bind(this);
        this.InventoryClicked = this.InventoryClicked.bind(this);
        this.log = new Logger();
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    widgetClicked(widgetLocation){
        this.setState({
            location: "#/report",
            reportType: widgetLocation
        });
    }

    akijClicked(widgetLocation){
        this.setState({
            location: "#/akij",
            reportType: widgetLocation
        });
    }

    SMSClicked(widgetLocation){
        this.setState({
            location: "#/sms",
            reportType: widgetLocation
        });
    }

    CallClicked(widgetLocation){
        this.setState({
            location: "#/call",
            reportType: widgetLocation
        });
    }

    TranscriberClicked(widgetLocation){
        this.setState({
            location: "#/performance",
            reportType: widgetLocation
        });
    }

    InventoryClicked(widgetLocation){
        this.setState({
            location: "#/inventory",
            reportType: widgetLocation
        });
    }

    
    render() {
        switch (this.state.location){
            case "#/report":
                return(
                    <ReportPage type={this.state.reportType}/>
                );

            case "#/akij":
                return(
                    <ReportPage />
                );

            case "#/inventory":
                return(
                    <InventoryPage />
                );

            case "#/sms":
                return(
                    <SMSLogPage />
                );

            case "#/call":
                return(
                    <CallLogPage />
                );

            case "#/performance":
                return(
                    <TranscriberPerformancePage />
                );

            default:
                return(
                <div className="wrapper">
                    <LeftNav logo={HishabLogo}/>
                    <ContentWrapper>
                        <Header username={Cookies.get("uname")}/>
                        <Content>
                            <div className="border-bottom page-heading">
                                <div className="col-lg-12">
                                    <h1>System Admin Page</h1>
                                    <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
                                </div>
                            </div>
                            <div className="row">                                
                                <IconButtonWidget icon="line-chart" header="Organization" subheader="Add" className="red-bg" onClick={this.akijClicked}/>
                                <IconButtonWidget icon="file-text-o" header="Organization Addmin" subheader="Add" className="blue-bg" onClick={this.InventoryClicked}/>
                                <IconButtonWidget icon="file-text-o" header="All User" subheader="List" className="blue-bg" onClick={this.InventoryClicked}/>
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

export default UserPage;