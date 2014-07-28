var seconds=0,minutes=0,hours=0;
var timer = null;
var dates = [];
var titleIndex = 1;

var projects = new Object();
function Task(skill,phase,category) { //Create new Task object
	this.skill = [skill],
	this.phase = [phase],
	this.category = [category];
}
projects["TI_HSP"] = {"General customer meeting": new Task("LabView","Requirements gathering","Project/deliverable")};
projects["TI_HSP"]["General customer meeting"]["skill"].push("Python");	
projects["TI_MSA"] = {"JIRA bugs fixing": new Task("C++","Development","Project/deliverable")};
projects["TI_MSA"]["JIRA bugs fixing"]["skill"].push("C#");

function tictac() {
	seconds++;
	if(seconds/60==1) {
		minutes++;
		seconds=0;
	}
	if(minutes/60==1) {
		hours++;
		minutes=0;
	}
	p_seconds=seconds;
	p_minutes=minutes;
	if(p_seconds<10) {p_seconds='0'+p_seconds;}
	if(p_minutes<10) {p_minutes='0'+p_minutes;}
	//$("#timer").val(hours + ":" + p_minutes + ":" + p_seconds)
	var select = 0;
	if( window.getSelection().toString() != "" && $("#timer").is(':focus') ) {
		select = 1;
	}
	if(minutes == 0 && hours == 0) {
		$("#timer").val(seconds+" sec");
	}
	else if(hours == 0 & minutes !=0 ) {
		$("#timer").val(minutes+":"+p_seconds+" min");
	}
	else if(hours != 0) {
		$("#timer").val(hours+":"+p_minutes+":"+p_seconds+" hr");
	}
	if(select == 1) {
		$("#timer").select();
	}
}
	
function reset() {
	clearInterval(timer);
    counter=0;
	seconds=0,minutes=0,hours=0;
}
	
function startInterval() {
	timer= setInterval("tictac()", 1000);
}
	
function stopInterval() {
	clearInterval(timer);
}

function readValues() { //When the log button is clicked
	if ($("#project").val() in projects) { //If the project already exists
		if ($("#task").val() in projects[$("#project").val()]) { //If the task already exists
			//if (!($("#skill").val() in projects[$("#project").val()][$("#task").val()]["skill"])) { //If the skill is not present in the list
			if ($.inArray($("#skill").val(), projects[$("#project").val()][$("#task").val()]["skill"]) == -1) {
				projects[$("#project").val()][$("#task").val()]["skill"].push($("#skill").val($("#skill").val()));
			}
			if ($.inArray($("#phase").val(), projects[$("#project").val()][$("#task").val()]["phase"]) == -1) { //If the phase is not present in the list
				projects[$("#project").val()][$("#task").val()]["phase"].push($("#phase").val());
			}
			if ($.inArray($("#category").val(), projects[$("#project").val()][$("#task").val()]["category"]) == -1) { //If the category is not present in the list
				projects[$("#project").val()][$("#task").val()]["category"].push($("#category").val());
			}
		}
		else { //If the task is not present
			projects[$("#project").val()][$("#task").val()] = new Task($("#skill").val(),$("#phase").val(),$("#category").val());
		}
	}
	else { //If the project does not exist
		projects[$("#project").val()] = new Object();
		projects[$("#project").val()][$("#task").val()] = new Task($("#skill").val(),$("#phase").val(),$("#category").val());
	}
}

