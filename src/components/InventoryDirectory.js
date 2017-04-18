import React, {Component} from 'react';
import Cookies from 'js-cookie';

import InventoryPage from '../pages/InventoryPage';

import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import IconButtonWidget from '../components/IconButtonWidget';
import HishabLogo from '../pages/images/logo.png';
import Logger from '../utils/Logger';

class InventoryDirectory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "#/",
            branch : [
                {id: "1", name: "Gulshan"},
                {id: "2", name: "Dhanmondi"}
            ]
        };
        this.widgetClicked = this.widgetClicked.bind(this);
        this.log = new Logger();
    }
    
    componentDidMount() {
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";
    }
    
    widgetClicked(name, id){
        this.setState({
            location: "#/inventory",
            name: name,
            id: id
        });
    }

    
    render() {
        const listItems = this.state.branch.map(
            (listItem) => 
                <ListItem key={listItem.id} bid={listItem.id} name={listItem.name} onClick={this.widgetClicked}/>
        );

        switch (this.state.location){
            case "#/inventory":
                return(
                    <InventoryPage />
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
            <IconButtonWidget icon="line-chart" header={this.props.name} subheader="Report" className="lazur-bg" onClick={this.branchClick}/>
        );
    }
}

export default InventoryDirectory;