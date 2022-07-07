function handleButtonClick()
{
    chrome.browserAction.setPopup({
        popup: "page2.html"
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'print_the_comments'){
        q_comment = request.queued_comment;
    }
});