// chrome.runtime.sendMessage({
//     message: "get_name",
// }, response => {
//     if(response.message === 'success'){
//         document.querySelector('div').innerHTML = `Hello ${response.payload}`;
//     }
// });
url = "TESTURL";
document.getElementById("button").addEventListener("click", openWindow);
function openWindow(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;
  });
    window.open("./note.html", "newwindow", "width = 600, height = 750, scrollbars = yes");
    return;
}
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request === "get_url") {
        sendResponse(url);
    } else {
      sendResponse("Invalid");
    }
    return true;
});
// chrome.storage.local.get('noteList', data =>{
//   newVal = Object.values(data)[0];
//   newVal.push(note);
//   chrome.storage.local.set({noteList:newVal});
// });
$(document).ready(function(){
  ("#boxes").append("<div class = 'row'>Test</div>");
});
