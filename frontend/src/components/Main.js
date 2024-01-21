import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddItem,
  onCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

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
          {cards[0]
            ? cards.map((card) => (
                <Card
                  item={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))
            : ''}
        </ul>
      </section>
    </main>
  );
}
