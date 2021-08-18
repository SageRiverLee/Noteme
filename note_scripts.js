document.getElementById("submit_button").addEventListener("click", submit);
function submit(){
    let note = {title: document.getElementById("title").value, url:document.getElementById("url").value, body:document.getElementById("notebox").value};
    
    
    chrome.storage.local.get('noteList', data =>{
        newVal = Object.values(data)[0];
        if(note != undefined){
                newVal = Object.values(data)[0];
        }
       
       newVal.push(note);
       chrome.storage.local.set({noteList:newVal});
    });
    //window.close();
}
document.getElementById("reset_button").addEventListener("click", clear);
function clear(){
        document.getElementById("title").value = "";
        document.getElementById("notebox").value = "";
         return;
}
chrome.runtime.sendMessage('get_url', (url) => {
        document.getElementById("url").value = url;
})