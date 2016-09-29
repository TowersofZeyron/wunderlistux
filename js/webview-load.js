
window.setCustomTheme = function(_, theme){
  console.log("starting custom theme - WEBVIEW..")
  $('#headerbar').remove();
  $("body").prepend("<div id='headerbar'></div>");
  var THEME_CONTAINER_ID = "webview_theme_container";
  fs = require('fs');
  var createOrUpdate = function(id, content, type, appender){
    $('#'+id).remove();
    $('<'+type+' id="'+id+'">'+content+'</'+type+'>').appendTo(appender);
  }
  fs.readFile("./themes/"+theme+"/webview.css", 'utf8', function (err, content) {
    createOrUpdate(THEME_CONTAINER_ID, content, "style", "body")
  });
  localStorage.setItem("custom_electron_theme", theme)
  console.log("Finished custom theme - WEBVIEW!")
}

window.onload = function() {
    window.$ = window.jQuery = require('./jquery-3.1.0.min.js');
    var onReady = function() {
      setCustomTheme(null, localStorage.getItem("custom_electron_theme") || "elementary");
    };
    $(document).ready(onReady).delay(1200, onReady).on("turbolinks:load", onReady);
    // $(document).on("change-theme", setCustomTheme);
    // $(document).on("click-bell", function(){ console.log("BC - document"); $("a.activities-count").click(); })
}

var doc  = require('electron').ipcRenderer;
doc.on('change-theme', setCustomTheme);
doc.on("click-bell", function(){ $("a[data-path='activities']")[0].click() })
doc.on("click-conversations", function(){ $("a[data-path='conversations']")[0].click() })
doc.on("click-sort", function(){ $("[data-menu='sort']")[0].click() })
doc.on("click-more", function(){ $("[data-menu='more']")[0].click() })
doc.on("click-share", function(){ $("[data-menu='share']")[0].click() })
