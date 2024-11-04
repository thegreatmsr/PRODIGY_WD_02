let startTime;
let elapsedTime = 0;
let timerInterval;
let lapNumber = 1;

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 100);
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.0";
    lapsList.innerHTML = "";
    lapNumber = 1;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function addLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(lapItem);
    lapNumber++;
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
