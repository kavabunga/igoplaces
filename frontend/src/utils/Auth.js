import {
  authUrl
} from './constants.ts'

export function register (email, password) {
  return fetch(`${authUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
    .then(res =>
      res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`))
    )
};

export function authorize (email, password) {
  return fetch(`${authUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
    .then(res =>
      res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`))
    )
};

export function logout () {
  return fetch(`${authUrl}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(res =>
      res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`))
    )
}
