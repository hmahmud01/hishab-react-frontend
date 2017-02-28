import $ from 'jquery';

class Ajax{
    
    constructor(callback){
        this.callbackFunction = callback;
        this.getData = this.getData.bind(this);
        this.postData = this.postData.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
    }
    
    getData(url, params){
        $.ajax({
            method: 'get',
            url: url,
            data: params,
            success: function(response, status){
                try{
                    this.onDataReceived(response, status);
                }catch (err){
                    var response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this),
            error: function(response, status){
                try{
                this.onDataReceived(response.responseText, status);
                }catch (err){
                    var response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this)
        });
    }
    
    postData(url, params){
        $.ajax({
            method: 'post',
            url: url,
            data: params,
            success: function(response, status){
                try{
                    this.onDataReceived(response, status);
                }catch (err){
                    var response = {msg: "Server Connection Error"};
                    this.onDataReceived(response, 400);
                }
            }.bind(this),
            error: function(response, status){
                try{
                    this.onDataReceived(response.responseText, status);
                }catch(err){
                    var response = {msg: "Server Connection Error"};
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