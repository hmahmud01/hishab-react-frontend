import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';
import TranscriptionForm from '../components/TranscriptionForm';
import HishabLogo from './images/logo.png';


class RevisionFormPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : ""
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount(){
        $.ajax({
            method: 'get',
            url: 'http://192.168.5.2:8000/api/v1/transaction/details',
            data: {
                "uid": Cookies.get("uid"),
                "tid": this.props.transId,
            },
            success:function(response){
                console.log(response);
                var data = $.parseJSON(response);
                this.setState({
                    data: data
                });
                console.log(data);
            }.bind(this),
            error:function(response){
                console.log(response.responseText);
            }.bind(this)
        });
    }
    
    
    render(){
        return(
            <div className="wrapper">
                <LeftNav logo={HishabLogo}/>
                <ContentWrapper>
                    <Header username={Cookies.get("uname")}/>                    
                    <Content>    
                    <h1> Transcription for {this.props.callType} </h1>    
                        <TranscriptionForm transId={this.props.transId} data={this.state.data}/>
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

export default RevisionFormPage;