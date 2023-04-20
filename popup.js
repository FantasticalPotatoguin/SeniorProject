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
            document.getElementById("lists").appendChild(node);
            cursor.advance(1);
        }
    }
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('image'))
        {
         document.getElementById("imageContainer").src = urlParams.get('image');
        }
    else if (urlParams.has('text'))
    {
        document.getElementById("link").innerHTML = urlParams.get('text');
        
    }
    else 
    {
        var tab = tabs[0];
        document.getElementById("link").innerHTML = tab.url;
    }
}

); 


//When save button is pressed, open database and save item.
document.getElementById("save").addEventListener("click", function() {
    var db; 
    //open database
    var request = indexedDB.open(dbName(), dbVersion());
    request.onsuccess = function(event){
        var type;
        var content;
        //determine what type of content based on URL parameters passed from Chrome API
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has("text")) {
            type = "text";
            content = document.getElementById("link").innerHTML;
        }
        else if (urlParams.has("image")) {
            type = "image";
            content = document.getElementById("imageContainer").src;
        }
        else {
            type = "link";
            content = document.getElementById("link").innerHTML;
        }
        //Save values to temporary variables, both for readability and because 
        //I was having trouble getting IndexedDB to cooperate with dynamic values. 
        var nickname = document.getElementById("nickname").value;
        var rating = document.getElementById("rating").value;
        var whichList = document.getElementById("lists").value;

        //Open transaction on database
        db = request.result;
        var tx = db.transaction(listName(), "readwrite");
        var store = tx.objectStore(listName());

        //Find the correct list in the database and open that list
        store.index("listNames").openCursor(IDBKeyRange.only(whichList)).onsuccess = 
        function(event){
            var cursor = event.target.result;
            if(cursor) {
                /*Load the current nested array, and then 
                create and push the new array to be added to it. 
                */
                let tempArray = cursor.value.content;
                tempArray.push([content, type, nickname, rating, 1]);
                var tempObject = {};
                tempObject.listID = cursor.value.listID;
                tempObject.name = cursor.value.name;
                tempObject.content = tempArray;
                var up = cursor.update(tempObject);
                up.onsuccess = function(e){
                    console.log("Update successful");
                }
                up.onerror = function(e) {
                    console.log("update error");
                }
            }
        }
    }
});






