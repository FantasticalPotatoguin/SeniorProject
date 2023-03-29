var db;
var request = indexedDB.open("contentStorage", 4);
request.onsuccess = function(event) {
db = this.result;
var tx = db.transaction("List1", "readonly");
var store = tx.objectStore("List1");




var req = store.get(1);

req.onsuccess = function(event) {
    let note = event.target.result;
    if (note) {
        document.getElementById("nickname").innerHTML = note.nickname;
        document.getElementById("rating").innerHTML = "Rating:" + note.rank;
        document.getElementById("dateAdded").innerHTML = "Date added:" + note.dateAdded;
        document.getElementById("content").innerHTML = note.content;
    }
    else {
        document.getElementById("title").innerHTML = "error";
    }
}




}




