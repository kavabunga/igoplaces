import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Header({ onSignOut }) {
  const { email } = React.useContext(CurrentUserContext);
  return (
    <header className="header page__element">
      <p className="header__logo-text">I Go Places</p>
      <div className="header__info">
        {email && <p className="header__text">{email}</p>}
        <Switch>
          <Route path={'/sign-in'}>
            <Link className="link" to="/sign-up">
              Registration
            </Link>
          </Route>
          <Route path={'/sign-up'}>
            <Link className="link" to="/sign-in">
              Sign in
            </Link>
          </Route>
          <Route exact path={'/'}>
            <button className="link header__button" onClick={onSignOut}>
              Sign out
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
