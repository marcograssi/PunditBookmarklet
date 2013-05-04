// import the modules we need
var self = require("sdk/self");
var data = require('self').data;
var {Cc, Ci} = require('chrome');
var tabs = require("sdk/tabs");
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var punditLoaded = false;
 
// exports.main is called when extension is installed or re-enabled
exports.main = function(options, callbacks) {
	addToolbarButton();
};
 
// exports.onUnload is called when Firefox starts and when the extension is disabled or uninstalled
exports.onUnload = function(reason) {
	removeToolbarButton();
};
 
// add our button
function addToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	if (!navBar) {
		return;
	}
	var btn = document.createElement('toolbarbutton');	
	btn.setAttribute('id', 'mybutton-id');
	btn.setAttribute('type', 'button');
	// the toolbarbutton-1 class makes it look like a traditional button
	btn.setAttribute('class', 'toolbarbutton-1');
	// the data.url is relative to the data folder
	btn.setAttribute('image', data.url('img/icon-off.png'));
	btn.setAttribute('orient', 'horizontal');
	// this text will be shown when the toolbar is set to text or text and iconss
	btn.setAttribute('label', 'My Button');
	btn.addEventListener('mousedown', function(ev) {
		if (ev.button === 0) {
			if (!punditLoaded) {
				punditLoaded = true;
				loadPundit();
				tabs.on("ready", loadPundit);
				this.setAttribute('image', data.url('img/icon-on.png'));
			} else {
				punditLoaded = false;
				// tabs.on("ready", null);
				this.setAttribute('image', data.url('img/icon-off.png'));
			}
		}
	}, false)
	navBar.appendChild(btn);
}

function loadPundit() {
	if (punditLoaded) {
		tabs.activeTab.attach({
     		contentScriptFile: self.data.url("loader.js")
    	});
	}
}
 
function removeToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	var btn = document.getElementById('mybutton-id');
	if (navBar && btn) {
		navBar.removeChild(btn);
	}
}