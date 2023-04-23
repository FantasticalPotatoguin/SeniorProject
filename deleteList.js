function dbName(){
    //return database name
    return "contentStorage";
}

function dbVersion(){
    //return database version
    return 1;
}
function listName() {
    //return object store name
    return "listStorage";
}

var request = indexedDB.open(dbName(), dbVersion());

request.onsuccess = function() {
    //read list names from database
    let db = this.result;
    let tx = db.transaction(listName(), "readonly");
    let store = tx.objectStore(listName());
    let req = store.openCursor();
    req.onsuccess = function(event) {

        let cursor = event.target.result;
        if (cursor) 
        {
            
            let node = document.createElement("option");
            var textNode = document.createTextNode(cursor.value.name)
            node.appendChild(textNode);
            document.getElementById("listNames").appendChild(node);
            cursor.advance(1);
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("deleteButton").addEventListener("click", function () {

        var request = indexedDB.open(dbName(), dbVersion());

        request.onsuccess = function() {
            let db = this.result;
            let tx = db.transaction(listName(), "readwrite");
            let store = tx.objectStore(listName());
            let req = store.openCursor();
            req.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor)
                {
                    var whichList = document.getElementById("listNames").value;
                    if (cursor.value.name == whichList)
                {
                    var request = cursor.delete();
                    console.log("cursor deleted");
                }
                cursor.advance(1);
                }
            }
        }
    })
})