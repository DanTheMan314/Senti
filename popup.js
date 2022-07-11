var q_comment = [];
function handleButtonClick() {
    chrome.browserAction.setPopup({
        popup: "page2.html"
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'print_the_comments') {
        q_comment = request.printed;
    }
    var tag = document.createElement("p");
    var text = document.createTextNode(request.printed);
    tag.appendChild(text);
    var element = document.getElementById("insert");
    element.appendChild(tag,element.childNodes[0])
    chrome.runtime.sendMessage({message: 'analyze_the_comments', printed});
});

//document.getElementById('classify-new-text').addEventListener('submit', send);