import { Link, useHistory } from 'react-router-dom';
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
    </header>
  )
}
