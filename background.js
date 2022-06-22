let youtube_api_options = {
    part: 'snippet',
    maxResults: '100',
    order: 'relevance',
    textFormat: 'plainText',
    key: 'AIzaSyCk84uaYs0NkkRpmFrKaWYmBR6_UIszRF4'
}
function get_comments(videoId){
    let fetch_string = 'https://youtube.googleapis.com/youtube/v3/commentThreads?'
    fetch_string += 'part=${youtube_api_options.part}&';
    fetch_string += 'maxResults=${youtube_api_options.maxResults}&';
    fetch_string += 'order=${youtube_api_options.order}&';
    fetch_string += 'textFormat=${youtube_api_options.textFormat}&';
    fetch_string += 'videoId=${youtube_api_options.videoId}&';
    fetch_string += 'key=${youtube_api_options.key}&';

    console.log(fetch_string);
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(/^https:\/\/www\.youtube\/.com\/watch*/.test(tab.url)){
        chrome.tabs.insertCSS(tabId, { file: 'mystyles.css'});
        chrome.tabs.executeScript(tabId, { file: 'foreground.js'})
    }
});
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if(request.message === 'get_me_the_comments'){
        get_comments(request.videoId);
        //https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&order=relevance&textFormat=plainText&videoId=gnprhsRHSZg&key=AIzaSyCk84uaYs0NkkRpmFrKaWYmBR6_UIszRF4
    }
});