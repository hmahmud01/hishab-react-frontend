class Logger{
    
    constructor(){
        
        this.LEVEL_DEBUG = 0;
        this.LEVEL_INFO = 1;
        this.LEVEL_WARN = 2;
        this.LEVEL_ERROR = 3;
        this.LEVEL_NO_LOG = 100;
        
        this.logLevel = this.LEVEL_NO_LOG;
        
        this.log = this.log.bind(this);
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.warning = this.warning.bind(this);
        this.error = this.error.bind(this);
    }
    
    log(message, level){
        if (level === this.LEVEL_DEBUG)
            this.debug(message)
        else if (level === this.LEVEL_INFO)
            this.info(message)
        else if (level === this.LEVEL_WARN)
            this.warning(message)
        else if (level === this.LEVEL_ERROR)
            this.error(message)
    }
    
    debug(message){
        if (this.logLevel <= this.LEVEL_DEBUG)
            console.log(message);
    }
    
    info(message){
        if (this.logLevel <= this.LEVEL_INFO)
            console.log(message);
    }
    
    warning(message){
        if (this.logLevel <= this.LEVEL_WARN)
            console.log(message);
    }
    
    error(message){
        if (this.logLevel <= this.LEVEL_ERROR)
            console.log(message);
    }
}

export default Logger;