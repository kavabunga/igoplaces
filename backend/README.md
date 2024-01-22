# I Go Places • API

![Static Badge](https://img.shields.io/badge/status-finished-success) ![Static Badge](https://img.shields.io/badge/JavaScript-gray?logo=JavaScript) ![Static Badge](https://img.shields.io/badge/Node.js-gray?logo=nodedotjs) ![Static Badge](https://img.shields.io/badge/Express.js-gray?logo=Express) ![Static Badge](https://img.shields.io/badge/MongoDB-gray?logo=MongoDB) ![Static Badge](https://img.shields.io/badge/Mongoose-gray?logo=Mongoose)

Server-side for the project **I Go Places** — web-application for sharing pictures of different places. Demo is available here: [igoplaces.semenkatz.com](https://igoplaces.semenkatz.com)

## Features

- user authorization;
- authentication via **JWT** stored safely in httpOnly cookies;
- editing user profile data;
- posting and editing cards;
- liking cards;
- server requests validation (via **Celebrate** library);
- database entries validation (via **Mongoose** scheme validators);
- security middlewares:
  - headers control by [helmet](https://www.npmjs.com/package/helmet);
  - request limiting by [express-rate-limit](https://www.npmjs.com/package/express-rate-limit);
  - XSS sanitation by [express-xss-sanitizer](https://www.npmjs.com/package/express-xss-sanitizer);
  - CORS;
- requests and errors logging.

## Project structure and setup

### Directories

```
/
├── routes // request routers
├── controllers // request controllers for interactions with Users and Cards databases
├── models // database schemes for Users and Cards databases
├── errors // custom error classes
├── util // helper functions and constants
```

### Usage

```bash
## Install dependencies (clean install recommended)
npm ci

## Run server in development mode with hot-reload enabled
npm run dev

## Run server
npm run start
```

### Env

These variables need to be specified in **.env** file located in root folder: `NODE_ENV`, `PORT`, `JWT_SECRET`, `ALLOWED_CORS`, `DOMAIN`

#### Example of .env file config

```text
NODE_ENV=production
PORT=3000
JWT_SECRET=secret-phrase
ALLOWED_CORS=http://something.example.com, https://something.example.com
DOMAIN=example.com
```

## API

| API Endpoint             | HTTP Method | Request Body                                                                                                      | Description                         |
| ------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `/signup`                | `POST`      | { "email": "foo@bar.com", "password": "foo", "name": "bar", "about": "bar", "avatar": "https://foo.com/bar.bmp" } | Sign up a new user                  |
| `/signin`                | `POST`      | { "email": "foo@bar.com", "password": "foo" }                                                                     | Sign in a user                      |
| `/signout`               | `POST`      |                                                                                                                   | Logout current user                 |
| `/users/me`              | `PATCH`     | { "name": "foo", "about": "bar" }                                                                                 | Update user information             |
| `/users/me/avatar`       | `PATCH`     | { "avatar": "https://foo.com/bar.bmp" }                                                                           | Update user avatar                  |
| `/users`                 | `GET`       |                                                                                                                   | Get a list of users                 |
| `/users/me`              | `GET`       |                                                                                                                   | Get information of the current user |
| `/users/${userId}`       | `GET`       |                                                                                                                   | Get information of a specific user  |
| `/cards`                 | `GET`       |                                                                                                                   | Get a list of cards                 |
| `/cards/${cardId}`       | `GET`       |                                                                                                                   | Get information of a specific card  |
| `/cards`                 | `POST`      | { "name": "foo", "link": "https://foo.com/bar.bmp" }                                                              | Add a new card                      |
| `/cards/${cardId}`       | `DELETE`    |                                                                                                                   | Delete a card                       |
| `/cards/${cardId}/likes` | `PUT`       |                                                                                                                   | Like a card                         |
| `/cards/${cardId}/likes` | `DELETE`    |                                                                                                                   | Unlike a card                       |
