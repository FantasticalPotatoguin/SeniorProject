

chrome.runtime.onInstalled.addListener( () => {
chrome.contextMenus.create({
    "id": "organize",
    "title": "Save",
    "contexts": ["selection", "link", "image"]
})
});


chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "organize"){
        var urlParams = "";
        if (clickData.mediaType == "image"){
            urlParams = "?image=" + clickData.srcUrl;
        }
        else
        {
            urlParams = "";
        }
        
        //if (clickData.mediaType == "image"){
            chrome.windows.create(
                {type: "popup",
                url: "popup.html" + urlParams,//clickData.linkUrl,//
                height: 300,
                width: 200, 
                focused: true
                //Still need to figure out how to make the popup appear at the cursor location
                }
            )
//}
}
}
);
