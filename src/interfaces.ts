export interface PageInfoInterface {
  URL: string;
  title: string;
}

export interface FormDataInterface {
  pageURL: string;
  pageTitle: string;
  commitMessage: string;
}

export interface RepoContentDataInterface {
  content: string;
  sha: string;
}

export interface RequestInterFace {
  message: string;
  payload: FormDataInterface | PageInfoInterface;
}

// eslint-disable-next-line
export interface FormObjectInterface {
  [key: string]: any;
}

export enum MESSAGES {
  ADD_NEW_BOOKMARK = 'ADD_NEW_BOOKMARK',
  URL_CHANGED = 'URL_CHANGED',
}
