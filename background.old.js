
let db;


function dbName(){
    return "contentStorage";
}
function dbVersion(){
    return 4;
}


chrome.runtime.onInstalled.addListener( () => {
//Create context menu items for navigation and initialize database when extension is first installed
chrome.contextMenus.create({

    "id": "organize",
    "title": "Save",
    "contexts": ["selection", "link", "image"]
})

//CREATE LISTNAMESARRAY
chrome.storage.local.set({listNamesArray: ["List1", "List2"]});

//CREATE FIRST LIST DATABASE

let db;
let request = indexedDB.open(dbName(), dbVersion());
//attempt to open database for the first time

request.onupgradeneeded = function() {
    //if database is out of date or does not exist, create database. Above 'onsuccess' function will then fire.
    //Required callback function for using indexedDB

    db = request.result;
    var store = db.createObjectStore("List1", {keyPath: "listID", autoIncrement: true});
    var store = db.createObjectStore("List2", {keyPath: "listID", autoIncrement: true});

    //default list name had to be hardcoded for some reason

}
request.onsuccess = function(event) {
//if read is successful
    console.log("IndexedDB opened successfully");
    db = this.result;
    var tx = db.transaction(["List1"], "readwrite");
    var store = tx.objectStore("List1");

    store.put({ nickname: "Wikipedia", rank: 3, dateAdded: 4, content: "https://www.wikipedia.org/", type: "link"});
    store.put({ nickname: "W3", rank: 5, dateAdded: 5, content: "https://www.w3schools.com/", type: "link"});

    var tx = db.transaction(["List2"], "readwrite");
    var store = tx.objectStore("List2");
    store.put({ nickname: "SECOND LIST", rank: 4, dateAdded: 7, content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "link"});
    store.put({ nickname: "School", rank: 3, dateAdded: 8, content: "https://www.wilmu.edu/mywilmu/index.aspx", type: "link"})
    db.close();
};




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
