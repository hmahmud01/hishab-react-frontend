import React, {Component} from 'react';
import Cookies from 'js-cookie';

import ReportPage from './ReportPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from './images/logo.png';
import Logger from '../utils/Logger';

class ReportDirectory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            data : [
                {id: "1", name: "Gulshan"}
            ]
        };
        this.widgetClicked = this.widgetClicked.bind(this);
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    widgetClicked(name, id){
        this.setState({
            location: "#/report",
            name: name,
            id: id
        });
    }

    // <IconButtonWidget icon="line-chart" header="Akij" subheader="SR Report" className="red-bg" onClick={this.akijClicked}/>
    // <IconButtonWidget icon="file-text-o" header="Akij" subheader="Inventory" className="blue-bg" onClick={this.InventoryClicked}/>   

    
    render() {
        const listItems = this.state.data.map(
            (listItem) =>
                <ListItem key={listItem.id.toString()} bid={listItem.id} name={listItem.name} onClick={this.widgetClicked}/>
        );

        switch (this.state.location){
            case "#/report":
                return(
                    <ReportPage name={this.state.name} bid={this.state.id}/>
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

    branchClick(event){
        event.preventDefault();
        this.log.debug(this.props.name);
        this.log.debug(this.props.bid);
        // this.props.onClick(this.props.name, this.props.bid);
    }

    render(){
        return(
            <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="red-bg" onClick={this.props.onClick}/>
        );
    }
}

export default ReportDirectory;