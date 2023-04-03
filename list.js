

function ratingDisplay(stars) {
    var textOutput = "";
    for(var i = 0; i < stars; i++)
        textOutput += "&#11088;";
    return textOutput;
}

function loadListContent(listToLoad) {
    var db;
    var request = indexedDB.open("contentStorage", 4);
    request.onsuccess = function(event) {
        db = this.result;
        var tx = db.transaction(listToLoad, "readonly");
        var store = tx.objectStore(listToLoad);
        let req = store.openCursor();
        req.onsuccess = function (event) {
            let cursor = event.target.result;
            var htmlToAdd = "";
            if (cursor) {

                htmlToAdd += "<h1 class = 'nickname'>" + cursor.value.nickname + "</h1>";
                htmlToAdd += "<p class = 'rating'> Rating:" + String(ratingDisplay(cursor.value.rank)) + "</p>";

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

            htmlToAdd += "<p class = 'date'> Date:" + cursor.value.dateAdded + "</p>";
            document.getElementById(listToLoad).innerHTML += htmlToAdd;
            console.log ("Adding " + htmlToAdd + "To " + listToLoad);
            htmlToAdd = "";
            cursor.continue();
        }
    }

}
}


//Load array of list names from local storage for easier use, and create h3 tags for lists
var loadNames = [];
var db;
var request = indexedDB.open("contentStorage", 4);
request.onsuccess = function(event) {
    db = this.result;
    document.getElementById("test").innerHTML = " ";
    //This line is unnecessary, but it breaks if I remove it and I have no idea why.
}
request.onerror = function(event) {
    document.getElementById("test").innerHTML = "error";
}


chrome.storage.local.get("listNamesArray", function (result) {
    for (var i in result.listNamesArray){


        console.log("i = " + i);
        loadNames[i] = result.listNamesArray[i];
        console.log(loadNames[i]);
        var node = document.createElement("h3");
        var textNode = document.createTextNode(result.listNamesArray[i]);
        node.appendChild(textNode);
        
        //node.setAttribute('id', loadNames[i]);
        document.getElementById("tabs").appendChild(node);
        console.log("tab created, " + node);
        var node2 = document.createElement("div");
        node2.classList.add("page");
        node2.setAttribute('id', loadNames[i]);
        document.getElementById("tab-content").appendChild(node2);
        console.log("body created, " + node2);

        loadListContent(loadNames[i]);

        /*var tx = db.transaction(loadNames[i], "readonly");
        var store = tx.objectStore(loadNames[i]);
        let req = store.openCursor();

            req.onsuccess = function(event) {
            //loop is not necessary because IndexedDB fires the "onsuccess" event 
            //every time the cursor is successfully advanced
                let cursor = event.target.result;
                var htmlToAdd = "";
                
                if (cursor) {

                    htmlToAdd += "<h1 class = 'nickname'>" + cursor.value.nickname + "</h1>";
                    htmlToAdd += "<p class = 'rating'> Rating:" + String(ratingDisplay(cursor.value.rank)) + "</p>";

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

                htmlToAdd += "<p class = 'date'> Date:" + cursor.value.dateAdded + "</p>";
                document.getElementById(loadNames[i]).innerHTML += htmlToAdd;
                console.log ("Adding " + htmlToAdd + "To " + loadNames[i]);
                htmlToAdd = "";
                cursor.continue();
                }*/
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
})
});





/*chrome.storage.local.get("listNamesArray", function (result) {
    /*for(i in result.listNamesArray)
    {
    var node = document.createElement("h3");
    var textNode = document.createTextNode(result.listNamesArray[i])
    node.appendChild(textNode);
    document.getElementById("tabs").appendChild(node);
    }*/



//});
//Credit where credit is due, the above tab structure is copied almost directly from this tutorial: 
//https://codingartistweb.com/2021/11/build-tabs-using-html-css-and-javascript/#google_vignette



/*var db;
var request = indexedDB.open("contentStorage", 4);
request.onsuccess = function(event) {
db = this.result;
var tx = db.transaction(loadNames[0], "readonly");
var store = tx.objectStore(loadNames[0]);
let req = store.openCursor();

req.onsuccess = function(event) {
    //loop is not necessary because IndexedDB fires the "onsuccess" event 
    //every time the cursor is successfully advanced
    let cursor = event.target.result;
    var htmlToAdd = "";
    var i = 0;
   

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
        //htmlToAdd += "<p class = 'type'> Type: " + cursor.value.type + "</p>";
       
        htmlToAdd += "<p class = 'date'> Date:" + cursor.value.dateAdded + "</p>";
        console.log(htmlToAdd);

        document.getElementById(loadNames[0]).innerHTML += htmlToAdd;
        
        htmlToAdd = "";
        cursor.continue();
    }
}



}*/




