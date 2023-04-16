import { type RequestInterFace, MESSAGES } from './interfaces';

chrome.runtime.onMessage.addListener(
  (request: RequestInterFace, sender, sendResponse) => {
    const { message, payload } = request;

    switch (message) {
      case MESSAGES.ADD_NEW_BOOKMARK:
        console.log('New Bookmark will add: ', payload);
        break;

      default:
        break;
    }

    return true;
  },
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url !== null) {
    chrome.tabs.sendMessage(tabId, {
      message: MESSAGES.URL_CHANGED,
      payload: { URL: tab.url, title: tab.title },
    });
  }
});
