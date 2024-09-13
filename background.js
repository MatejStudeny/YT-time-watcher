chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
    chrome.tabs.sendMessage(tabId, { action: "resetTimer" });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showAlert") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "showAlert",
          message: "YOU HAVE JUST WASTED 10 MINUTES"
        });
      }
    });
  }
});