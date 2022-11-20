export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && ('popup_opened')}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form form_type_${props.name}`} name="form" noValidate>
          {props.children}
          <button type="submit" className="form__submit-button">{props.button}</button>
        </form>
        <button type="button" className="popup__close-button" onClick={props.onClose}/>
      </div>
    </div>
  )
}
