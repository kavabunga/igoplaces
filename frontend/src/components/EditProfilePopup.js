import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='edit-profile' title='Редактировать профиль' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label>
          <input type="text" className="form__input form__input_name_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
          <span className="form__input-error input-name-error" />
        </label>
        <label>
          <input type="text" className="form__input form__input_name_about" name="about" placeholder="Профессия" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
          <span className="form__input-error input-about-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
