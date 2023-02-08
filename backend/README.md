# :mount_fuji: Mesto (back-end) • ![Status in progress](https://badgen.net/badge/status/in%20progress/yellow)

Server-side for the project **Mesto** — web-application for sharing pictures of different places.

## Technology

- [**Node.js**](https://nodejs.org/en/ "Node.js")
- [**Express.js**](https://expressjs.com "Express.js")
- [**MongoDB**](https://www.mongodb.com "MongoDB") + [**Mongoose.js**](https://mongoosejs.com "Mongoose")

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

## Project structure

### Directories:

`/routes` — request routers  
`/controllers` — request controllers for interactions with **users** and **cards** databases  
`/models` — database schemes for **users** and **cards** databases  
`/errors` — custom error classes  
`/util` — helper functions and constants

### Usage:

`npm i` — install dependencies  
`npm run start` — run server  
`npm run dev` — run server in development mode with **hot-reload** enabled

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
