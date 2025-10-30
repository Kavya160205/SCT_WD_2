let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("lapsList");

function startPause() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(getShowTime, 1);
    startPauseBtn.innerHTML = "Pause";
    running = true;
  } else {
    clearInterval(tInterval);
    startPauseBtn.innerHTML = "Resume";
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00.000";
  startPauseBtn.innerHTML = "Start";
  lapsList.innerHTML = "";
  lapCounter = 1;
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = difference % 1000;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds.toString().padStart(3, "0");

  display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
  if (running) {
    const lapTime = document.createElement("li");
    lapTime.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    lapsList.prepend(lapTime);
  }
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
