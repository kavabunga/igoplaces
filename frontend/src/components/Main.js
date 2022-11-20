import React from 'react';
import api from '../utils/Api';
import Card from './Card';

export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData().then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
    .catch(err => {
        console.log(err)
      });
  }, [])

  React.useEffect(() => {
    api.getCardsData().then(res => {
        setCards(res);
      })
    .catch(err => {
        console.log(err)
      });
  }, [])

  return (
    <main className="content page__element">
      <section className="profile">
        <div className="profile__image-container">
          <img src={userAvatar} alt={userName} className="profile__image" />
          <button type="button" className="profile__image-edit-button" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddItem} />
      </section>
      <section className="section">
        <ul className="elements">
          {cards.map((card) => (
            <Card item={card} key={card._id} onCardClick={props.onCardClick} onClose={props.onClose}/>
          ))}
        </ul>
      </section>
    </main>
  )
}
