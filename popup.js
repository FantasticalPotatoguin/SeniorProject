
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