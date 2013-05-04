// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("bookmarklet");
  var bookmarklet = select.children[select.selectedIndex].value;
  localStorage["bookmarkletUri"] = bookmarklet;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Add bookmarklet Uri
function add_bookmarklet(){
  var select = document.getElementById("bookmarkletInput"),
    bookmarkletUri = select.value;
  if (bookmarkletUri !== "" && typeof(bookmarkletUri) !== "undefined"){
    //Save on local storage
    bookmarkletsArray = getAdditionalBookmarklet()
    bookmarkletsArray.push(bookmarkletUri);
    setAdditionalBookmarklet(bookmarkletsArray);
  }
  console.log(bookmarkletsArray);
}

function add_regex(){
  var select = document.getElementById("regexInput"),
    regex = select.value;
  if (regex !== "" && typeof(regex) !== "undefined"){
    var list = document.getElementById("regexList"),
      li = document.createElement('li');
      li.setAttribute('value', regex);
      li.innerHTML = regex;
      list.appendChild(li);
    var regexs = getRegex();
    console.log(regexs);
    regexs.push(encodeURIComponent(regex));
    localStorage["regexs"] = JSON.stringify(regexs);
  }
}

//Restores select box state to saved value from localStorage.
function restore_options() {
  var select = document.getElementById("bookmarkletInput"),
      favorite = localStorage["bookmarkletUri"],
      regexs = getRegex();
      additionalBookmarklets = getAdditionalBookmarklet();
  
  addBookmarkletOption(additionalBookmarklets);
  addRegexList(regexs);
  if (!favorite) {
    return;
  }
  
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}

function addBookmarkletOption(additionalBookmarklets){
  var select = document.getElementById("bookmarklet");
  console.log("Adding Bookmarklet options");
  if (additionalBookmarklets.length > 0){
    console.log(additionalBookmarklets);
    var bookToAdd = [];
    for (var i=0; i < additionalBookmarklets.length; i++){
      for (var j = 0; j < select.children.length; j++){
        console.log(select.children[j].value);

        if (select.children[j].value !== additionalBookmarklets[i]){
          bookToAdd.push(additionalBookmarklets[i]);
          break;
        }
      }
    }
    for (var k=0; k < bookToAdd.length; k++){
        var option = document.createElement('option');
        option.setAttribute('value', bookToAdd[k]);
        option.innerHTML = bookToAdd[k];
        select.appendChild(option);
    }
  }
}

function addRegexList(regexs){
var select = document.getElementById("regexList");
for (var k=0; k < regexs.length; k++){
        var li = document.createElement('li');
        li.setAttribute('value', decodeURIComponent(regexs[k]));
        li.innerHTML = decodeURIComponent(regexs[k]);
        select.appendChild(li);
    }
}

function getAdditionalBookmarklet(){
  bookmarklets = localStorage["additionalBookmarklets"]
  if (typeof(bookmarklets) !== "undefined")
    return JSON.parse(bookmarklets);
  else
    return [];
}

function getRegex(){
  regexs = localStorage["regexs"]
  if (typeof(regexs) !== "undefined")
    return JSON.parse(regexs);
  else
    return [];
}

function setAdditionalBookmarklet(bookmarkletsArray){
  localStorage["additionalBookmarklets"] = JSON.stringify(bookmarkletsArray);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#addBookmarklet').addEventListener('click', add_bookmarklet);
document.querySelector('#addRegex').addEventListener('click', add_regex);