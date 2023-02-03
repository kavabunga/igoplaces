# :mount_fuji: Mesto (back-end)

Server-side for the project **Mesto** — web-application for sharing pictures of different places. The project made at "WEB-development" course at [Yandex.Practicum](https://practicum.yandex.ru/ "Yandex.Practicum").

## Technology

- [**Node.js**](https://nodejs.org/en/)
- [**Express.js**](https://expressjs.com)
- [**MongoDB**](https://www.mongodb.com) + [**Mongoose.js**](https://mongoosejs.com)

## Features

- user authorization (signup, signin, authentication via **JWT**);
- editing user profile data;
- posting and editing cards;
- liking cards;
- server requests validation (via **Celebrate** library);
- database entries validation (via **Mongoose** scheme validators).

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

:warning: Section in progress.

| API Endpoint             | HTTP Method | Request Body                                                                                                      |
| ------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `/signup`                | `POST`      | { "email": "foo@bar.com", "password": "foo", "name": "bar", "about": "bar", "avatar": "https://foo.com/bar.bmp" } |
| `/signin`                | `POST`      | { "email": "foo@bar.com", "password": "foo" }                                                                     |
| `/users/me`              | `PATCH`     | { "name": "foo", "about": "bar" }                                                                                 |
| `/users/me/avatar`       | `PATCH`     | { "avatar": "https://foo.com/bar.bmp" }                                                                           |
| `/users`                 | `GET`       |                                                                                                                   |
| `/users/me`              | `GET`       |                                                                                                                   |
| `/users/${userId}`       | `GET`       |                                                                                                                   |
| `/cards`                 | `GET`       |                                                                                                                   |
| `/cards/${cardId}`       | `GET`       |                                                                                                                   |
| `/cards`                 | `POST`      | { "name": "foo", "link": "https://foo.com/bar.bmp" }                                                              |
| `/cards/${cardId}`       | `DELETE`    |                                                                                                                   |
| `/cards/${cardId}/likes` | `PUT`       |                                                                                                                   |
| `/cards/${cardId}/likes` | `DELETE`    |                                                                                                                   |

## Repo address

Project is available on GitHub: [https://github.com/kavabunga/express-mesto-gha](https://github.com/kavabunga/express-mesto-gha)
