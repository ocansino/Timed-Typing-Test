const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var wordCountDisplay = document.querySelector("#wordcount");
var wpm = document.querySelector("#wpm");
var errorDisplay = document.querySelector("#errors");
var accuracyDisplay = document.querySelector("#accuracy");
var score1Display = document.querySelector("#score1");
var score2Display = document.querySelector("#score2");
var score3Display = document.querySelector("#score3");
var time1Display = document.querySelector("#time1");
var time2Display = document.querySelector("#time2");
var time3Display = document.querySelector("#time3");

var timer = [0, 0, 0, 0];
var temp;
var wpmCalc;
var errors = 0;
var accuracy;
var wordCount = 0;
var timerCount = !1;
var score1 = 0;
var score2 = 0;
var score3 = 0;
var time1, time2, time3 = 0;


// count words typed
function countWords() {
    var separate;
    for (var i = 0; i < originText.length; i++) {
        separate = originText.split(" ");
        break
    }
    wordCount = separate.length;
    return wordCount;
}

// Adds zero to make it look nice
function addZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

//runs a timer 
function Timer() {
	var currentTime = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000)
}


// checks to see if there are any spelling errors
function spellCheck() {
	  countWords();
    var textEntered = testArea.value;
    var originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered == originText) {
        clearInterval(temp);
        testWrapper.style.borderColor = "#008000";
        if (timer[0] >= 1) {
            var completeTime = timer[0] + timer[1] / 60;
            wpmCalc = Math.round(wordCount / completeTime)
        } else {
            var accurateMeasure = timer[1] / 60;
            wpmCalc = Math.round(wordCount / accurateMeasure)
        }
        wpm.innerHTML = wpmCalc;
        accuracy = Math.round((wordCount - errors) / wordCount * 100);
        if (accuracy < 0) {
        	accuracy = 0;
        }
        accuracyDisplay.innerHTML = accuracy + "%"
        if(accuracy >= score3){
          var currentTime = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]);
          if(accuracy >= score2){
            if(accuracy > score1){
              score2 = score1;
              score2Display.innerHTML = score2 + "%"
              time2Display.innerHTML = time1Display.innerHTML;
              score1 = accuracy;
              score1Display.innerHTML = score1 + "%"
              time1 = timer;
              time1Display.innerHTML = currentTime;
            }
            else{
              score3 = score2;
              score3Display.innerHTML = score3 + "%"
              time3Display.innerHTML = time2Display.innerHTML;
              score2 = accuracy;
              score2Display.innerHTML = score2 + "%"
              time2Display.innerHTML = currentTime;
            }
          }
          else{
            score3 = accuracy;
            score3Display.innerHTML = score3 + "%"
            time3Display.innerHTML = currentTime;
          }
         
        }
        
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"
        } else {
            errors++;
            errorDisplay.innerHTML = errors;
            testWrapper.style.borderColor = "#8B0000"
        }
    }
}

// timer activates on type
function start() {
	var textEnteredLength = testArea.value.length;
    wordCountDisplay.innerHTML = wordCount;
    if (textEnteredLength === 0 && !timerCount) {
        timerCount = !0;
        temp = setInterval(Timer, 10)
    }
}

//reset variables and functions
function reset() {
    clearInterval(temp);
    temp = null;
    timer = [0, 0, 0, 0];
    timerCount = !1;
    wpmCalc = 0;
    errors = 0;
    accuracy = 0;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wpm.innerHTML = "---";
    errorDisplay.innerHTML = "---";
    accuracyDisplay.innerHTML = "---";
    wordCountDisplay.innerHTML = "---"
}

//keyboard inputs
testArea.addEventListener("keypress", start, !1);
testArea.addEventListener("keyup", spellCheck, !1);
resetButton.addEventListener("click", reset, !1);
