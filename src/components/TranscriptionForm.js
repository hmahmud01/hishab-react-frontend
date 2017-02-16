import React, {Component} from  'react'
import sample from '../pages/sound/sample.mp3';
import UserForm from './UserForm';
import SummaryForm from './SummaryForm';
import ProductForm from './ProductForm';

class TranscriptionForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
	render(){
        const divStyle = {
          width: '100%',          
        };
		return (
            <div>
                <UserForm/>
                <ProductForm />
                <SummaryForm />
            </div>

		);
	}
}

export default TranscriptionForm; 