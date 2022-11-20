import logo from '../images/header__logo_color_white.svg';

export default function Header() {
  return (
    <header className="header page__element">
      <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
    </header>
  )
}
