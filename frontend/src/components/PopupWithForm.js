export default function PopupWithForm({name, title, button, isOpen, onClose, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && ('popup_opened')}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_type_${name}`} name="form" noValidate>
          {children}
          <button type="submit" className="form__submit-button">{button}</button>
        </form>
        <button type="button" className="popup__close-button" onClick={onClose}/>
      </div>
    </div>
  )
}
