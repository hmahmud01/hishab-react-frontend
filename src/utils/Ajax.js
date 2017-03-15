import $ from 'jquery';

class Ajax{
    
    constructor(callback){
        this.baseUrl = "http://app.hishab.co";
        this.apiUrl = "/api/v1";
        this.callbackFunction = callback;
        this.getData = this.getData.bind(this);
        this.postData = this.postData.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
    }
    
    getData(url, params){
        if (!url.startsWith("/"))
            url = "/"+url;
        var combinedUrl = this.baseUrl + this.apiUrl + url;
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
        if (this.callbackFunction !== undefined){
            var callbackFunc = this.callbackFunction.bind(this);
            callbackFunc(response, status);
        }
    }
    
}
export default Ajax;