import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from '../pages/ReportPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from '../pages/images/logo.png';
import Logger from '../utils/Logger';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';

class ReportDirectory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            branch : [
                {oid: "1", oname: "Gulshan"},
                {oid: "2", oname: "Dhanmondi"}
            ]
        };
        this.widgetClicked = this.widgetClicked.bind(this);
        this.log = new Logger();
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";

        var callback = function(response, status){
            var data = new Json(response);
            if (status == "success"){
                this.log.debug(data.getData());
                // this.setState({branch: data.get('data').cho, data: data.get('data').ous })
            }
        }.bind(this);
        
        var params = {
            "uid": Cookies.get("uid"),
        };
        
        var ajax = new Ajax(callback);
        ajax.getData('system/home/org_list', params);

    }
    
    widgetClicked(name, id){
        this.setState({
            location: "#/report",
            name: name,
            id: id
        });
    }

    
    render() {
        const listItems = this.state.branch.map(
            (listItem) => 
                <ListItem key={listItem.oid} bid={listItem.oid} name={listItem.oname} onClick={this.widgetClicked}/>
        );

        switch (this.state.location){
            case "#/report":
                return(
                    <ReportPage />
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
        this.props.onClick(this.props.name, this.props.bid);
    }

    render(){
        return(
            <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.branchClick}/>
        );
    }
}

export default ReportDirectory;