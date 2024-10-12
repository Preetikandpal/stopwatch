let timer;
let isRunning = false;
let elapsedTime = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const hours = String(Math.floor((elapsedTime / 3600) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime / 60) % 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime * 1000;
        
        timer = setInterval(() => {
            elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function addLap() {
    if (elapsedTime > 0) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        lapsList.appendChild(lapTime);
    }
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', addLap);
