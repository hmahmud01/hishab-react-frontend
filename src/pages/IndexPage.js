import React, {Component} from 'react';
import Header from '../components/Header';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';

class IndexPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <div className="container-fluid">
                <LeftNav/>
                <Header>
                    <h1>Header on</h1>
                    <p>This is going to header on to destruction</p>
                </Header>
                <Content>
                    <h1>I am the content</h1>
                    <p>Since I am the content, then you better get yourself ready</p>
                    <h3>This is another content</h3>
                </Content>
                <Footer>
                    <h2>I am the footer</h2>
                    <p>I am the footer that you deserve</p>
                </Footer>
            </div>
        );
    }
}

export default IndexPage;