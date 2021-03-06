// Pundit Chrome Extension
// Enable or disable automatic pundit loading in every Web page
var min = 1;
var max = 2;
var state = 1;
var current = 1;

function updateIcon() {
  chrome.browserAction.setIcon({path:"punditExtensionLogo" + current + ".png"});
  state = current;
  current++;
  if (current > max)
    current = min;
}

chrome.browserAction.onClicked.addListener(function(){
  updateIcon();
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, JSON.stringify({"command": "toggleState"}), function(response) {}); 
  });
});
updateIcon();

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        var r = JSON.parse(request);
        if (r.command === "state")
            sendResponse(state);

        if (r.command === "options"){
            var options = {
                regexs : localStorage["regexs"],
                bookmarkletUri: localStorage['bookmarkletUri'],
                useRegex: localStorage["useRegex"]
            };
            sendResponse(options);
        }  
    });