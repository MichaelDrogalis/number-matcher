// Issue 1: Bigger text.
// Issue 2: No 0 numbers.

var MAX = 10.0;
            
var a = makeInitialRandomNumber();
var b = makeDependantNumber(a);
            
var formatted_a = formattedNumber(a);
var formatted_b = formattedNumber(b);
            
var trick_numbers = makeTrickNumbers(a, b); 
var board = makeBoard(formatted_a, formatted_b, trick_numbers);

var MAX_SELECTED = 2;
var n_selected = 0;

$(document).ready(function() {
    var index = 0;
    
    $(".number").each(function() {
        $(this).text(board[index]);
        
        if ((board[index] == formatted_a) || (board[index] == formatted_b)) {
            $(this).addClass("correct");
        }
        
        index++;
    });
    
    $(".number").click(function() {
        if ($(this).hasClass("selected")) {
            $(this).toggleClass("selected");
            
            if (n_selected > 0) {
                n_selected--;
            }
        } else {
            if (n_selected < MAX_SELECTED) {
                n_selected++;
                $(this).toggleClass("selected");
                
                checkWin();
            }
        }
    });
    
    $("#replay").hide();
});

function makeInitialRandomNumber() {
    return (Math.round((Math.random() * MAX) * 100) / 100);
}
            
function makeDependantNumber(independant_number) {
    return (Math.round((MAX - independant_number) * 100) / 100);
}
            
function formattedNumber(number) {
    return number.toFixed(2);
}
            
function makeSimiliarNumber(number, used_numbers) {
    var similiar_number;
                
    do {
        similiar_number = formattedNumber(similiarNumber(number));
    } while ((similiar_number == number) || (contains(used_numbers, similiar_number)) || (addsToMax(used_numbers, similiar_number)));
                
    return similiar_number;
}

function addsToMax(used_numbers, similiar_number) {
	var matches = $.map(used_numbers, function(k) {
	   return (formattedNumber(parseFloat(k)) + similiar_number) == MAX;
	});
	
	return contains(matches, true);
}
            
function similiarNumber(number) {
    return Math.floor((Math.floor(number * 10) + Math.random()) * 10) / 100;
}
            
function makeTrickNumbers(independant, dependant) {
    result = new Array();
    
    for (k = 0; k < 4; k++) {
        result[k] = makeSimiliarNumber(independant, result);
    }
                
    for (k = 4; k < 7; k++) {
        result[k] = makeSimiliarNumber(dependant, result);
    }
                
    return result;
}
            
function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
            
function makeBoard(independant, dependant, trick_numbers) {
    return shuffle(flatten([independant, dependant, trick_numbers]));
}
            
function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}
            
function flatten(array){
    var flat = [];
    
    for (var i = 0, l = array.length; i < l; i++){
        var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
        if (type) {
            flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]);
        }
    }
    
    return flat;
}

function checkWin() {
    if (n_selected == MAX_SELECTED) {
        var selected = $(".selected").map(function() {
            return this.innerHTML;
        });
        
        if (contains(selected, formatted_a) && contains(selected, formatted_b)) {
            $("#status").text("Right");
            
            $("#status").removeClass("wrong");
            $("#status").addClass("right");
        } else {
            $("#status").text("Wrong");
            
            $("#status").removeClass("right");
            $("#status").addClass("wrong");
            
            highlightLosersAsRed();
            highlightWinnersAsGreen();
        }
        
        showReplayButton();
    }
}

function highlightLosersAsRed() {
    $(".selected").addClass("loser");
}

function showReplayButton() {
    $("#replay").show();
}

function highlightWinnersAsGreen() {
    $(".correct").each(function() {
        if ($(this).hasClass("selected")) {
            $(this).addClass("yellow");
        } else {
            $(this).addClass("right");
        }
    });
}