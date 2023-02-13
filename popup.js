/*const tabs = await chrome.tabs.query({
url: [

]

})*/


chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
    var tab = tabs[0];
    alert(tab.url);
})