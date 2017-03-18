import $ from 'jquery';

class Json{
    
    constructor(jsonString){
        if (jsonString === undefined){
            this.data = {}
        }else{
            this.data = $.parseJSON(jsonString);
        }
        this.addParam = this.addParam.bind(this);
        this.removeParam = this.removeParam.bind(this);
        this.get = this.get.bind(this);
        this.getData = this.getData.bind(this);
    }
    
    addParam(key, value){
        this.data[key] = value;
    }
    
    removeParam(key){
        delete this.data[key];
    }
    
    get(key){
        return this.data[key];
    }
    
    getData(){
        return this.data;
    }
    
}
export default Json;