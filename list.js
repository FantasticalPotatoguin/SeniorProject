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
    request.onsuccess = function() {
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
                        temp = document.createElement("p").appendChild(document.createTextNode(arrayHolder[i][0]));
                        outerDiv.appendChild(temp);//document.getElementById(itemName).appendChild(temp);//innerHTML = cursor.value.content[0][0];
                        //document.getElementById(itemName).appendChild(document.createElement("hr"));
                    }

                    temp = document.createElement("button");
                    temp.innerText = "X";
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
        siblingContent = buttonSiblinggetAttribute("src");
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
        let tx = db.transaction(["listStorage"], "readonly");
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
                        alert ("It's a beautiful baby boy"); 
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


window.onload

