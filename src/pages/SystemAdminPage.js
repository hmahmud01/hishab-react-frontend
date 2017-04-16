import React, {Component} from 'react';
import Cookies from 'js-cookie';

import OrganizationPage from './OrganizationPage';
import OrganizationAdminPage from './OrganizationAdminPage';
import AllUserPage from './AllUserPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from './images/logo.png';
import Logger from '../utils/Logger';

class SystemAdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            reportType: ""
        };
        this.log = new Logger();
        this.addOrganizationClicked = this.addOrganizationClicked.bind(this);
        this.addOrganizationAdminClicked = this.addOrganizationAdminClicked.bind(this);
        this.allUserClicked = this.allUserClicked.bind(this);
        
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }

    addOrganizationClicked(widgetLocation){
        this.setState({
            location: "#/org",
            reportType: widgetLocation
        });
    }

    addOrganizationAdminClicked(widgetLocation){
        this.setState({
            location: "#/orgadmin",
            reportType: widgetLocation
        });
    }

    allUserClicked(widgetLocation){
        this.setState({
            location: "#/alluser",
            reportType: widgetLocation
        });
    }


    
    render() {
        switch (this.state.location){
            case "#/org":
                return(
                    <OrganizationPage />
                );
            case "#/orgadmin":
                return(
                    <OrganizationAdminPage />
                );

            case "#/alluser":
                return(
                    <AllUserPage />
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
                                <IconButtonWidget icon="check" header="Organization" subheader="Add" className="red-bg" onClick={this.addOrganizationClicked}/>
                                <IconButtonWidget icon="check" header="Organization Addmin" subheader="Add" className="lazur-bg" onClick={this.addOrganizationAdminClicked}/>
                                <IconButtonWidget icon="check" header="All User" subheader="List" className="yellow-bg" onClick={this.allUserClicked}/>
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

export default SystemAdminPage;