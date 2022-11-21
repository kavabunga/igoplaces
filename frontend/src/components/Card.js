export default function Card({item, onCardClick}) {
  function handleClick() {
    onCardClick(item);
  }

  return (
    <li className="element" onClick={handleClick}>
      <img src={item.link} alt={item.name} className="element__image" />
      <div className="element__text">
        <h2 className="element__name">{item.name}</h2>
        <div className="element__heart">
          <button type="button" className="element__heart-button" />
          <span className="element__heart-counter">{item.likes.length}</span>
        </div>
      </div>
      <button type="button" className="element__delete-button" />
    </li>
  )
}
