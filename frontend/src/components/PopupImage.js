export default function ImagePopup() {
  return (
    <div className="popup popup_type_preview">
      <div className="popup__preview-container">
        <img src="data:," alt="Alternative Text" className="popup__image" />
        <h2 className="popup__caption" />
        <button type="button" className="popup__close-button" />
      </div>
    </div>
  )
}
