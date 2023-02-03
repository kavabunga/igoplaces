import React from "react";
import { Link } from 'react-router-dom';


export default function Register({ onRegister }) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault()
    let { email, password } = data;
    onRegister(email, password);
  };

  return (
    <section className="auth page__element">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className='form form_type_login' name="form" onSubmit={handleSubmit}>
          <fieldset className="form__fieldset">
            <label>
              <input type="email" className="form__input form__input_theme_dark form__input_name_email" name="email" placeholder="Email" required minLength="2" maxLength="40" value={data.email} onChange={handleChangeInput} />
              <span className="form__input-error input-email-error" />
            </label>
            <label>
              <input type="password" className="form__input form__input_theme_dark form__input_name_password" name="password" placeholder="Пароль" required minLength="2" maxLength="40" value={data.password} onChange={handleChangeInput} />
              <span className="form__input-error input-password-error" />
            </label>
          </fieldset>
          <button type="submit" className="form__submit-button form__submit-button_theme_dark auth__button">Зарегистрироваться</button>
        </form>
        <p className="auth__extras">Уже зарегистрированы? <Link className="link" to="/sign-in">Войти</Link></p>
      </div>
    </section>
  )
}
