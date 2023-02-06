import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

export default function Card ({ item, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = item.owner._id === currentUser._id
  const cardDeleteButtonClassName = (`element__delete-button ${isOwn ? 'element__delete-button_visible' : ''}`)
  const isLiked = item.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = (`element__heart-button ${isLiked ? 'element__heart-button_active' : ''}`)

  function handleClick () {
    onCardClick(item)
  }

  function handleLikeClick () {
    onCardLike(item)
  }

  function handleDeleteClick () {
    onCardDelete(item)
  }

  return (
    <li className="element">
      <img src={item.link} alt={item.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__name">{item.name}</h2>
        <div className="element__heart">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__heart-counter">{item.likes.length}</span>
        </div>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
    </li>
  )
}
