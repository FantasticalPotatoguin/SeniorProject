
chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('image'))
        {
         document.getElementById("imageContainer").src = urlParams.get('image');
        }
else{
        document.getElementById("link").innerHTML = "error";
    }
}
);






/* 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
 if (urlParams.has('image'))
 {
     document.getElementById("imageContainer").src = urlParams.get('image');
 }

if (has parameters: image)
    image stuff

if (has parameters: text) 
    text stuff
if (has no parameters)
    Page */