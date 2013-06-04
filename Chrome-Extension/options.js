var optionSaved =  true;
// Saves options to localStorage.
function save_options() {
    //Save selected bookmarklet
    var select = document.getElementById("bookmarklet");
    var bookmarklet = select.children[select.selectedIndex].value;
    localStorage["bookmarkletUri"] = bookmarklet;

    //Save additional bookmarklet
    setAdditionalBookmarklet();

    //Save regex
    var regexs = setRegex();

    //Save useRegex
    var chkBox = document.getElementById('checkRegex');
    if (chkBox.checked){
        localStorage["useRegex"] = true;
    }else{
        localStorage["useRegex"] = false;
    }

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

//Restores select box state to saved value from localStorage.
function restore_options() {
    var select = document.getElementById("bookmarkletInput"),
    favorite = localStorage["bookmarkletUri"],
    useRegex = localStorage["useRegex"],
    regexs = getRegex();
    additionalBookmarklets = getAdditionalBookmarklets();
  
    addBookmarkletOption(additionalBookmarklets);
    addAdditionalBookmarletList(additionalBookmarklets);
    addRegexList(regexs);
    
    if (favorite) {
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == favorite) {
                child.selected = "true";
                break;
            }
        }   
    }

    if (useRegex === "true")
        document.getElementById("checkRegex").checked= true;     
    
    if (useRegex === "false")
        document.getElementById("checkRegex").checked= null;     
    

}

// Add bookmarklet Uri
function add_bookmarklet(){
    var select = document.getElementById("bookmarkletInput");
    bookmarkletUri = select.value;
    if (bookmarkletUri !== "" && typeof(bookmarkletUri) !== "undefined"){
        addListItem("bookmarkletList", bookmarkletUri, removeAdditionalBookmarklet);
        addBookmarkletOption([bookmarkletUri]);
        // bookmarkletsArray = getAdditionalBookmarklets();
        // bookmarkletsArray.push(bookmarkletUri);
        // setAdditionalBookmarklet(bookmarkletsArray);
        select.value = "";
    }
}

function addBookmarkletOption(additionalBookmarklets){
    var select = document.getElementById("bookmarklet");
    if (additionalBookmarklets.length > 0){
        var bookToAdd = [];
        for (var i=0; i < additionalBookmarklets.length; i++){
            for (var j = 0; j < select.children.length; j++){
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

function add_regex(){
    var select = document.getElementById("regexInput"),
        regex = select.value;
    if (regex !== "" && typeof(regex) !== "undefined"){
        addListItem("regexList", regex, removeRegex);
        select.value = "";
    }
}

function addRegexList(regexs){
    for (var k=0; k < regexs.length; k++){
        addListItem("regexList", decodeURIComponent(regexs[k]), removeRegex);
    }
}

function addAdditionalBookmarletList(additionalBookmarklets){
    for (var k=0; k < additionalBookmarklets.length; k++){
        addListItem("bookmarkletList", additionalBookmarklets[k], removeAdditionalBookmarklet);
    }
}

function getAdditionalBookmarklets(){
    var bookmarklets = localStorage["additionalBookmarklets"];
    if (typeof(bookmarklets) !== "undefined")
        return JSON.parse(bookmarklets);
    else
        return [];
}

function getRegex(){
    var regexs = localStorage["regexs"]
    if (typeof(regexs) !== "undefined")
        return JSON.parse(regexs);
    else
        return [];
}

function setRegex(){
    var regexs = [],
        regexNodes = document.getElementById("regexList").children;
    for (var i=0; i < regexNodes.length; i++){
        regexs.push(encodeURIComponent(regexNodes[i].getAttribute('value')));
    }
    localStorage["regexs"] = JSON.stringify(regexs);

}

function setAdditionalBookmarklet(bookmarkletsArray){
    var bs = document.getElementById("bookmarkletList").children,
        bookmarkletsArray = [];
    for (var i=0; i < bs.length; i++){
        bookmarkletsArray.push(bs[i].getAttribute("value"));
    }
    localStorage["additionalBookmarklets"] = JSON.stringify(bookmarkletsArray);
}

function removeRegex(e){
    removeListItem(e);
    setRegex();
}

function removeAdditionalBookmarklet(e){
    removeListItem(e);
    var b = document.getElementById("bookmarklet");
        bNodes = b.children;

    for (var i = 0; i < bNodes.length; i++){
        if (bNodes[i].value === e.target.parentElement.getAttribute("value")){
            b.removeChild(bNodes[i]);
            return;
        }
    }
    //remove also from dropdown
}

function removeListItem(e){
    var li = e.target.parentNode;
    li.parentNode.removeChild(li);
}

function addListItem(listId, value, onremovecallback){
    var list = document.getElementById(listId),
        li = document.createElement('li'),
        spanX = document.createElement('span'),
        spanText = document.createElement('span');
    li.setAttribute('value', value);
    spanX.className = "delete";
    spanX.addEventListener('click', onremovecallback);
    spanText.innerHTML = value;
    spanText.className = "listText";
    li.appendChild(spanX);
    li.appendChild(spanText);
    list.appendChild(li);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#addBookmarklet').addEventListener('click', add_bookmarklet);
document.querySelector('#addRegex').addEventListener('click', add_regex);
window.onbeforeunload = function() {
  if (!optionSaved)
    return "You have unsaved option changes.";
}