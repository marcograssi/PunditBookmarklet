var h = document.getElementsByTagName('head')[0];
if (typeof(h) !== 'undefined') {
	var d = document.createElement('script');
	d.type = 'text/javascript';
	d.src = 'http://metasound.dibet.univpm.it/release_bot/release/semlib-client_0.13.3-Pumpkin/src/InitBookmarklet.js?'+Math.random()*4;
	d.async = false;
	h.appendChild(d);
}