chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(/^https:\/\/www\.youtube\/.com\/watch*/.test(tab.url)){
        chrome.tabs.insertCSS(tabId, { file: 'mystyles.css'});
        chrome.tabs.executeScript(tabId, { file: 'foreground.js'})
    }
});
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
});