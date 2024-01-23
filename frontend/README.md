# I Go Places • frontend

![Static Badge](https://img.shields.io/badge/status-finished-success) ![Static Badge](https://img.shields.io/badge/JavaScript-gray?logo=JavaScript) ![Static Badge](https://img.shields.io/badge/CSS-gray?logo=CSS3) ![Static Badge](https://img.shields.io/badge/BEM-gray?logo=BEM) ![Static Badge](https://img.shields.io/badge/React-gray?logo=React) ![Static Badge](https://img.shields.io/badge/React_Router-gray?logo=reactrouter)

Client-side for the project **I Go Places** — web-application for sharing pictures of different places. Demo is available here: [igoplaces.semenkatz.com](https://igoplaces.semenkatz.com)

## Features

- responsive and adaptive layout;
- user authorization;
- editing user profile data;
- posting and deleting cards with images;
- liking cards;
- popups for profile and avatar editing, adding new posts, large image previews.

## Project structure and setup

### Directories

```
src
├── blocks // styles (BEM)
├── components // React components
├── contexts // React contexts
├── images // image assets
├── utils // helper functions and constants
├── vendor // extra libs and fonts
└── ...
```

### Usage

```bash
## Install dependencies (clean install recommended)
npm ci

## Run project in development mode
npm start

## Build project for production
npm run build
```

## TODO

- add form validation;
- add card delete confirmation via dedicated popup;
- show server errors information inside info tooltip;
- refactor duplicated code.
