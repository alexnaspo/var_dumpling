chrome.browserAction.onClicked.addListener(function() { 
  chrome.browserAction.getBadgeText({},function(result){
    if(result == "off"){
      chrome.browserAction.setBadgeText({text:''});  
    } else {
      chrome.browserAction.setBadgeText({text:'off'}); 
    }
  });  
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.browserAction.getBadgeText({},function(result){
      if(result != "off"){
        chrome.tabs.executeScript(null, {
            file: "var_dumpling.js"
        });
      }
    });
  }
});


