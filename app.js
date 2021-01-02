const textWrapper = document.querySelector('.text-wrapper');
const textArea = document.querySelector('#textarea');
const originText = document.querySelector('#origin-text h3').innerHTML;
const timer = document.querySelector('#timer');
const resetButton = document.querySelector('#reset-button');

var iniTimer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zeros to numbers 9 or below;
function leadingZero(time) {
    if(time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/seconds/hundredths timer;

function runTimer() {
    let currentTimer = leadingZero(iniTimer[0]) + ":" + leadingZero(iniTimer[1]) + ":" + leadingZero(iniTimer[2]);
    timer.innerHTML = currentTimer;
    iniTimer[3]++;

    iniTimer[0] = Math.floor((iniTimer[3]/100)/60);
    iniTimer[1] = Math.floor((iniTimer[3]/100) - (iniTimer[0] * 60));
    iniTimer[2] = Math.floor(iniTimer[3] - (iniTimer[1] *100) - (iniTimer[0] * 6000));

}

// Match the text entered with the text on the origintext page;
function spellCheck(){
    let textEntered = textArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        textWrapper.style.borderColor = "#429890";
    } else {
        if(textEntered == originTextMatch) {
            textWrapper.style.borderColor = "#65ccf3";
        } else {
            textWrapper.style.borderColor = "#e95d0f";
        }
    }
}

// Start the timer;
function start() {
    let textEnteredLength = textArea.value.length;
    if(textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }

}

// Reset everything;
function reset() {
    clearInterval(interval);
    interval = null;
    iniTimer = [0,0,0,0];
    timerRunning = false;

    textArea.value = "";
    timer.innerHTML = "00:00:00";
    textWrapper.style.borderColor = "#000000";

}

// Event listeners for keyboard input and the reset button;
textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener('click', reset, false);