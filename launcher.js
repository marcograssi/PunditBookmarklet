//Handle Pundit Loading
var punditState = 'pageLoading';

window.onload = function(){
    console.log('Page Loaded');
    chrome.extension.sendMessage("state", function(response) {
        if (response === 2){
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