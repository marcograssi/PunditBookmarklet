// Pundit Chrome Extension
// Enable or disable automatic pundit loading in every Web page
var min = 1;
var max = 2;
var state = 1;
var current = 1;

console.log(localStorage["regexs"]);

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
      chrome.tabs.sendMessage(tabs[0].id, 'toggleState', function(response) {}); 
  });
});
updateIcon();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request === "state")
      sendResponse(state);
    if (request === "options"){
      var options = {
        regex : localStorage["regexs"],
        bookmarkletUri: localStorage['bookmarkletUri'],
        useRegex: localStorage["useRegex"]
      }
    }
      sendResponse(localStorage["regexs"]);
  });

