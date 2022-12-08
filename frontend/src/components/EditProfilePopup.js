import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState({name: '', about: ''})

  React.useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  function handleChangeInput(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(user);
  }

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
