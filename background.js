let db;


function dbName(){
    //return database name
    return "contentStorage";
}

/*function dbVersion(){
    //return database version
    return 1;
}*/
function listName() {
    return "listStorage";
}



chrome.runtime.onInstalled.addListener( () => {
    //When extension is first installed
chrome.contextMenus.create({
    "id": "organize",
    "title": "Save",
    "contexts": ["selection", "link", "image"]
})

let db;
let request = indexedDB.open(dbName(), 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    let store = db.createObjectStore("listStorage", {keyPath: "listID", autoIncrement: true});
    
    store.put({listID: 1, name: "List1", content: [["https://www.wikipedia.org/", "link", "Wikipedia", 5, 5], ["https://www.w3schools.com/","link", "W3", 4, 4]]});
    store.put({listID: 2, name: "List2", content: [["https://www.wikipedia.org/", "link", "Wikipedia2", 5, 5], ["https://www.w3schools.com/","link", "W32", 4, 4]]})
    store.createIndex("listNames", "name");
}

request.onsuccess = function() {
    console.log("IndedxedDB opened successfully");
    db = this.result;
    let tx = db.transaction(["listStorage"], "readwrite");
    let store = tx.objectStore("listStorage");
    //due to technical contraints, the easiest way to accomplish this is by nesting the lists as arrays inside of an object store.
    //This makes accessing the data slightly less clear, but makes backend database management significantly easier. 
    //{listID, name, content[[]...[]]. Array format: [0] = content, [1] = type, [2] = nickname, [3] = rating (numerical), [4] = date added
    db.close();
}
});





chrome.contextMenus.onClicked.addListener(function(clickData){
    //When context menu item is clicked
    
        if(clickData.menuItemId == "organize"){
        //check if it was the correct menu item
    
            var urlParams = "";
            if (clickData.mediaType == "image"){
    
                urlParams = "?image=" + clickData.srcUrl;
                //If item is an image, add a URL parameter containing image link to pass to other script
            }
            else 
            {
                //Since we are only listening for images and text, if it is not an image, it must be text. 
                //URL parameter is created accordingly
                urlParams = clickData.selectionText;
                if(urlParams != "")
                    urlParams = "?text=" + urlParams;
                else urlParams = "";
            }
            
            
                chrome.windows.create(
                    {type: "popup",
                    url: "popup.html" + urlParams,
                    //open popup page with previously specified URL parameters to be read into database
                    height: 300,
                    width: 200, 
                    focused: true
                    //Still need to figure out how to make the popup appear at the cursor location
                    }
                )
    }
    }
    );
