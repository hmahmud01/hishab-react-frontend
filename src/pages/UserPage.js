import React, {Component} from 'react';
import Cookies from 'js-cookie';

import Logger from '../utils/Logger';
import ReportPage from './ReportPage';
import akij from './akij';
import TranscriberPerformancePage from './TranscriberPerformancePage';
import SMSLogPage from './SMSLogPage';
import CallLogPage from './CallLogPage';
import InventoryPage from './InventoryPage';
import ReportDirectory from '../components/ReportDirectory';
import InventoryDirectory from '../components/InventoryDirectory';
import TransactionLogPage from './TransactionLogPage';
import OrganizationLogPage from './OrganizationLogPage';
import NonOrg from './NonOrg';
import Directory from '../components/Directory';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from './images/logo.png';

import Ajax from '../utils/Ajax';
import Json from '../utils/Json';


class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            reportType: "",
            reportStatus: "",
            userType: 0,
            userAttr:[],

        };
        this.widgetClicked = this.widgetClicked.bind(this);
        this.akijClicked = this.akijClicked.bind(this);
        this.SMSClicked = this.SMSClicked.bind(this);
        this.CallClicked = this.CallClicked.bind(this);
        this.TranscriberClicked = this.TranscriberClicked.bind(this);
        this.InventoryClicked = this.InventoryClicked.bind(this);
        this.ReportClicked = this.ReportClicked.bind(this);
        this.InventoryDirClicked = this.InventoryDirClicked.bind(this);
        this.TransactionLogClicked = this.TransactionLogClicked.bind(this);
        this.OrgLogClicked = this.OrgLogClicked.bind(this);
        this.DirectoryClicked = this.DirectoryClicked.bind(this);
        this.log = new Logger();
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";

        var callback = function(response, status){
            this.log.debug(response);
            var data = new Json(response);
            if (status == "success"){
                this.setState({userAttr:data.getData()})

                this.log.debug("userattr:")
                this.log.debug(this.state.userAttr);
            }
        }.bind(this);
        var params = {"uid": Cookies.get("uid")};
        
        var ajax = new Ajax(callback);
        ajax.getData('dynamic/report/list_child_users', params);
    }
    
    widgetClicked(widgetLocation){
        this.setState({
            location: "#/report",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    akijClicked(widgetLocation){
        this.setState({
            location: "#/akij",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    SMSClicked(widgetLocation){
        this.setState({
            location: "#/sms",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    CallClicked(widgetLocation){
        this.setState({
            location: "#/call",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    TranscriberClicked(widgetLocation){
        this.setState({
            location: "#/performance",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    InventoryClicked(widgetLocation){
        this.setState({
            location: "#/inventory",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    ReportClicked(widgetLocation){
        this.setState({
            location: "#/reportdir",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    InventoryDirClicked(widgetLocation){
        this.setState({
            location: "#/inventorydir",
            reportType: widgetLocation,
            phone: widgetLocation
        })
    }

    TransactionLogClicked(widgetLocation){
        this.setState({
            location: "#/transactionlog",
            reportType: widgetLocation,
            phone: widgetLocation
        })
    }

    OrgLogClicked(widgetLocation){
        this.log.debug(widgetLocation);
        this.setState({
            location: "#/orglog",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    DirectoryClicked(widgetLocation){
        this.log.debug(widgetLocation);
        this.setState({
            location: "#/directory",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

                        //     switch (this.state.location){
                        //     case "#/report":
                        //         return(
                        //             <ReportPage type={this.state.reportType}/>
                        //         );
                        //     case "#/inventory":
                        //         return(
                        //             <InventoryPage />
                        //         );
                        //     case "#/directory":
                        //         return(
                        //             <Directory name={this.props.name} phone={this.state.phone} />
                        //         );
                        //     default:
                        //         return(
                        //             <div className="wrapper">
                        //                 <LeftNav logo={HishabLogo}/>
                        //                 <ContentWrapper>
                        //                     <Header username={Cookies.get("uname")}/>
                        //                     <Content>
                        //                         <div className="border-bottom page-heading">
                        //                             <div className="col-lg-12">
                        //                                 <h1>Reports</h1>
                        //                                 <h3>{ this.props.type === 0 ? "User" : "Organization"} Name: {this.props.name}</h3>
                        //                             </div>
                        //                         </div>
                        //                         <div className="row"> 
                        //                             <IconButtonWidget icon="newspaper-o" header="Report" subheader="Directory" className="yellow-bg" onClick={this.widgetClicked}/>                                          
                        //                             <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>    
                        //                         </div>
                        //                     </Content>
                        //                     <Footer/>
                        //                 </ContentWrapper>
                        //             </div>
                        //         );  
                        // }

      

    // <ListItem key={listItem.phone} next={listItem.has_child} name={listItem.name} onClick={listItem.has_child==="True"? this.OrgLogClicked : this.akijClicked }/>
    render() {        
        const listItems = this.state.userAttr.map(
            (listItem) =>
                <ListItem key={listItem.phone} phone={listItem.phone} next={listItem.has_child} count={this.state.userAttr.length} name={listItem.name} onClick={listItem.has_child===true ? this.OrgLogClicked : this.DirectoryClicked } inventoryFunc={this.InventoryClicked} reportFunc={this.ReportClicked}/>              
        );



        switch (this.state.userAttr.length){
            case 1:
                switch (this.state.userAttr[0].org){
                    case false:
                        return(
                            <NonOrg type={this.state.userType} name={this.props.name}/>
                        );
                    case true:
                        return(
                            <Directory name={this.props.name} phone={this.state.phone} />
                        );

                }
            default:
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

                    case "#/reportdir":
                        return(
                            <ReportDirectory name={this.props.name} />
                        );

                    case "#/inventorydir":
                        return(
                            <InventoryDirectory name={this.props.name} />
                        );

                    case "#/transactionlog":
                        return(
                            <TransactionLogPage />
                        );

                    case "#/orglog":
                        return(
                            <OrganizationLogPage name={this.props.name} phone={this.state.phone} />
                        );

                    case "#/directory":
                        return(
                            <Directory name={this.props.name} phone={this.state.phone} />
                        );
                        
                    default:
                        switch(this.state.reportStatus){
                            case "Org":
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
                                                    <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>
                                                    <IconButtonWidget icon="calendar-o" header="Inventory" subheader="Directory" className="navy-bg" onClick={this.InventoryDirClicked}/>
                                                    <IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.TransactionLogClicked}/>
                                                    <IconButtonWidget icon="line-chart" header="Organization" subheader="Reports" className="lazur-bg" onClick={this.OrgLogClicked}/>
                                                </div>
                                            </Content>
                                            <Footer/>
                                        </ContentWrapper>
                                    </div>
                                );

                            case "Terr":
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
                                                    <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>         
                                                    <IconButtonWidget icon="newspaper-o" header="Report" subheader="Directory" className="yellow-bg" onClick={this.ReportClicked}/>   
                                                    <IconButtonWidget icon="calendar-o" header="Inventory" subheader="Directory" className="navy-bg" onClick={this.InventoryDirClicked}/>
                                                    <IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.TransactionLogClicked}/>
                                                </div>
                                            </Content>
                                            <Footer/>
                                        </ContentWrapper>
                                    </div>
                                );

                            case "Depo":
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
                                                    <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>           
                                                    <IconButtonWidget icon="calendar-o" header="Inventory" subheader="Directory" className="navy-bg" onClick={this.InventoryDirClicked}/>
                                                    <IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.TransactionLogClicked}/>
                                                </div>
                                            </Content>
                                            <Footer/>
                                        </ContentWrapper>
                                    </div>
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
                                                    {listItems}
                                                </div>
                                            </Content>
                                            <Footer/>
                                        </ContentWrapper>
                                    </div>
                                );                    
                        }
            }
        }
    }                                                       
}
                                /////////////////////REMAINING OPTIONS MIGHT BE USEFULL FOR LATER ////////////////////////////////////////////////////////////////////////////////   
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // these are inventory and report directory. will be added later.
                                // <IconButtonWidget icon="newspaper-o" header="Report" subheader="Directory" className="yellow-bg" onClick={this.ReportClicked}/>   
                                // <IconButtonWidget icon="calendar-o" header="Inventory" subheader="Directory" className="navy-bg" onClick={this.InventoryDirClicked}/>     

                                // existing possible reports. dont delete
                                // <IconButtonWidget icon="newspaper-o" header="Transactions" subheader="All" className="blue-bg" onClick={this.widgetClicked}/>
                                // <IconButtonWidget icon="calendar-o" header="Transactions" subheader="Monthly" className="yellow-bg" onClick={this.widgetClicked}/>
                                // <IconButtonWidget icon="file-text-o" header="Transactions" subheader="Weekly" className="red-bg" onClick={this.widgetClicked}/>
                                // <IconButtonWidget icon="usd" header="Transactions" subheader="Daily" className="lazur-bg" onClick={this.widgetClicked}/>
                                // <IconButtonWidget icon="line-chart" header="Sales" subheader="All" className="navy-bg" onClick={this.widgetClicked}/>

                                // these are upcoming feature
                                // <IconButtonWidget icon="newspaper-o" header="SMS" subheader="Log" className="navy-bg" onClick={this.SMSClicked}/>
                                // <IconButtonWidget icon="phone" header="Call" subheader="Log" className="lazur-bg" onClick={this.CallClicked}/>
                                // <IconButtonWidget icon="calendar-o" header="Transcriber" subheader="Performance" className="yellow-bg" onClick={this.TranscriberClicked}/>

                                // default case buttons for user
                                // <IconButtonWidget icon="line-chart" header="Akij" subheader="SR Report" className="red-bg" onClick={this.akijClicked}/>
                                // <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>         
                                // <IconButtonWidget icon="newspaper-o" header="Report" subheader="Directory" className="yellow-bg" onClick={this.ReportClicked}/>   
                                // <IconButtonWidget icon="calendar-o" header="Inventory" subheader="Directory" className="navy-bg" onClick={this.InventoryDirClicked}/>
                                // <IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.TransactionLogClicked}/>
                                // <IconButtonWidget icon="line-chart" header="Organization" subheader="Reports" className="lazur-bg" onClick={this.OrgLogClicked}/>
                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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


class ListItem extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.log = new Logger();
        this.branchClick = this.branchClick.bind(this);
    }

    branchClick(){
        // event.preventDefault();
        this.log.debug(this.props.name);
        this.log.debug(this.props.phone);
        this.log.debug(this.props.key);
        this.props.onClick(this.props.phone);
    }

    render(){
        // switch(this.props.count){
        //     case 1:
        //         return(
        //             <div>
        //                 <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.reportFunc} />
        //                 <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Inventory" className="red-bg" onClick={this.props.inventoryFunc} />
        //             </div>                    
        //         );
        //     default:
                return(
                    <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.branchClick} />            
                );

            // default:
            //     return(
            //         <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.onClick} />
            //     );
        // }
    }
}

export default UserPage;