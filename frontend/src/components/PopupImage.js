export default function ImagePopup(props) {
  if (props.card) {
    return (
      <div className="popup popup_type_preview popup_opened">
        <div className="popup__preview-container">
          <img src={props.card.link} alt={props.card.name} className="popup__image" />
          <h2 className="popup__caption">{props.card.name}</h2>
          <button type="button" className="popup__close-button" onClick={props.onClose}/>
        </div>
      </div>
    )
  }
}
