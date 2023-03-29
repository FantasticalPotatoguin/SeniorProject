
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

document.getElementById("save").addEventListener("click", function() {
    let db; 
    let request = indexedDB.open("contentStorage", 4);
    request.onsuccess = function(event) {

        let nickname = document.getElementById("nickname").value;
        let rating = document.getElementById("rating").value;
        //format: nickname:, rank:, dateAdded:, content:
        db = this.result;
        var tx = db.transaction("List1", "readwrite");
        var store = tx.objectStore("List1");
        store.put({nickname: nickname, rank: rating, dateAdded: 1, content: "test"});
        alert ("test" + nickname+rating);
    }
    request.onerror = function(event) {
        alert("Error saving database");
    }
})