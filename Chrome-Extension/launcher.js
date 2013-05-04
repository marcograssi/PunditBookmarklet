//Handle Pundit Loading
var punditState = 'pageLoading',
    defaultBookmarklet = 'http://metasound.dibet.univpm.it/release_bot/release/semlib-client_0.13.3-Pumpkin/src/InitBookmarklet.js';

window.onload = function(){
    console.log('Page Loaded');
    console.log(localStorage['bookmarkletUri']);
    chrome.extension.sendMessage("options", function(response) {
        console.log(response);
    });
    chrome.extension.sendMessage("state", function(response) {
        if (response === 2){
            // console.log(localStorage["regexs"]);
            // var regexs = JSON.parse(localStorage["regexs"]);
            // console.log(regexs);
            // for (var i = 0 ; i < regexs.length; i++){
            //     var reg = new RegExp(decodeURIComponent(regexs[i]));
            //     if (reg.test(window.location.href)){
                    (function(){
                        var h = document.getElementsByTagName('head')[0];                        
                        d = document.createElement('script');
                        d.type = 'text/javascript';
                        d.src = 'http://metasound.dibet.univpm.it/release_bot/release/semlib-client_0.13.3-Pumpkin/src/InitBookmarklet.js?'+Math.random()*4;
                        if (typeof localStorage['bookmarkletUri'] !== 'undefined'){
                            d.src = localStorage['bookmarkletUri'];
                        }
                        d.async = false;
                        h.appendChild(d)
                    })();
                    punditState = 'PunditLoaded';
                    console.log('Pundit Loaded');
                    return;
                // }
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