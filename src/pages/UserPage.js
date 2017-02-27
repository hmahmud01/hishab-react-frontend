import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from './ReportPage';
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
    
    render() {
        switch (this.state.location){
            case "#/":
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
                                <IconButtonWidget icon="newspaper-o" header="Transactions" subheader="All" className="blue-bg" onClick={this.widgetClicked}/>
                                <IconButtonWidget icon="calendar-o" header="Transactions" subheader="Monthly" className="yellow-bg" onClick={this.widgetClicked}/>
                                <IconButtonWidget icon="file-text-o" header="Transactions" subheader="Weekly" className="red-bg" onClick=   {this.widgetClicked}/>
                                <IconButtonWidget icon="usd" header="Transactions" subheader="Daily" className="lazur-bg" onClick={this.widgetClicked}/>
                                <IconButtonWidget icon="line-chart" header="Sales" subheader="All" className="navy-bg" onClick={this.widgetClicked}/>
                            </div>
                        </Content>
                        <Footer/>
                    </ContentWrapper>
                </div>
            );
            case "#/report":
                return(
                    <ReportPage type={this.state.reportType}/>
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