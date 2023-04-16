
/*chrome.storage.local.get("listNamesArray", function (result) {
    for(var i in result.listNamesArray)
    {
        var node = document.createElement("option");
        var textNode = document.createTextNode(result.listNamesArray[i])
        node.appendChild(textNode);
        document.getElementById("lists").appendChild(node);
    }
})*/



/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
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
);*/



document.getElementById("save").addEventListener("click", function() {
    var db; 
    var request = indexedDB.open("contentStorage", 4);
    request.onsuccess = function(event) {

        //Database transaction setup


        //value setup
        var type;
        var content;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("text")) {
            type = "text";
            content = document.getElementById("link").innerHTML;
        }
        else if (urlParams.has("image")) {
            type = "image";
            content = document.getElementById("imageContainer").src;
        }
        else{
            type = "link";
            content = document.getElementById("link").innerHTML;
        }

        var nickname = document.getElementById("nickname").value;
        var rating = document.getElementById("rating").value;
        var whichList = document.getElementById("lists").value;

        db = this.result;
        var tx = db.transaction(whichList, "readwrite");
        var store = tx.objectStore(whichList);
        //send values to database
        store.put({nickname: nickname, rank: rating, dateAdded: 1, content: content, type: type});
        db.close();

    }
    request.onerror = function(event) {
        alert("Error saving database");
    }        
    /*chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id, function() {});
        });*/
})