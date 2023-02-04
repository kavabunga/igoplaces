import {
  authUrl,
  // serverToken
} from './constants.ts';

// export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${authUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
    .then(res =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
};

export function authorize(email, password) {
  return fetch(`${authUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
    .then(res =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
};

// export function getContent(token) {
//   return fetch(`${authUrl}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//     .then(res =>
//       res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
//     )
// }
