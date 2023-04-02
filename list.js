





var testStorage;

chrome.storage.local.get("listNamesArray", function (result) {
testStorage = result.listNamesArray[0];
})


/*function isBlank() {
    if (document.getElementsByClassName("active").length < 1)
    {
        return true;
    }
    else {
        return false;
    }
}

/*chrome.storage.local.get("listNamesArray", function (result) {
    for (i in result.listNamesArray) 
    {
        if (isBlank()) {
            document.getElementsByClassName("tabs")[0].innerHTML += "<h3 class = 'active'>" + result.listNamesArray[i] + "</h3>";
        
        }
        else 
        {
            document.getElementsByClassName("tabs")[0].innerHTML += "<h3>" + result.listNamesArray[i] + "</h3>";
        }
        
    }
})*/

chrome.storage.local.get("listNamesArray", function (result) {
    for(i in result.listNamesArray)
    {
    var node = document.createElement("h3");
    var textNode = document.createTextNode(result.listNamesArray[i])
    node.appendChild(textNode);
    document.getElementById("tabs").appendChild(node);
    }


    let tabs = document.querySelectorAll("#tabs h3");
let tabContents = document.querySelectorAll("#tab-content div");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
}); 
})
//Credit where credit is due, tab structure is copied almost directly from this tutorial: 
//https://codingartistweb.com/2021/11/build-tabs-using-html-css-and-javascript/#google_vignette






//End tutorial code



//Create tabs for each item in list








var db;
var request = indexedDB.open("contentStorage", 4);
request.onsuccess = function(event) {
db = this.result;
var tx = db.transaction(testStorage, "readonly");
var store = tx.objectStore(testStorage);
let req = store.openCursor();


req.onsuccess = function(event) {
    //loop is not necessary because IndexedDB fires the "onsuccess" event 
    //every time the cursor is successfully advanced
    let cursor = event.target.result;
    var htmlToAdd = "";

    if (cursor) {
        htmlToAdd += "<h1 class = 'nickname'>" + cursor.value.nickname + "</h1>";
        htmlToAdd += "<p class = 'rating'> Rating:" + cursor.value.rank + "</p>";
        if (cursor.value.type == "image")
        {
            htmlToAdd += "<img src = " + cursor.value.content + ">"
        }
        else if (cursor.value.type == "link"){
             htmlToAdd += "<a class = 'link' + href= '" + cursor.value.content + "'>" + cursor.value.content + "</a>";
        }
        else{
            htmlToAdd += "<p class = 'text' >" + cursor.value.content + "</p>";
        }
        //htmlToAdd += "<p class = 'content'> content:" + cursor.value.content + "</p>";
        htmlToAdd += "<p class = 'type'> Type: " + cursor.value.type + "</p>";
       
        htmlToAdd += "<p class = 'date'> Date:" + cursor.value.dateAdded + "</p>";

        document.getElementById("testStorage").innerHTML += htmlToAdd;
        htmlToAdd = "";
        cursor.continue();
    }
}



}




