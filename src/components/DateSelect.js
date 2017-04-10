import React, {Component} from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Ajax from '../utils/Ajax';
import Json from '../utils/Json';
import Modal from './Modal';

class DateSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: ""
        };
        this.dateSubmit = this.dateSubmit.bind(this);
    }


    componentDidMount(){
        //today's date showing
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'-'+mm+'-'+yyyy;
        this.setState({date : today});
        //static date showing ends
    }


    dateSubmit(event){
        event.preventDefault();
        var day = document.getElementById("day").value;
        var month = document.getElementById("month");
        var monthval = month.options[month.selectedIndex].value;
        var year = document.getElementById("year");
        var yearval = year.options[year.selectedIndex].value;
        var date = day +"-"+monthval+"-"+yearval;
        console.log(date);

        var callback = function(response, status){
            if (status == "success"){
                this.setState({date: date});
                if (this.props.onClick !== undefined){
                    var data = new Json(response);
                    this.props.onClick(data);
                }
            }
        }.bind(this);
        
        var params = {
            "uid": Cookies.get("uid"),
            "day": day,
            "month": monthval,
            "year": yearval
        };
        
        var ajax = new Ajax(callback);
        ajax.getData('reports/sr', params);
    }

                                    //     <label className="font-noraml">Select Date for a Particular Day Report</label>
                                    // <div className="input-group date">
                                    //     <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                    //     <input id="date_1" id="date_submit" type="text" className="form-control" value="04/05/2017" />
                                    //     <span className="input-group-btn">
                                    //         <a className="btn btn-primary" onClick={this.dateSubmit}>
                                    //             Submit
                                    //         </a>
                                    //     </span>
                                    // </div>




    render(){
        return (
            <div>
                <div className="col-lg-12">
                    <div className="col-lg-10">
                        <h1>Sr Report</h1>
                        <h4>Date: {this.state.date}</h4>
                    </div>
                    <div className="col-lg-2 pull-right">
                        <a data-toggle="modal" className="btn btn-warning btn-sm pull-right" href="#modal-date">Select Date</a>                                              
                    </div>               
                </div>

                <Modal id="modal-date" title="Date Select" onClick={this.dateSubmit}>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Day</label>
                                    <div className="col-sm-10" >
                                        <input type="text" className="form-control" placeholder="01" name="day" id="day" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Month</label>
                                    <div className="col-sm-10" >
                                        <select className="form-control m-b" id="month" name="month">
                                            <option value="01">January</option>
                                            <option value="02">February</option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select> 
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Year</label>
                                    <div className="col-sm-10">
                                        <select className="form-control m-b" id="year" name="year">
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                        </select>                                        
                                    </div>
                                </div>

                </Modal>
            </div>          
        );
    }
}

export default DateSelect;





                        