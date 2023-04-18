import { getRepoContentData, updateRepoContent } from './apiCalls';
import {
  type RequestInterFace,
  MESSAGES,
  type FormDataInterface,
} from './interfaces';

chrome.runtime.onMessage.addListener(
  (request: RequestInterFace, sender, sendResponse) => {
    const { message, payload } = request;

    switch (message) {
      case MESSAGES.ADD_NEW_BOOKMARK:
        void (async () => {
          try {
            const contentData = await getRepoContentData();
            const response = await updateRepoContent(
              payload as FormDataInterface,
              contentData,
            );

            sendResponse({ success: true, response });
          } catch (error) {
            sendResponse({ success: false, error });
          }
        })();

        break;

      default:
        break;
    }

    return true;
  },
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url !== null) {
    chrome.tabs
      .sendMessage(tabId, {
        message: MESSAGES.URL_CHANGED,
        payload: { URL: tab.url, title: tab.title },
      })
      .then((data) => data)
      .catch((err) => err);
  }
});
