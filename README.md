# GitHub Bookmark Saver

## Introduction
GitHub Bookmark Saver is a Chrome extension that you can use to save your web site links to GitHub. Thus, you can easily save your links to GitHub without copying, pasting or committing them.


## Installation Instructions

**Note:** Before the installation, [Node.js](https://nodejs.org/en) and [Git](https://git-scm.com/) should already be installed.

### Installation of Dependencies 

1. Open your terminal and clone the repository.
```bash
git clone ErtanOzdemir/github-bookmark-saver-chrome-extension
```
2. Go to the project's root directory and install all dependencies and dev-dependencies.
```bash
npm install
```
### Configuration of Extension

1. Create a `.env` file in the root directory.
2. Copy all variables below into the `.env` file.

```env
GITHUB_AUTH_TOKEN=
GITHUB_REPOSITORY_NAME=
GITHUB_CONTENT_PATH=
GITHUB_REPOSITORY_OWNER=
GITHUB_COMITTER_NAME=
GITHUB_COMITTER_EMAIL=
```

| Variable                  | Description                                                                                                                                                                                                                              |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GITHUB_AUTH_TOKEN`       | You have to have a GitHub auth token for accessing your repositories. You can follow [GitHub's token creation]( https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token ) guide. |
| `GITHUB_REPOSITORY_NAME`  | This variable should contain the name of the repository where you want to save the website links.                                                                                                                                        |
| `GITHUB_CONTENT_PATH`     | This variable must contain the path on GitHub to the file where you want to save the links. For example if file is exist on root directory in GitHub you can write `README.md`                                                           |
| `GITHUB_REPOSITORY_OWNER` | This is your GitHub username (example: `ErtanOzdemir`).                                                                                                                                                                                  |
| `GITHUB_COMITTER_NAME`    | This is your name (example: `Ertan Özdemir`).                                                                                                                                                                                            |
| `GITHUB_COMITTER_EMAIL`   | This is your email address that is used on GitHub.                                                                                                                                                                                         |

### Running Extension on Chrome

1. Run the extension
```bash
npm run start
```
This command creates a folder called `dist` in the root directory of the project. To upload the extension to Chrome, you can follow the [Chrome Extension Upload](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) instructions.

All done!


## Usage Instructions
* When everything is complete, a black button will appear in the bottom right corner of the browser screen.

<img width="1405" alt="Screenshot 2023-04-18 at 12 26 33" src="https://user-images.githubusercontent.com/20026295/232734910-b7872e5b-b22e-4093-952d-34964edf2b14.png">

* When the button is clicked, a pop-up will open with the information of the site you are currently in.


<p align="center">
<img width="255" alt="Screenshot 2023-04-18 at 12 28 29" src="https://user-images.githubusercontent.com/20026295/232736632-bee037ec-0c56-44b0-9739-b22c16297d0b.png">
</p>

* Only the `Title` and `Commit Message` inputs are changeable on this screen.
* When the `Add` button is pressed, the existing link will be added to the bottom line in the file you specified on GitHub.

# License
This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/ErtanOzdemir/github-bookmark-saver-chrome-extension/blob/master/LICENSE) file for details.






