function timer() {
    
}

timer.prototype =  {
        
        hours : 0,
        minutes : 0,
        seconds : 0,
        
        incrementTime : function() {
        
            if (this.seconds < 59) {
                this.seconds++;
            }
            else {
                if (this.minutes < 59) {
                    this.minutes++;
                    this.seconds = 0;
                }
                else {
                    this.hours++;
                    this.minutes = 0;
                }
            } 
            
        },
            
        getDigitalTime : function() {
            return ("0" + this.hours).slice(-2) + ":" + ("0" + this.minutes).slice(-2) + ":" + ("0" + this.seconds).slice(-2);
        },
        
        resetTime: function() {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
    };