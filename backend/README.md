# Mesto (back-end)

Server-side for the project **"Mesto"** — web-application for sharing pictures of defferent places.

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

## Structure

### Directories:

`/routes` — request routers  
`/controllers` — request controllers for interactions with **users** and **cards** databases  
`/models` — database schemes for **users** and **cards** databases  
`/errors` — custom error classes  
`/util` — helper functions and constants

### Server launch:

`npm run start` — run server  
`npm run dev` — run server in development mode with **hot-reload** enabled

## Repo address

Project is available on GitHub: [https://github.com/kavabunga/express-mesto-gha](https://github.com/kavabunga/express-mesto-gha)
