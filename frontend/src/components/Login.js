import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from './Auth';
import { AppContext } from './AppContext';

export default function Login() {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });
  const loginContext = React.useContext(AppContext);
  const history = useHistory();

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = data;
    if (!email || !password) {
        return;
    }
    auth.authorize(email, password)
    .then(res => {
      if (res.token) {
        setData({
          email: '',
          password: ''
        });
        localStorage.setItem('token', res.token);
        loginContext.handleLogin(res.email);
        history.push('/');
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <section className="auth page__element">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form className='form form_type_login' name="form" onSubmit={handleSubmit} noValidate>
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
        <button type="submit" className="form__submit-button form__submit-button_theme_dark auth__button">Войти</button>
        </form>
      </div>
    </section>
  )
}


