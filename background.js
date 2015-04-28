
function eventHandler(events) {
  for (i in events) {
    var e = events[i];
    if (e.type == "StateChanged") {
      switch (e.data.from + "-" + e.data.to) {
        case "idle-syncing":
          chrome.browserAction.setBadgeText({"text": "Syncing"});
          break;
        case "syncing-idle":
          chrome.browserAction.setBadgeText({"text": ""});
          break;
      }
    }
  }
  setTimeout(function() {
    eventsSince(events[events.length-1].id, eventHandler) 
  }, 5000);
}

function eventsSince(id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/rest/events?limit=100&since=" + id, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      callback(resp);
    }
  }
  xhr.send(null);
}

eventsSince(0, eventHandler);
