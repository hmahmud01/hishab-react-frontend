import $ from 'jquery';
import Logger from './Logger';

class Ajax{
    
    constructor(callback){
        // this.baseUrl = "http://192.168.5.2:8000";
        this.baseUrl = "http://192.168.5.70:8000";
        // this.baseUrl = "http://127.0.0.1:8000";
        this.apiUrl = "/api/v1";
        this.callbackFunction = callback;
        this.getData = this.getData.bind(this);
        this.postData = this.postData.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
        
        this.log = new Logger();
    }
    
    getData(url, params){
        var combinedUrl = "";
        if(url.startsWith("h")){
            combinedUrl = url;
        }else if(!url.startsWith("/")){
            url = "/"+url;
            combinedUrl = this.baseUrl + this.apiUrl + url;
        }
        // if (!url.startsWith("/"))
        //     url = "/"+url;
        // var combinedUrl = this.baseUrl + this.apiUrl + url;
        $.ajax({
            method: 'get',
            url: combinedUrl,
            data: params,
            success: function(response, status){
                try{
                    this.onDataReceived(response, status);
                }catch (err){
                    response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this),
            error: function(response, status){
                try{
                this.onDataReceived(response.responseText, status);
                }catch (err){
                    response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this)
        });
    }
    
    postData(url, params){
        if (!url.startsWith("/"))
            url = "/"+url;
        var combinedUrl = this.baseUrl + this.apiUrl + url;
        $.ajax({
            method: 'post',
            url: combinedUrl,
            data: params,
            success: function(response, status){
                try{
                    this.onDataReceived(response, status);
                }catch (err){
                    response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this),
            error: function(response, status){
                try{
                    this.onDataReceived(response.responseText, status);
                }catch(err){
                    response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this)
        });
    }
    
    onDataReceived(response, status){
        this.log.debug("Request Status: " + status);
        if (this.callbackFunction !== undefined){
            var callbackFunc = this.callbackFunction.bind(this);
            callbackFunc(response, status);
        }
    }
    
}
export default Ajax;