import React, {Component} from 'react';

class CallList extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
        <div className="col-lg-9 animated fadeInRight">
            <div className="mail-box-header">

                <form method="get" action="#" className="pull-right mail-search">
                    <div className="input-group">
                        <input type="text" className="form-control input-sm" name="search" placeholder="Search email"/>
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-sm btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                <h2>
                    Inbox (16)
                </h2>
                <div className="mail-tools tooltip-demo m-t-md">
                    <div className="btn-group pull-right">
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-right"></i></button>

                    </div>
                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i className="fa fa-refresh"></i> Refresh</button>
                
                </div>
            </div>
                <div className="mail-box">
                <table className="table table-hover table-mail">
                <tbody>
                <tr className="unread">
                    <td className="check-mail">
                        <input type="checkbox" className="i-checks"/>
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Anna Smith</a></td>
                    <td className="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td>
                    <td className=""><i className="fa fa-paperclip"></i></td>
                    <td className="text-right mail-date">6.10 AM</td>
                </tr>
                <tr className="unread">
                    <td className="check-mail">
                        <input type="checkbox" className="i-checks" checked=""/>
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Jack Nowak</a></td>
                    <td className="mail-subject"><a href="mail_detail.html">Aldus PageMaker including versions of Lorem Ipsum.</a></td>
                    <td className=""></td>
                    <td className="text-right mail-date">8.22 PM</td>
                </tr>
                <tr className="read">
                    <td className="check-mail">
                        <input type="checkbox" className="i-checks"/>
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Facebook</a> <span class="label label-warning pull-right">Clients</span> </td>
                    <td className="mail-subject"><a href="mail_detail.html">Many desktop publishing packages and web page editors.</a></td>
                    <td className=""></td>
                    <td className="text-right mail-date">Jan 16</td>
                </tr>                
                </tbody>
                </table>


                </div>
            </div>
        );
        
    }
}

export default CallList;