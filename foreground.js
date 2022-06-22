const query_params = new URLSearchParams(location.search);
chrome.runtime.sendMessage({message: 'get_me_the_comments', videoId: query_params.get('v')});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
});