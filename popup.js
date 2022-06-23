function handleButtonClick()
{
    chrome.browserAction.setPopup({
        popup: "page2.html"
    });
}
//btn.addEventListener("click", handleButtonClick);