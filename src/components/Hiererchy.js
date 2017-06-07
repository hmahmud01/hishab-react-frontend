import React, {Component} from 'react';

import IconButtonWidget from '../components/IconButtonWidget';

class Hiererchy extends Component{
	constructor(props){
		super(props);
		this.state = {};
		this.clickInfo = this.clickInfo.bind(this);
	}

	clickInfo(){
		console.log("button CLicked");
	}

	render() {
		return(
			<div className="wrapper">
		        <LeftNav logo={HishabLogo}/>
		        <ContentWrapper>
		            <Header username={Cookies.get("uname")}/>
		            <Content>
		            	<div className="col-lg-12">
                            <h1>Reports</h1>
                            <h3>Organization Name : Sample Organization</h3>
                        </div>
                       	<div className="row">
               	        	<IconButtonWidget icon="newspaper-o" header="Sales" subheader="All" className="blue-bg" onClick={this.clickInfo}/>
		    				<IconButtonWidget icon="calendar-o" header="Sales" subheader="Detail" className="yellow-bg" onClick={this.clickInfo}/>
		    				<IconButtonWidget icon="file-text-o" header="Purchase" subheader="All" className="red-bg" onClick={this.clickInfo}/>
		    				<IconButtonWidget icon="usd" header="Purchase" subheader="All" className="lazur-bg" onClick={this.clickInfo}/>
                        	<IconButtonWidget icon="phone" header="Transaction" subheader="Log" className="navy-bg" onClick={this.clickInfo}/>
                        </div>		                    	
		            </Content>                    

		            <Footer/>
		        </ContentWrapper>
		    </div>
		)
	}
}

export default Hiererchy;