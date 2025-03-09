let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const startBtn = document.getElementById('start-btn');
const statusMessage = document.getElementById('status-message');
const container = document.getElementById('container');
const curveCircle = document.getElementById('curve-circle');
let isRunning = false;

function createCircles() {
  for (let i = 0; i < 30; i++) {
    const circle = document.createElement('div');
    const size = Math.random() * 150 + 50;
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${top}%`;
    circle.style.left = `${left}%`;
    circle.style.background = `radial-gradient(circle, rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1) 0%, rgba(0,0,0,0) 70%), url('https://www.transparenttextures.com/patterns/noise.png')`;

    container.appendChild(circle);
  }
}

function toggleTimer() {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  startBtn.textContent = "Stop";
  isRunning = true;
  curveCircle.style.animation = "moveCurve 2s linear infinite";
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
    progressBar.style.width = `${(seconds / 240) * 100}%`;
    if (seconds >= 240) stopTimer();
  }, 800);
}

function stopTimer() {
  clearInterval(timerInterval);
  curveCircle.style.animation = 'none';
  updateStatusMessage(seconds);
  startBtn.textContent = "Start";
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  timerDisplay.textContent = formatTime(seconds);
  progressBar.style.width = '0%';
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateStatusMessage(sec) {
  if (sec <= 30) {
    statusMessage.textContent = "심각하게 손상된 폐 - Severely Damaged Lungs";
  } else if (sec <= 60) {
    statusMessage.textContent = "여전히 위험한 폐 - Still Risky Lungs";
  } else if (sec <= 90) {
    statusMessage.textContent = "일반적인 폐 - Average Lungs";
  } else if (sec <= 120) {
    statusMessage.textContent = "좋은 폐 - Good Lungs";
  } else {
    statusMessage.textContent = "당신은 마라톤 선수인가요? - Are you a marathon runner?";
  }
}

// Create circles on load
createCircles();