function findDur(str) {
	var hours = "0", minutes = "0";
	var arr = str.match(/[^0-9]/g);
	if(arr) {
		if((arr[0] == "h" || arr[0] == "H") || arr[0] == ":") {
			if (str.indexOf(arr[0]) != 0) {
				hours = str.split(arr[0])[0];
			}
			if (str.split(arr[0])[1].match(/\d+/g)) {
				minutes = str.split(arr[0])[1].match(/\d+/g)[0];
			}
		}
		else if(arr[0] == ".") {
			if (str.indexOf(arr[0]) != 0) {
				hours = str.split(arr[0])[0];
			}
			if (str.split(arr[0])[1].match(/\d+/g)) {
				minutes = parseFloat("."+str.split(arr[0])[1].match(/\d+/g)[0])*60;
			}
		}
		else if(arr[0] == "m" || arr[0] == "M") {
			if(str.match(/\d+/g)) {
				minutes = str.match(/\d+/g)[0];
			}
		}
		else {
			if(arr.length == 1) {
				if(str.match(/\d+/g)) {
					hours = str.match(/\d+/g)[0];
				}
			}
			else {
				return(str);
			}
		}
	}
	else {
		if(str.match(/\d+/g)) {
			hours = str.match(/\d+/g);
		}
		else {
			return str;
		}
	}

	if(minutes.length == 1) {
		minutes = "0"+minutes;
	}

	if(parseInt(minutes) > 60) {
		var min = parseInt(minutes);
		var hr = min/60;
		var rem = min%60;
		minutes = rem,toString();
		hours = (parseInt(hours)+hr).toString();
	}
	hours = parseInt(hours).toString();
	return(hours+":"+minutes);
}

function addTable() {
	if(dates.indexOf($("#datepicker").val()) == -1) {
		dates.push($("#datepicker").val());
		$("#history").append("<p id="+titleIndex+">"+$("#datepicker").val()+"</p>");
		$("#"+titleIndex).after("<table id="+$("#datepicker").val()+" class='historyTable'></table>");
		titleIndex += 1;
	}
	if($("#clock").attr("data-state")=="enter") {
		$("#"+$("#datepicker").val()).append('<tr><td><a href="#"><img src="images/play.jpg" id="playButton" width="20px" height="20px" style="display:none"></a>'+$('#project').val()+'</td><td>'+$('#task').val()+'</td><td>'+$('#skill').val()+'</td><td>'+$('#phase').val()+'</td><td>'+findDur($('#timer').val())+'</td></tr>');
	}
	else {
		$("#"+$("#datepicker").val()).append('<tr><td><a href="#"><img src="images/play.jpg" id="playButton" width="20px" height="20px" style="display:none"></a>'+$('#project').val()+'</td><td>'+$('#task').val()+'</td><td>'+$('#skill').val()+'</td><td>'+$('#phase').val()+'</td><td>'+$('#timer').val()+'</td></tr>');
	}
	$("#"+$("#datepicker").val()).append('<tr class="hidden"><td>'+$('#category').val()+'</td><td>'+$('#location').val()+'</td><td colspan="3">'+$('#subtask').val()+'</td></tr>');	
	//$("td[colspan=5]").find("p").hide();
	$("#"+$("#datepicker").val()+" tr.hidden").hide();
	$("#theForm")[0].reset();
}

