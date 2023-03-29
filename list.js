var db;
var request = indexedDB.open("contentStorage", 4);
request.onsuccess = function(event) {
db = this.result;
var tx = db.transaction("List1", "readonly");
var store = tx.objectStore("List1");





let req = store.openCursor();
let allItems = [];


req.onsuccess = function(event) {
    //loop is not necessary because IndexedDB fires the "onsuccess" event 
    //every time the cursor is successfully advanced
    let cursor = event.target.result;
    var htmlToAdd = "";

    if (cursor) {
        htmlToAdd += "<h1 class = 'nickname'>" + cursor.value.nickname + "</h1>";
        htmlToAdd += "<p class = 'rating'> Rating:" + cursor.value.rank + "</p>";
        htmlToAdd += "<div class = 'content'>" + cursor.value.content + "</div>";
        htmlToAdd += "<p class = 'date'> Date:" + cursor.value.dateAdded + "</p>";

        document.getElementById("page").innerHTML += htmlToAdd;
        htmlToAdd = "";
        cursor.continue();
    }
    else {
        document.getElementById("title").innerHTML = "error";
    }
}




}




