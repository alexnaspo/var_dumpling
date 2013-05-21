chrome.browserAction.onClicked.addListener(function() { 
  chrome.browserAction.getBadgeText({},function(result){
    if(result == "off"){
      chrome.browserAction.setBadgeText({text:''});
    } else {
      chrome.browserAction.setBadgeText({text:'off'}); 
    }
    chrome.tabs.getSelected(null, function(tab) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
  });  
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.browserAction.getBadgeText({},function(result){
      if(result != "off"){
        chrome.tabs.executeScript(tabId, {
            file: "var_dumpling.js"
        });
      }
    });
  }
});


