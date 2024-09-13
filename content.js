let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  startTimer();
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  if (elapsedTime >= 600000) { // 10 minutes in milliseconds
    chrome.runtime.sendMessage({ action: "showAlert" });
    resetTimer(); // Reset the timer after showing the alert
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopTimer();
    chrome.storage.local.set({ elapsedTime: elapsedTime });
  } else {
    chrome.storage.local.get(['elapsedTime'], (result) => {
      elapsedTime = result.elapsedTime || 0;
      startTimer();
    });
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resetTimer") {
    resetTimer();
  } else if (message.action === "showAlert") {
    alert(message.message);
    // The timer has already been reset in the updateTimer function
  }
});

startTimer();