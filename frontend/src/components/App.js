import React from 'react';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupImage from './PopupImage';
import PopupWithForm from './PopupWithForm';

function App() {
  const [currentUser, setСurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api.getUserData().then(res => {
        setСurrentUser(res);
      })
    .catch(err => {
        console.log(err)
      });
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card);
  }

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
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddItem={handleAddItemClick} onCardClick={handleCardClick} />
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
        <PopupWithForm name='delete-confirmation' title='Вы уверены?' button='Да' onClose={closeAllPopups} />
        <PopupImage card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
