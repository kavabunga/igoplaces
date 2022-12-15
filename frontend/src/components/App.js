import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { AppContext } from './AppContext';
import * as auth from './Auth';
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
  const [currentUser, setСurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    email: ''
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
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

  function handleLogin(userEmail) {
    console.log('TESTING, loggedIn before handler: ', loggedIn);
    setLoggedIn(true);
    console.log('TESTING, loggedIn after handler: ', loggedIn);
    setСurrentUser({
      ...currentUser,
      email: userEmail
    });
    console.log('TESTING, currentUser after handler: ', currentUser);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    console.log('TESTING, token: ', token);
    if (token) {
      auth.getContent(token)
      .then(res => {
        console.log('TESTING, res: ', res);
        if (res) {
          handleLogin(res.data.email);
          console.log('TESTING, res.data.email', res.data.email);
          history.push('/');
          console.log('TESTING, hist pushed to /');
        }
      });
    }
  }

  return (
    <AppContext.Provider value={{loggedIn: loggedIn, handleLogin: handleLogin}}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddItem={handleAddItemClick}
              onCardClick={handleCardClick}
            />
            {/* <ProtectedRoute
              exact
              path='/'
              component={Footer}
            /> */}

            <Route exact path='/sign-in'>
              <Login />
            </Route>
            <Route exact path='/sign-up'>
              <Register />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>
          </Switch>
          <Route exact path='/'>
            <Footer />
          </Route>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddItemPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
          {/* <PopupWithForm name='delete-confirmation' title='Вы уверены?' button='Да' onClose={closeAllPopups} /> */}
          <PopupImage card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
