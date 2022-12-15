import { Link, Route, Switch, useHistory } from 'react-router-dom';
import logo from '../images/header__logo_color_white.svg';

export default function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <header className="header page__element">
      <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
      <div className='header__info'>
        {/* {XXXXX && <p className='header__text'>kavabunga@gmail.com</p> } */}
        <Switch>
          <Route path={'/sign-in'}>
            <Link className='link' to="/sign-up">Регистрация</Link>
          </Route>
          <Route path={'/sign-up'}>
            <Link className='link' to="/sign-in">Войти</Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}
