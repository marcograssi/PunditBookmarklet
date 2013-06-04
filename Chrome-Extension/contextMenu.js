//Image onclick callback function.
function onImageClick(info,tab) {
    var message = {
        "command": "navigate",
        "url": "http://feed.thepund.it/?conf=cortona.js&img=" + info.srcUrl
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(message), function(response) {
      });
    });

    window.location.href = "http://feed.thepund.it/?conf=cortona.js&img=" + info.srcUrl
}

// Add Pundit menu and action if acting on one image.
//var contexts = ["page","selection","link","editable","image"];
var parent = chrome.contextMenus.create({"title": "Pundit","contexts":["image"]});
var child1 = chrome.contextMenus.create({
    "title": "Feed Pundit with this image", 
    "parentId": parent,
    "contexts":["image"],
    "onclick": onImageClick
});

