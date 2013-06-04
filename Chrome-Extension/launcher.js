//Handle Pundit Loading
var punditState = 'pageLoading',
    bookmarkletUri = 'http://metasound.dibet.univpm.it/release_bot/release/semlib-client_0.13.3-Pumpkin/src/InitBookmarklet.js';

window.onload = function(){
    console.log('Page Loaded');
    var option;
    chrome.extension.sendMessage("options", function(response) {
        options = response;
    });
    chrome.extension.sendMessage("state", function(response) {
        if (response === 2){
            var isValidURL = true;
            if (options.useRegex === "true"){
                isValidURL = false;
                var regexs = JSON.parse(options.regexs);
                for (var i = 0 ; i < regexs.length; i++){
                    var reg = new RegExp(decodeURIComponent(regexs[i]));
                    if (reg.test(window.location.href)){
                        isValidURL = true;
                    }
                }
            }
            if (typeof options.bookmarkletUri !== 'undefined'){
                bookmarkletUri = options.bookmarkletUri;
            }
            if (isValidURL){
                    (function(){
                        var h = document.getElementsByTagName('head')[0];                        
                        d = document.createElement('script');
                        d.type = 'text/javascript';
                        d.src = bookmarkletUri;
                        d.async = false;
                        h.appendChild(d);
                    })();
                    punditState = 'PunditLoaded';
                    console.log('Pundit Bookmarklet Loading. Version: ' + bookmarkletUri);
                    return;
            }else{
                console.log("Page URL is not in the option list");
                return;
            }
            // } 
        }else{
            console.log('Not loading: Inactive');
            punditState = 'PunditNotLoaded';
        }
    });

}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request === 'toggleState'){
            if ((typeof document.getElementById('pundit-gui') !== 'undefined') && (document.getElementById('pundit-gui') !== null)){
                console.log('Pundit already loaded');
                return;
            }
                
            if (punditState === 'PunditNotLoaded'){
                //LoadPundit
                (function(){
                    var h = document.getElementsByTagName('head')[0];                        
                    d = document.createElement('script');
                    d.type = 'text/javascript';
                    d.src = 'http://metasound.dibet.univpm.it/release_bot/release/semlib-client_0.13.3-Pumpkin/src/InitBookmarklet.js?'+Math.random()*4;
                    d.async = false;
                    h.appendChild(d)
                })(); 
                punditState = 'PunditLoaded';
                console.log('Pundit Loaded');
            }

        }
    }
);