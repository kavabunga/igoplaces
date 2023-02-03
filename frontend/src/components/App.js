import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoToolTip';
import PopupImage from './PopupImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [email, setEmail] = React.useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const history = useHistory();

  function getData() {
    const cardPromise = api.getCardsData();
    const userPromise = api.getUserData();
    Promise.all([cardPromise, userPromise])
      .then(res => {
        setCards(res[0]);
        setCurrentUser(res[1]);
      })
      .catch(err => {
        console.log(err)
      });
  }

  React.useEffect(() => {
    tokenCheck()
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
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.patchData({ name, about }, 'users/me')
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.patchData({ avatar }, 'users/me/avatar')
      .then(res => {
        setCurrentUser(res);
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

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email);
    getData();
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then(res => {
          if (res) {
            handleLogin(res.data.email);
            history.push('/');
          }
        })
        .catch(err =>
          console.log(err)
        );
    }
  }

  function onRegister(email, password) {
    return auth.register(email, password)
      .then(res => {
        if (res.statusCode !== 400) {
          setIsRegistrationSuccess(true);
          history.push('/sign-in');
        }
      })
      .finally(res => {
        setInfoTooltipOpen(true);
      })
      .catch(err => {
        setIsRegistrationSuccess(false);
        console.log(err)
      });
  }

  function onLogin(email, password) {
    return auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          handleLogin(email);
          history.push('/');
        }
      })
      .catch(err => {
        setIsRegistrationSuccess(false);
        setInfoTooltipOpen(true)
        console.log(err)
      });
  }

  function onSignOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setEmail('');
  }

  return (
    <AppContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header onSignOut={onSignOut} email={email} />
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddItem={handleAddItemClick}
              onCardClick={handleCardClick}
            />
            <Route exact path='/sign-in'>
              <Login onLogin={onLogin} />
            </Route>
            <Route exact path='/sign-up'>
              <Register onRegister={onRegister} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddItemPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegistrationSuccess={isRegistrationSuccess} />
          {/* <PopupWithForm name='delete-confirmation' title='Вы уверены?' button='Да' onClose={closeAllPopups} /> */}
          <PopupImage card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
