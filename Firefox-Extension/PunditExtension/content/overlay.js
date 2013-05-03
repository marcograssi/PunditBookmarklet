var Pundit = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  onMenuItemCommand: function() {
    window.open("chrome://PunditExtension/content/pundit.xul", "", "chrome");
  }
};

window.addEventListener("load", function(e) { Pundit.onLoad(e); }, false); 
