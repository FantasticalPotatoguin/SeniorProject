
function isImgUrl(url) {
    // function obtained from https://bobbyhadz.com/blog/javascript-check-if-url-is-image
    //extra image filetypes from https://www.techonthenet.com/html/elements/img_tag.php
   return /\.(jpg|jpeg|png|webp|avif|gif|svg|bmp|apng)$/.test(url);
    }

chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
    var testUrl = "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"
if (isImgUrl(testUrl)){
    const queryString = window.location.search;
document.getElementById("link").innerHTML = queryString//testUrl

}
else{
    document.getElementById("link").innerHTML = "error";
}
})






/* if (has parameters: image)
    image stuff

if (has parameters: text) 
    text stuff
if (has no parameters)
    Page */