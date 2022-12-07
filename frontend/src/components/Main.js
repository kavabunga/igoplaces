import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card';

export default function Main({onEditProfile, onEditAvatar, onAddItem, onCardClick}) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    api.getCardsData().then(res => {
        setCards(res);
      })
    .catch(err => {
        console.log(err)
      });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteData('cards', card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
  }


  return (
    <main className="content page__element">
      <section className="profile">
        <div className="profile__image-container">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__image" />
          <button type="button" className="profile__image-edit-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" onClick={onEditProfile} />
        </div>
        <button type="button" className="profile__add-button" onClick={onAddItem} />
      </section>
      <section className="section">
        <ul className="elements">
          {cards.map((card) => (
            <Card item={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  )
}
