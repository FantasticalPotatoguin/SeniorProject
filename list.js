function dbName(){
    //return database name
    return "contentStorage";
}

function dbVersion(){
    //return database version
    return 1;
}
function listName() {
    return "listStorage";
}


function ratingDisplay(stars) {
    var textOutput = "";
    for (var i = 0; i < stars; i++)
    {
        textOutput += "⭐";
    }
    return textOutput;
}

function loadListContent() {
    var request = indexedDB.open("contentStorage", 1);
    request.onsuccess = function(event) {

        //if new value just got added
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('listName'))
        {
            params = urlParams.get('listName')
            let db = event.target.result;
            let tx = db.transaction(["listStorage"], "readwrite");
            let store = tx.objectStore("listStorage");
            store.put({name: params, content: [["https://www.wikipedia.org/", "link", "New List", 5, 5], ["https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png", "image", "Wikipedia", 5, 5]]})
            //One-liner code to delete url parameters taken directly from StackOverflow. 
            //https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page
            window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
            
        }




        let db = this.result;
        let tx = db.transaction(["listStorage"], "readonly");
        let store = tx.objectStore("listStorage");
        let req = store.openCursor();
        req.onsuccess = function (event) {
        //This function will fire every time there is a successful advance of the cursor,
        //Essentially making it act like a loop.
        console.log("db opened from list page successfully");
            let cursor = event.target.result;
             
            if (cursor) {
                //create tab to store list content
                var itemName = cursor.value.name;
                var node = document.createElement("h3");
                var textNode = document.createTextNode(itemName);
                node.appendChild(textNode);
                document.getElementById("tabs").appendChild(node);
                var node2 = document.createElement("div");
                node2.classList.add("page");
                node2.setAttribute('id', cursor.value.name);
                document.getElementById("tab-content").appendChild(node2);
                
                var htmlToAdd = "";
                var arrayHolder = cursor.value.content;
                
                for (var i= 0; i < cursor.value.content.length; i++)
                { 
                    var temp;
                    var outerDiv = document.createElement("li");
                    outerDiv.classList += "container";

                    //create Stars
                    temp = document.createElement("p");
                    temp.appendChild(document.createTextNode(ratingDisplay(arrayHolder[i][3])));
                    temp.classList += "stars";
                    outerDiv.appendChild(temp);//document.getElementById(itemName).appendChild(temp);

                    if(arrayHolder[i][2] != ""){
                    //if nickname exists, load nickname
                    temp = document.createElement("h4");
                    temp.innerText = String(arrayHolder[i][2]);
                    outerDiv.appendChild(temp); //document.getElementById(itemName).appendChild(temp);
                    }
                    
                    
                    
                    //load content according to type
                    if (arrayHolder[i][1] == "link")
                    {
                        temp = document.createElement("a");
                        temp.href = arrayHolder[i][0];
                        temp.innerText = arrayHolder[i][0];
                        outerDiv.appendChild(temp);//document.getElementById(itemName).appendChild(temp);
                        //document.getElementById(itemName).appendChild(document.createElement("hr"));
                    }
                    else if (arrayHolder[i][1] == "image")
                    {
                        temp = document.createElement("img");
                        temp.src = arrayHolder[i][0];
                        outerDiv.appendChild(temp);//document.getElementById(itemName).appendChild(temp);
                        //document.getElementById(itemName).appendChild(document.createElement("hr"));
                    }
                    else 
                    {                    
                        temp = document.createElement("p");
                        
                        temp.innerText = arrayHolder[i][0];
                        outerDiv.appendChild(temp);//document.getElementById(itemName).appendChild(temp);//innerHTML = cursor.value.content[0][0];
                        //document.getElementById(itemName).appendChild(document.createElement("hr"));
                    }

                    temp = document.createElement("button");
                    temp.innerText = "X";
                    temp.classList += "closeButton";
                    outerDiv.appendChild(temp);
                    
                    document.getElementById(itemName).appendChild(outerDiv);

                    
                }
                
            cursor.advance(1);
            }


            var buttons = document.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", xButton);
            }

            //allow tabs to be clickable and hideable
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
        }

        
    }
}

function xButton(event) {
    var buttonParentId = event.currentTarget.parentNode.parentNode.id;
    var buttonSibling = event.currentTarget.previousSibling;
    var buttonSiblingString = buttonSibling.tagName.toLowerCase();
    var siblingContent;
    if(buttonSiblingString == "a")
    {
        siblingContent = buttonSibling.getAttribute("href");
    }
    else if (buttonSiblingString == "img")
    {
        siblingContent = buttonSibling.getAttribute("src");
    }
    else if (buttonSiblingString == "p")
    {
        siblingContent = buttonSibling.innerText;
    }
    else 
    {
        alert("error");
    }

    
    var request = indexedDB.open("contentStorage", 1);
    request.onsuccess = function() {
        let db = this.result;
        let tx = db.transaction(["listStorage"], "readwrite");
        let store = tx.objectStore("listStorage");
        let req = store.openCursor();
        req.onsuccess = function (event) {
        //This function will fire every time there is a successful advance of the cursor,
        //Essentially making it act like a loop.
        console.log("db opened from button close successfully");
            let cursor = event.target.result;
             
            if (cursor) {
                if (cursor.value.name == buttonParentId)
                {
                //{listID, name, content[[]...[]]. 
                // Array format: [0] = content, [1] = type, [2] = nickname, [3] = rating (numerical), [4] = date added
                var tempObj = cursor.value;
                var tempContent = tempObj.content;
                for(var i = 0; i < tempContent.length; i++)
                {
                    if(siblingContent == tempContent[i][0])
                    {
 
                        tempContent.splice(i, 1);
                        tempObj.content = tempContent;
                        cursor.update(tempObj);
                        
                    }
                }

                }
                else 
                    cursor.advance(1);
                

            }
        }
    }   


    event.currentTarget.parentNode.remove();
}






loadListContent();




