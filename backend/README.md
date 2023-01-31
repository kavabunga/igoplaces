# :mount_fuji: Mesto (back-end)

Server-side for the project **Mesto** — web-application for sharing pictures of defferent places. The project made at "WEB-development" course at [Yandex.Practicum](https://practicum.yandex.ru/ "Yandex.Practicum").

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

### Sign up

```js
POST /signup
```

Request body:

```json
{
  "email": "foo@bar.com", // required
  "password": "foo", // required
  "name": "bar",
  "about": "bar",
  "avatar": "https://foo.com/bar.bmp"
}
```

### Sign in

```js
POST /signin
```

Request body:

```json
{
  "email": "foo@bar.com", // required
  "password": "foo" // required
}
```

### Update user data

```js
PATCH /users/me
```

Request body:

```json
{
  "name": "foo", // required
  "about": "bar" // required
}
```

### Update user avatar

```js
PATCH /users/me/avatar
```

Request body:

```json
{
  "avatar": "https://foo.com/bar.bmp" // required
}
```

### Get users data

```js
GET /users
```

Request body empty

### Get current user data

```js
GET /users/me
```

### Get user data bu user Id

```js
GET /users/${userId}
```

Request body empty

### Get cards

```js
GET /cards
```

Request body empty

### Get card by card Id

```js
GET /cards/${cardId}
```

Request body empty

### Post new card

```js
POST /cards
```

Request body:

```json
{
  "name": "foo", // required
  "link": "https://foo.com/bar.bmp" // required
}
```

### Delete card by card Id

```js
DELETE /cards/${cardId}
```

Request body:

```json
{
  "name": "foo", // required
  "link": "https://foo.com/bar.bmp" // required
}
```

### Add like to a card by card Id

```js
PUT /cards/${cardId}/likes
```

Request body empty

### Delete like from a card by card Id

```js
DELETE /cards/${cardId}/likes
```

Request body empty

## Repo address

Project is available on GitHub: [https://github.com/kavabunga/express-mesto-gha](https://github.com/kavabunga/express-mesto-gha)
