// Stopwatch logic
let startTime, elapsedTime = 0, timerInterval;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const display = document.getElementById("display");
const lapsList = document.getElementById("lapsList");
const progressCircle = document.getElementById("progress");

const dashArray = 565;

function formatTime(ms) {
  const totalMilliseconds = Math.floor(ms / 10);
  const hours = Math.floor(totalMilliseconds / 360000);
  const minutes = Math.floor((totalMilliseconds % 360000) / 6000);
  const seconds = Math.floor((totalMilliseconds % 6000) / 100);
  const hundredths = totalMilliseconds % 100;

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (hundredths < 10 ? "0" : "") + hundredths
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const progress = (totalSeconds % 60) / 60;
  progressCircle.style.strokeDashoffset = dashArray - dashArray * progress;
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    startStopBtn.textContent = "STOP";
  } else {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = "START";
  }
}

function recordLap() {
  if (running) {
    lapCounter++;
    const li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCounter}</span> ${formatTime(elapsedTime)}`;
    lapsList.prepend(li);
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  display.textContent = "00:00:00:00";
  startStopBtn.textContent = "START";
  lapsList.innerHTML = "";
  lapCounter = 0;
  progressCircle.style.strokeDashoffset = dashArray;
}

startStopBtn.addEventListener("click", startStop);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);

// 🎇 Animated Particle Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w, h, particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > w) this.speedX *= -1;
    if (this.y < 0 || this.y > h) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();
