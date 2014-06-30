function newLog() {
    
    
}

newLog.prototype = {
        
        date: "", 
        project: "", 
        task: "", 
        skill: "", 
        phase: "", 
        place: "", 
        comment: "", 
        billable: true, 
        duration: false, 
        timeLog: 0, 
        startTime: 0,
        timerRunning: false,
        totalDuration: 0,
        currentTime: "",
        parseTime: function(time) {
            //Parse the user entered duration time
        },
        calculateDuration: function(start_time, end_time) {
            //timer method
        }
    };