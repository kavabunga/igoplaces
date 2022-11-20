import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupImage from './PopupImage';
import PopupWithForm from './PopupWithForm';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddItemClick() {
    setAddItemPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddItemPopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddItem={handleAddItemClick} />
      <Footer />
      <PopupWithForm name='edit-profile' title='Редактировать профиль' button='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__fieldset">
          <label>
            <input type="text" className="form__input form__input_name_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="form__input-error input-name-error" />
          </label>
          <label>
            <input type="text" className="form__input form__input_name_about" name="about" placeholder="Профессия" required minLength="2" maxLength="200" />
            <span className="form__input-error input-about-error" />
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='edit-avatar' title='Обновить аватар' button='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__fieldset">
          <label>
            <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
            <span className="form__input-error input-link-error" />
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='add-item' title='Новое место' button='Создать' isOpen={isAddItemPopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__fieldset">
          <label>
            <input type="text" className="form__input form__input_name_name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="form__input-error input-name-error" />
          </label>
          <label>
            <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
            <span className="form__input-error input-link-error" />
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='delete-confirmation' title='Вы уверены?' button='Да' onClose={closeAllPopups}>

      </PopupWithForm>
      <PopupImage />
      {/* <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form form_type_edit-profile" name="form" noValidate>
            <fieldset className="form__fieldset">
              <label>
                <input type="text" className="form__input form__input_name_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
                <span className="form__input-error input-name-error" />
              </label>
              <label>
                <input type="text" className="form__input form__input_name_about" name="about" placeholder="Профессия" required minLength="2" maxLength="200" />
                <span className="form__input-error input-about-error" />
              </label>
            </fieldset>
            <button type="submit" className="form__submit-button">Сохранить</button>
          </form>
          <button type="button" className="popup__close-button" />
        </div>
      </div>
      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="form form_type_edit-avatar" name="form" noValidate>
            <fieldset className="form__fieldset">
              <label>
                <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
                <span className="form__input-error input-link-error" />
              </label>
            </fieldset>
            <button type="submit" className="form__submit-button">Сохранить</button>
          </form>
          <button type="button" className="popup__close-button" />
        </div>
      </div>
      <div className="popup popup_type_add-item">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <form className="form form_type_add-item" name="form" noValidate>
            <fieldset className="form__fieldset">
              <label>
                <input type="text" className="form__input form__input_name_name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
                <span className="form__input-error input-name-error" />
              </label>
              <label>
                <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
                <span className="form__input-error input-link-error" />
              </label>
            </fieldset>
            <button type="submit" className="form__submit-button">Создать</button>
          </form>
          <button type="button" className="popup__close-button" />
        </div>
      </div>
      <div className="popup popup_type_delete-confirmation">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="form" name="form" noValidate>
            <button type="submit" className="form__submit-button">Да</button>
          </form>
          <button type="button" className="popup__close-button" />
        </div>
      </div> */}

    </div>
  );
}

export default App;
