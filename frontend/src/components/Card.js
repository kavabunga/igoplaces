export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.item);
  }

  return (
    <li className="element" onClick={handleClick}>
      <img src={props.item.link} alt={props.item.name} className="element__image" />
      <div className="element__text">
        <h2 className="element__name">{props.item.name}</h2>
        <div className="element__heart">
          <button type="button" className="element__heart-button" />
          <span className="element__heart-counter">{props.item.likes.length}</span>
        </div>
      </div>
      <button type="button" className="element__delete-button" />
    </li>
  )
}
