import React from "react";
import { Link, useHistory } from 'react-router-dom';
import * as auth from './Auth';
import PopupWithForm from "./PopupWithForm";

export default function Register() {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault()
    let { email, password } = data;
    auth.register(email, password)
    .then(res => {
      if(res.statusCode !== 400){
        history.push('/sign-in');
      } else {
        console.log('Авторизация не удалась')
      }
    });
  };

  return (
    <div>
      <h2 className="login__title">Регистрация</h2>
      <form className='form form_type_login' name="form" onSubmit={handleSubmit} noValidate>
        <fieldset className="form__fieldset">
          <label>
            <input type="email" className="form__input form__input_name_email" name="email" placeholder="Email" required minLength="2" maxLength="40" value={data.email} onChange={handleChangeInput} />
            <span className="form__input-error input-email-error" />
          </label>
          <label>
            <input type="password" className="form__input form__input_name_password" name="password" placeholder="Пароль" required minLength="2" maxLength="40" value={data.password} onChange={handleChangeInput} />
            <span className="form__input-error input-password-error" />
          </label>
        </fieldset>
      <button type="submit" className="form__submit-button">Зарегистрироваться</button>
      </form>
      <p>Уже зарегистрированы? Войти</p>
    </div>
  )
}
