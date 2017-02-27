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
            success: function(response){
                this.onDataReceibed(response);
            },
            error: function(response){
                this.onDataReceived(response.responseText);
            }
        });
    }
    
    postData(url, params){
        $.ajax({
            method: 'post',
            url: url,
            data: params,
            success: function(response){
                this.onDataReceibed(response);
            },
            error: function(response){
                this.onDataReceived(response.responseText);
            }
        });
    }
    
    onDataReceived(response){
        if (this.callbak !== undefined){
            var callbackFunc = this.callback.bind(this);
            callbackFunc(response);
        }
    }
    
}
export default Ajax;