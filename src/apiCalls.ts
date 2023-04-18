import { Buffer } from 'buffer';
import {
  type RepoContentDataInterface,
  type FormDataInterface,
} from './interfaces';

const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER as string;
const GITHUB_REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME as string;
const GITHUB_CONTENT_PATH = process.env.GITHUB_CONTENT_PATH as string;
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN as string;
const GITHUB_COMMITTER_NAME = process.env.GITHUB_COMITTER_NAME as string;
const GITHUB_COMMITTER_EMAIL = process.env.GITHUB_COMITTER_EMAIL as string;

const API_ENDPOINT: string = `https://api.github.com/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}/contents/${GITHUB_CONTENT_PATH}`;

export const getRepoContentData =
  async (): Promise<RepoContentDataInterface> => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', `token ${GITHUB_AUTH_TOKEN}`);

    try {
      let response: any = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: requestHeaders,
      });

      if (response.ok === false) {
        throw new Error("Couldn't find the content of repository");
      }

      response = await response.json();

      // GitHub encodes it's contents as base64
      // We need SHA for updating the file
      return {
        content: Buffer.from(response.content, response.encoding).toString(),
        sha: response.sha,
      };
    } catch (error) {
      return { content: '', sha: '' };
    }
  };

export const updateRepoContent = async (
  payload: FormDataInterface,
  oldContentData: RepoContentDataInterface,
): Promise<boolean> => {
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('X-GitHub-Api-Version', '2022-11-28');
  requestHeaders.set('Authorization', `token ${GITHUB_AUTH_TOKEN}`);

  const updatedContent = `
  ${oldContentData.content}
  
  * [${payload.pageTitle}](${payload.pageURL})
  `;

  const response: any = await fetch(API_ENDPOINT, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify({
      message: payload.commitMessage,
      committer: {
        name: GITHUB_COMMITTER_NAME,
        email: GITHUB_COMMITTER_EMAIL,
      },
      content: btoa(updatedContent),
      sha: oldContentData.sha,
    }),
  });

  if (response.ok === false) {
    throw new Error("Couldn't update the content of repository");
  }

  return true;
};
