import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportDirectory from './ReportDirectory';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from './images/logo.png';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import akij from './akij';

import ReportPage from './ReportPage';
import InventoryPage from './InventoryPage';
import Directory from '../components/Directory';

class OrganizationLogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            phone: this.props.phone,
            data : [
                {id: "1", name: "Dhaka"}
            ],
            userAttr:[
                {
                    name: "Gulshan",
                    Phone: "017#####",
                    has_child: false,
                },
            ]
        };
        this.widgetClicked = this.widgetClicked.bind(this);
        this.akijClicked = this.akijClicked.bind(this);
        this.InventoryClicked = this.InventoryClicked.bind(this);
        this.savePhone = this.savePhone.bind(this);
        this.DirectoryClicked = this.DirectoryClicked.bind(this);
        this.log = new Logger();
    }
    
    componentDidMount() {
        this.log.debug(this.props.phone);
        this.setState({phone: this.props.phone});
        this.forceUpdate();
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";

        var callback = function(response, status){
            var data = new Json(response);
            if (status == "success"){
                this.setState({userAttr:data.getData()})
                this.log.debug(data.getData());
                this.log.debug("from state");
                this.log.debug(this.state.userAttr);
            }
        }.bind(this);
        
        var params = {
            "oua" : this.state.phone,
            "uid" : Cookies.get("uid"),
        };
        
        var ajax = new Ajax(callback);
        ajax.getData('dynamic/report/list_child_users', params);
        // ajax.getData('http://192.168.21.103/api/v1/dynamic/report/list_child_users', params);
    }
    
    widgetClicked(phone){
        this.setState({
            location: "#/reportdir",
            phone: phone
        });
        this.forceUpdate();
    }

    DirectoryClicked(widgetLocation){
        this.log.debug(widgetLocation);
        this.setState({
            location: "#/directory",
            reportType: widgetLocation,
            phone: widgetLocation
        })
    }

    akijClicked(widgetLocation){
        this.setState({
            location: "#/akij",
            reportType: widgetLocation,
            phone: widgetLocation
        });
        this.forceUpdate();
    }

    InventoryClicked(widgetLocation){
        this.setState({
            location: "#/inventory",
            reportType: widgetLocation,
            phone: widgetLocation
        });
    }

    savePhone(phone){
        this.setState({
            phone: phone
        })
    }
    
    render() {
        const listItems = this.state.userAttr.map(
            (listItem) =>
                <ListItem key={listItem.phone} phone={listItem.phone} next={listItem.has_child} name={listItem.name} stateFunc={this.savePhone} onClick={listItem.has_child===true ? this.widgetClicked : this.DirectoryClicked } inventoryFunc={this.InventoryClicked}/>
        );

        switch (this.state.location){
            case "#/reportdir":
                return(
                    <OrganizationLogPage name={this.props.name} phone={this.state.phone} />
                );
            case "#/akij":
                return(
                    <ReportPage />
                );
            case "#/inventory":
                return(
                    <InventoryPage />
                );
            case "#/directory":
                return(
                    <Directory name={this.props.name} phone={this.state.phone} />
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
                                    <h3>Name: {this.props.name}</h3>
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
        this.log.debug(this.props.key);
        this.log.debug(this.props.phone);
        this.log.debug(this.props.next)
        this.props.onClick(this.props.phone);
    }

    render(){


        // switch(this.props.next){
        //     case true:
        //         return(
        //             <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.branchClick}/>
        //         );
        //     case false:
        //         return(
        //             <div>
        //                 <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.onClick}/>
        //                 <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Inventory" className="red-bg" onClick={this.props.inventoryFunc}/>
        //             </div>                    
        //         );

        //     default:
        //         return(
        //             <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.onClick}/>
        //         );
        return(
            <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.branchClick}/>
        );
        // }
    }
}

export default OrganizationLogPage;