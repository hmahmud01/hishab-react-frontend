import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from './ReportPage';
import akij from './akij';
import TranscriberPerformancePage from './TranscriberPerformancePage';
import SMSLogPage from './SMSLogPage';

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
        this.TranscriberClicked = this.TranscriberClicked.bind(this);
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

    TranscriberClicked(widgetLocation){
        this.setState({
            location: "#/performance",
            reportType: widgetLocation
        });
    }
    // existing possible reports. dont delete
    // <IconButtonWidget icon="newspaper-o" header="Transactions" subheader="All" className="blue-bg" onClick={this.widgetClicked}/>
    // <IconButtonWidget icon="calendar-o" header="Transactions" subheader="Monthly" className="yellow-bg" onClick={this.widgetClicked}/>
    // <IconButtonWidget icon="file-text-o" header="Transactions" subheader="Weekly" className="red-bg" onClick={this.widgetClicked}/>
    // <IconButtonWidget icon="usd" header="Transactions" subheader="Daily" className="lazur-bg" onClick={this.widgetClicked}/>
    // <IconButtonWidget icon="line-chart" header="Sales" subheader="All" className="navy-bg" onClick={this.widgetClicked}/>

    
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

            case "#/sms":
                return(
                    <SMSLogPage />
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
                                    <h1>Reports</h1>
                                    <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
                                </div>
                            </div>
                            <div className="row">                                
                                <IconButtonWidget icon="line-chart" header="Akij" subheader="SR Report" className="red-bg" onClick={this.akijClicked}/>
                                <IconButtonWidget icon="newspaper-o" header="SMS" subheader="Log" className="blue-bg" onClick={this.SMSClicked}/>
                                <IconButtonWidget icon="calendar-o" header="Transcriber" subheader="Performance" className="yellow-bg" onClick={this.TranscriberClicked}/>
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