$(function () {
	//$('#datepicker').datepicker().datepicker("setDate", new Date());
	//$('#datepicker').Zebra_DatePicker();
	$("#datepicker").datepicker({
		dateFormat: "dd-mm-yy"
    }).datepicker("setDate", "0");

	$('body').on('click', 'table', function (event) {
		var $target = $(event.target);
		$target.closest("tr").next("tr").toggle("slow");
    });
	
	$('body').on('click', '#playButton', function (event) {
		event.stopPropagation();
		alert("ASDfas");
		//populate main fields
    });
	
	$('body').on('mouseenter', 'table tr', function (event) {
		var $target = $(event.target);
		$target.parent().find("img").show();
    }).on('mouseleave', 'table tr', function (event) {
		var $target = $(event.target);
		$target.parent().find("img").hide();
    });

	//$('#project').focus(); //Make this work!
    $('#project').autocomplete({ //project field autocomplete
        source: function (request, response) {
            var source = Object.getOwnPropertyNames(projects);
			var term = $.ui.autocomplete.escapeRegex(request.term)
              , startsWithMatcher = new RegExp("^" + term, "i")
              , startsWith = $.grep(source, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
              , containsMatcher = new RegExp(term, "i")
              , contains = $.grep(source, function (value) {
                    return $.inArray(value, startsWith) < 0 && 
                        containsMatcher.test(value.label || value.value || value);
                });
            response(startsWith.concat(contains));
        },
        minLength: 0,
        messages: {
            noResults: '',
            results: function () {}
        },
        //autoFocus: true,
        open: function( event, ui ) {
                //$('.ui-autocomplete > li:first-child a').addClass('ui-state-focus first_open');
        },
        focus: function( event, ui ) {            
            //if(ui.item.value != $('.ui-state-focus').text()) {
                //$('.first_open').removeClass('ui-state-focus first_open');
            //}                    
		},   
		select: function( event, ui) {
			$("#project").val(ui.item.value);
			if(event.which != 9) {
				$("#task").focus();
			}
		}
    }).hover(function(event) {
		//$(this).focus();
		//$(this).autocomplete("search", "");
	});
	$('#project').focus(function(event) {
		$(this).autocomplete("search", "");
	});
	//$("ul.ui-autocomplete").appendTo($("div#hoverMe"))
	//$('#project').on('mouseover',function(event){$(this).focus()})
	
	$('#task').autocomplete({ //task field autocomplete
		source: function (request, response) {
			var source = Object.getOwnPropertyNames(projects[$("#project").val()]);
			var term = $.ui.autocomplete.escapeRegex(request.term)
			  , startsWithMatcher = new RegExp("^" + term, "i")
			  , startsWith = $.grep(source, function(value) {
					return startsWithMatcher.test(value.label || value.value || value);
				})
			  , containsMatcher = new RegExp(term, "i")
			  , contains = $.grep(source, function (value) {
					return $.inArray(value, startsWith) < 0 && 
						containsMatcher.test(value.label || value.value || value);
				});
			response(startsWith.concat(contains));
		},
		minLength: 0,
		messages: {
			noResults: '',
			results: function () {}
		},
		//autoFocus: true,
		open: function( event, ui ) {
				//$('.ui-autocomplete > li:first-child a').addClass('ui-state-focus first_open');
		},
		focus: function( event, ui ) {            
			//if(ui.item.value != $('.ui-state-focus').text()){
				//$('.first_open').removeClass('ui-state-focus first_open');
			//}                                  
		},
		select: function( event, ui) {
			$("#task").val(ui.item.value);
			if(event.which != 9) {
				$("#skill").focus();
			}
		}		
	}).hover(function(event) {
		//$(this).focus();
		//$(this).autocomplete("search", "");
	});
	$('#task').focus(function(event) {
		$(this).autocomplete("search", "");
	});
		
	$('#skill').autocomplete({ //skill field autocomplete
        source: function (request, response) {
			var source = projects[$("#project").val()][$("#task").val()]["skill"];
			var term = $.ui.autocomplete.escapeRegex(request.term)
              , startsWithMatcher = new RegExp("^" + term, "i")
              , startsWith = $.grep(source, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
              , containsMatcher = new RegExp(term, "i")
              , contains = $.grep(source, function (value) {
                    return $.inArray(value, startsWith) < 0 && 
                        containsMatcher.test(value.label || value.value || value);
                });
            response(startsWith.concat(contains));
        },
        minLength: 0,
        messages: {
            noResults: '',
            results: function () {}
        },
        //autoFocus: true,
        open: function( event, ui ) {
                //$('.ui-autocomplete > li:first-child a').addClass('ui-state-focus first_open');
        },
        focus: function( event, ui ) {            
            //if(ui.item.value != $('.ui-state-focus').text()){
                //$('.first_open').removeClass('ui-state-focus first_open');
            //}                           
		},
		select: function( event, ui) {
			$("#skill").val(ui.item.value);
			if(event.which != 9) {
				$("#phase").focus();
			}
		}		
    }).hover(function(event) {
		//$(this).focus();
		//$(this).autocomplete("search", "");
    });
	$('#skill').focus(function(event) {
		$(this).autocomplete("search", "");
	});

	$('#phase').autocomplete({ //phase field autocomplete
        source: function (request, response) {
			var source = projects[$("#project").val()][$("#task").val()]["phase"];
			var term = $.ui.autocomplete.escapeRegex(request.term)
              , startsWithMatcher = new RegExp("^" + term, "i")
              , startsWith = $.grep(source, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
              , containsMatcher = new RegExp(term, "i")
              , contains = $.grep(source, function (value) {
                    return $.inArray(value, startsWith) < 0 && 
                        containsMatcher.test(value.label || value.value || value);
                });
            response(startsWith.concat(contains));
        },
        minLength: 0,
        messages: {
            noResults: '',
            results: function () {}
        },
        //autoFocus: true,
        open: function( event, ui ) {
                //$('.ui-autocomplete > li:first-child a').addClass('ui-state-focus first_open');
        },
        focus: function( event, ui ) {            
            //if(ui.item.value != $('.ui-state-focus').text()){
                //$('.first_open').removeClass('ui-state-focus first_open');
            //}      
		},
		select: function( event, ui) {
			$("#phase").val(ui.item.value);
			if(event.which != 9) {
				$("#category").focus();
			}
		}		
    }).hover(function(event) {
		//$(this).focus();
		//$(this).autocomplete("search", "");
    });
	$('#phase').focus(function(event) {
		$(this).autocomplete("search", "");
	});
	
	$('#category').autocomplete({ //category field autocomplete
        source: function (request, response) {
			var source = projects[$("#project").val()][$("#task").val()]["category"];
			var term = $.ui.autocomplete.escapeRegex(request.term)
              , startsWithMatcher = new RegExp("^" + term, "i")
              , startsWith = $.grep(source, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
              , containsMatcher = new RegExp(term, "i")
              , contains = $.grep(source, function (value) {
                    return $.inArray(value, startsWith) < 0 && 
                        containsMatcher.test(value.label || value.value || value);
                });
            response(startsWith.concat(contains));
        },
        minLength: 0,
        messages: {
            noResults: '',
            results: function () {}
        },
        //autoFocus: true,
        open: function( event, ui ) {
                //$('.ui-autocomplete > li:first-child a').addClass('ui-state-focus first_open');
        },
        focus: function( event, ui ) {            
            //if(ui.item.value != $('.ui-state-focus').text()){
              //  $('.first_open').removeClass('ui-state-focus first_open');
           // }                    
		},
		select: function( event, ui) {
			$("#category").val(ui.item.value);
			if(event.which != 9) {
				$("#timer").focus();
			}
		}		
    }).hover(function(event) {
		//$(this).focus();
		//$(this).autocomplete("search", "");
    });
	$('#category').focus(function(event) {
		$(this).autocomplete("search", "");
	});
	
	$("#subtask").hover(function(event) {
		//$(this).focus();
	});
	$("#subtask").keypress(function(event) {
		if(event.which == 13) {
			$("#skill").focus();
		}
	})
	
	$("#clock").click(function() {
		if($("#clock").attr("data-state")=="start") {
			startInterval();
			$("#clock").attr({"data-state":"stop",src:"images/stopClock.jpg"});
		}
		else if($("#clock").attr("data-state")=="stop") { //Stopping the timer
			//handle transition of log to history
			stopInterval();
			readValues();
			addTable();
			reset();
			$("#clock").attr({"data-state":"start",src:"images/startClock.jpg"});
		}
		else { //Manual entry
			//handle transition of log to history			
			readValues();
			addTable();
			$("#clock").attr({"data-state":"start",src:"images/startClock.jpg"});
		}
	})

	$("#timer").click(function() {
		$(this).select();
	})
	
	$("#timer").keyup(function() { //ENTER is also keyup, so logo is changed
		stopInterval();
		reset();
		if($("#timer").val() == "") {
			$("#clock").attr({"data-state":"start",src:"images/startClock.jpg"});
		}
		else {
			$("#clock").attr({"data-state":"enter",src:"images/enter.jpg"});
		}
	})
	
	$("#timer").keypress(function(event) {
		if(event.which == 13) {
			readValues();
			addTable();
			//Reset the fields
			//$("#clock").attr({"data-state":"start",src:"images/startClock.jpg"}); //Handled in keyup itself
		}
	})
	
	$("#billing").click(function() {
		if($("#billing").attr("data-state")=="billable") {
			$("#billing").attr({"data-state":"non-billable",src:"images/non-billable1.jpg"});
		}
		else {
			$("#billing").attr({"data-state":"billable",src:"images/billable1.jpg"});
		}
	})
});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	