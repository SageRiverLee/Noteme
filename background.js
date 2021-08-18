chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    chrome.storage.local.set({
        name: "Jake",
        noteList: []
    });
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
        chrome.scripting.insertCSS({
            target: {tabId:  tabId},
            files: ["./foreground_styles.css"]
        })
            .then(() =>{
                console.log("INJECTED FOREGROUND STYLES")
                chrome.scripting.executeScript({
                    target: {tabId:  tabId},
                    files: ["./foreground.js"]
                 })
                 .then(() => {
                    console.log("INJECTED FOREGROUND SCRIPT")

                    chrome.tabs.sendMessage(tabId, {
                        message: 'change_name',
                        payload: 'John'
                    })
                });
            }) 
               .catch(err => console.log(err));
        }
    // console.log(tabId);
    // console.log(changeInfo);
    // console.log(tab);

}); //Tab id, lifecycle of tab, tab info (url, etc)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_name'){
        chrome.storage.local.get('name', data => {
            if(chrome.runtime.lastError){
                sendResponse({
                    message: 'failure'
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.name
            });
        });
        return true;
    } else if(request.message === 'change_name'){
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if(chrome.runtime.lastError) {
                sendResponse({message: "failure"});
                return;
            }

            sendResponse({message: 'success'});
        })

        return true;
    }
});
//chrome.runtime.sendMessage("message", function (response)); to send a message from background, options, popup,
    // or foreground components to the background, options, or popup components
//chrome.tabs.sendMessage(tabId, "message", function (response)); send a message from background, options, or popup components
    // to the foreground component
