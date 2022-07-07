function handleButtonClick() {
    chrome.browserAction.setPopup({
        popup: "page2.html"
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'print_the_comments') {
        var q_comment = request.printed;
    }
    var tag = document.createElement("p");
    var text = document.createTextNode(request.printed);
    tag.appendChild(text);
    var element = document.getElementById("insert");
    element.replaceChild(tag,element.childNodes[0])
});