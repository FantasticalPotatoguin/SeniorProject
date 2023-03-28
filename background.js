
function dbName(){
    return "contentStorage";
}
function dbVersion(){
    return 4;
}


chrome.runtime.onInstalled.addListener( () => {
//When extension is first installed
chrome.contextMenus.create({
//Create context menu items for navigation
    "id": "organize",
    "title": "Save",
    "contexts": ["selection", "link", "image"]
})



const DB_STORE_NAME = "itemContents";
let db;
let request = indexedDB.open(dbName(), dbVersion());
//attempt to open database for the first time

request.onupgradeneeded = function() {
    //if database is out of date or does not exist, create database. Above 'onsuccess' function will then fire.
    //Required callback function for using indexedDB

    var db = request.result;
    var store = db.createObjectStore("List1", {keyPath: "listID"});
    var index = store.createIndex("NameIndex", ["name.last", "name.first"]);

}
request.onsuccess = function(event) {
//if read is successful
    console.log("IndexedDB opened successfully");
    db = this.result;
    var tx = db.transaction("List1", "readwrite");
    var store = tx.objectStore("List1");
    var index = store.index("NameIndex");

    store.put({listID: 12345, name: {first: "John", last: "Doe"}, age: 42});
    store.put({listID: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
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
