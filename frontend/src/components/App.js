import React from 'react';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupImage from './PopupImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setСurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    const cardPromise = api.getCardsData();
    const userPromise = api.getUserData();
    Promise.all([cardPromise, userPromise])
    .then(res => {
        setCards(res[0]);
        setСurrentUser(res[1]);
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

  function handleUpdateUser({name, about}) {
    api.patchData({name, about}, 'users/me')
    .then(res => {
      setСurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleUpdateAvatar({avatar}) {
    api.patchData({avatar}, 'users/me/avatar')
    .then(res => {
      setСurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
    .then(newCard => {
      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? newCard : c
        )
      )
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleCardDelete(card) {
    api.deleteData('cards', card._id)
    .then(res => {
      setCards(state =>
        state.filter(c =>
          c._id !== card._id
        )
      )
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleAddPlaceSubmit(card) {
    api.postData(card, 'cards')
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddItem={handleAddItemClick} onCardClick={handleCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddItemPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        {/* <PopupWithForm name='delete-confirmation' title='Вы уверены?' button='Да' onClose={closeAllPopups} /> */}
        <PopupImage card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
