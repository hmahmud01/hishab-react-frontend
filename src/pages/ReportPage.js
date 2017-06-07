import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import SalesReport from '../components/SalesReport';
import SalesTransactionDetail from '../components/SalesTransactionDetail';
import PurchaseReport from '../components/PurchaseReport';
import PurchaseTransactionDetail from '../components/PurchaseTransactionDetail';
import AkijReport from '../components/AkijReport';
import HishabLogo from './images/logo.png';
import example from './example.json';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import DateSelect from '../components/DateSelect';

class ReportPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "01737233902",
            uid: "",            
        };
        this.dateClicked = this.dateClicked.bind(this);
    }

    componentDidMount() {
        this.log.debug("From Report Page");
        this.log.debug(this.props.phone);  
        var uid = Cookies.get("uid");
        if (uid === undefined)
            window.location.hash = "#/";

        if (this.props.phone === undefined){
            this.setState({phone: uid});
        }else{
            this.setState({phone: this.props.phone});
        }

    }
    
    dateClicked(data) {
        this.refs.report.setData(data);
        if (this.refs.report.setData(data))
            this.log.debug("setdata done");
    }
    
    render() {
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>
                    <Content>
                        <DateSelect onClick={this.dateClicked}/>
                        <AkijReport ref="report" phone={this.props.phone}/>
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