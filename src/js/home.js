var mainData = {};

var app = angular.module('logApp', []);

app.controller('timeLogController', function ($scope, $timeout) {
    'use strict';
    mainData.logData = new newLog();
    mainData.digiTimer = new timer();
    mainData.logData.currentTime = "00:00:00";
    $scope.newLog = mainData.logData;
    
    $scope.currentTime = mainData.logData.currentTime;
    
    $scope.switchTimer = function() {
        mainData.logData.duration = !mainData.logData.duration;
    };
    
    $scope.switchOnTime = function() {
        
        if (!mainData.logData.timerRunning) {
            mainData.logData.timerRunning = true;
            mainData.logData.startTime = (new Date()).getTime();
            runTimer();
        }
        
    };
    
    $scope.switchOffTime = function() {
        mainData.logData.timerRunning = false;
        
        mainData.logData.totalDuration = (new Date()).getTime() - mainData.logData.startTime;
        
        mainData.digiTimer.resetTime();
    };
    
    function runTimer() {
        
        if (mainData.logData.timerRunning) {
            mainData.digiTimer.incrementTime();
            $scope.currentTime = mainData.digiTimer.getDigitalTime();
            $timeout(runTimer, 1000);
        }
        else {
            $timeout.flush();
        }
    }
    

});

app.controller('logHeaderController', function ($scope) {
    'use strict';
    $scope.userName = "Soliton user";
    

});

app.controller('logHistoryController', function ($scope) {
    'use strict';
    

});

$(document).ready(function() {
    $('#datepicker').datepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        todayBtn: "linked",
        orientation: "top left",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true,
        startDate: "-30d",
        endDate: "+0d"
    });
    
    //Do not allow Saturday or Sunday
    var todayDate = new Date();
    if(todayDate.getDay() === 0) {
        todayDate.setDate(todayDate.getDate() - 2);
    }
    else if(todayDate.getDay() === 6) {
        todayDate.setDate(todayDate.getDate() - 1);
    }
    
    //Set the logging date
    $('#datepicker input').datepicker('update', todayDate);
});




