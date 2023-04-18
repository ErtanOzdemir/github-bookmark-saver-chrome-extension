import {
  type PageInfoInterface,
  type FormDataInterface,
  MESSAGES,
  type RequestInterFace,
} from './interfaces';
import { getFormData, html } from './helpers';
import './styles/content.scss';

const pageBody = document.getElementsByTagName(
  'body',
)[0] as HTMLBodyElement | null;

const createFloatingActionButton = (): HTMLButtonElement | null => {
  const floationActionButton: HTMLButtonElement =
    document.createElement('button');
  floationActionButton.setAttribute('id', 'gbs-flolating-action-button');
  floationActionButton.innerText = '+';

  if (pageBody !== null) {
    pageBody.appendChild(floationActionButton);
    return floationActionButton;
  }

  return null;
};

const createPopup = (pageInfo: PageInfoInterface): HTMLDivElement | null => {
  let formData: FormDataInterface = {
    pageURL: pageInfo.URL,
    pageTitle: '',
    commitMessage: '',
  };

  const popupBox: HTMLDivElement = document.createElement('div');
  popupBox.setAttribute('id', 'gbs-popup-box');
  popupBox.className = 'gbs-hidden';

  popupBox.innerHTML = html`
    <form id="gbs-form">
      <label class="gbs-label" for="gbs-current-page-url-input">
        Page URL:
      </label>
      <input
        class="gbs-input"
        id="gbs-current-page-url-input"
        value="${pageInfo.URL}"
        disabled
        name="pageURL"
      />
      <label class="gbs-label" for="gbs-current-page-url-input">Title:</label>
      <input
        class="gbs-input"
        id="gbs-current-page-title-input"
        value="${pageInfo.title}"
        name="pageTitle"
      />
      <label class="gbs-label" for="gbs-current-page-url-input">
        Commit Message:
      </label>
      <input
        class="gbs-input"
        id="gbs-commit-message-input"
        placeholder="(Default) Add new bookmark"
        name="commitMessage"
      />
      <input id="gbs-form-button" type="submit" value="Add" />
      <div id="gbs-success-box" class="gbs-hidden">
        Bookmark saved successfully
      </div>
      <div id="gbs-failure-box" class="gbs-hidden">
        Something went wrong. Please try again later
      </div>
    </form>
  `;

  const form = popupBox.getElementsByTagName('form')[0];

  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    const enteredFormData = getFormData(form);

    formData = {
      ...formData,
      pageTitle:
        enteredFormData.pageTitle !== ''
          ? enteredFormData.pageTitle
          : pageInfo.title,
      commitMessage:
        enteredFormData.commitMessage !== ''
          ? enteredFormData.commitMessage
          : 'Add new bookmark',
    };

    chrome.runtime
      .sendMessage({
        message: MESSAGES.ADD_NEW_BOOKMARK,
        payload: formData,
      })
      .then((data) => {
        if (data.success === true) {
          popupBox
            .querySelector('#gbs-failure-box')
            ?.classList.replace('gbs-visible', 'gbs-hidden');
          popupBox
            .querySelector('#gbs-success-box')
            ?.classList.replace('gbs-hidden', 'gbs-visible');
        } else {
          throw new Error(data.error);
        }
      })
      .catch(() => {
        popupBox
          .querySelector('#gbs-failure-box')
          ?.classList.replace('gbs-hidden', 'gbs-visible');
      });
  });

  if (pageBody !== null) {
    pageBody.appendChild(popupBox);
    return popupBox;
  }

  return null;
};

const initializeContent = (pageInfo: PageInfoInterface): void => {
  const createdFloationActionButton = createFloatingActionButton();
  const createdPopupBox = createPopup(pageInfo);

  if (createdFloationActionButton !== null && createdPopupBox !== null) {
    createdFloationActionButton.addEventListener('click', () => {
      if (createdPopupBox?.classList.contains('gbs-hidden')) {
        createdPopupBox.classList.replace('gbs-hidden', 'gbs-visible');
      } else {
        createdPopupBox.classList.replace('gbs-visible', 'gbs-hidden');
      }
    });
  }
};

chrome.runtime.onMessage.addListener((request: RequestInterFace) => {
  const { message, payload } = request;

  const popupBox = document.getElementById('gbs-popup-box');
  const floatingActionButton = document.getElementById(
    'gbs-flolating-action-button',
  );

  switch (message) {
    case MESSAGES.URL_CHANGED:
      popupBox?.remove();
      floatingActionButton?.remove();

      initializeContent(payload as PageInfoInterface);
      break;

    default:
      break;
  }
});
