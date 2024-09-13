
const startBtn = document.querySelector(".start");
const lapBtn = document.querySelector(".lap");
const resetBtn = document.querySelector(".reset");
const clearLapsBtn = document.querySelector(".clear-laps");
const minDisplay = document.querySelector(".min");
const secDisplay = document.querySelector(".sec");
const msecDisplay = document.querySelector(".msec");
const lapList = document.querySelector(".lap-list");
const rotatingDot = document.querySelector(".rotating-dot");
const outerCircle = document.querySelector(".outer-circle"); 


let intervalId = null;
let min = 0;
let sec = 0;
let msec = 0;
let lapCount = 0;
let isRunning = false;


const startStopwatch = () => {
  if (!isRunning) {
    startBtn.textContent = "Pause";
    lapBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    outerCircle.classList.add("timer-running"); 
    isRunning = true;

    rotatingDot.style.animationPlayState = "running";

    intervalId = setInterval(() => {
      msec++;
      if (msec >= 100) {
        msec = 0;
        sec++;
      }
      if (sec >= 60) {
        sec = 0;
        min++;
      }

      
      minDisplay.textContent = String(min).padStart(2, "0");
      secDisplay.textContent = String(sec).padStart(2, "0");
      msecDisplay.textContent = String(msec).padStart(2, "0");
    }, 10);
  } else {
    clearInterval(intervalId);
    startBtn.textContent = "Start";
    outerCircle.classList.remove("timer-running");
    isRunning = false;

    rotatingDot.style.animationPlayState = "paused"; 
  }
};


const resetStopwatch = () => {
  clearInterval(intervalId);
  min = sec = msec = lapCount = 0;
  minDisplay.textContent = secDisplay.textContent = msecDisplay.textContent = "00";
  startBtn.textContent = "Start";
  lapList.innerHTML = "";
  lapBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  clearLapsBtn.classList.add("hidden");
  isRunning = false;

  outerCircle.classList.remove("timer-running"); 

  rotatingDot.style.animation = "none"; 
  void rotatingDot.offsetWidth; 
  rotatingDot.style.animation = ""; 
};


const addLap = () => {
  lapCount++;
  const lapItem = document.createElement("li");
  lapItem.className = "lap-item";
  lapItem.textContent = `Lap ${lapCount}: ${minDisplay.textContent}:${secDisplay.textContent}:${msecDisplay.textContent}`;
  lapList.appendChild(lapItem);
  lapList.classList.remove("hidden");
  clearLapsBtn.classList.remove("hidden");
};


const clearLaps = () => {
  lapList.innerHTML = "";
  lapList.classList.add("hidden");
  clearLapsBtn.classList.add("hidden");
};


startBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
clearLapsBtn.addEventListener("click", clearLaps);
