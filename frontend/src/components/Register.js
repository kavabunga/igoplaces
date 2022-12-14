import React from "react";
import { Link, useHistory } from 'react-router-dom';
import * as auth from './Auth';
import PopupWithForm from "./PopupWithForm";

export default function Register(props) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault()
    const { email, password } = formData;
    auth.register(email, password)
      .then((res) => {
        if(res){
          history.push('/sign-in');
        } else {
          console.log('Авторизация не удалась')
        }
      });
  };

  return (
    <PopupWithForm name='edit-profile' title='Редактировать профиль' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label>
          <input type="text" className="form__input form__input_name_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" value={user.name} onChange={handleChangeInput} />
          <span className="form__input-error input-name-error" />
        </label>
        <label>
          <input type="text" className="form__input form__input_name_about" name="about" placeholder="Профессия" required minLength="2" maxLength="200" value={user.about} onChange={handleChangeInput} />
          <span className="form__input-error input-about-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
