import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/header__logo_color_white.svg';

export default function Header({ onSignOut, email }) {

  return (
    <header className="header page__element">
      <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
      <div className='header__info'>
        {email && <p className='header__text'>{email}</p>}
        <Switch>
          <Route path={'/sign-in'}>
            <Link className='link' to="/sign-up">Регистрация</Link>
          </Route>
          <Route path={'/sign-up'}>
            <Link className='link' to="/sign-in">Войти</Link>
          </Route>
          <Route exact path={'/'}>
            <button className='link header__button' onClick={onSignOut}>Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  )
}
