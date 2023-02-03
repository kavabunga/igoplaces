import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
  const [card, setCard] = React.useState({name: '', link: ''});

  React.useEffect(() => {
    setCard({name: '', link: ''});
  }, [isOpen]);

  function handleChangeInput(e) {
    setCard({...card, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(card);
  }

  return (
    <PopupWithForm name='add-item' title='Новое место' button='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label>
          <input type="text" className="form__input form__input_name_name" name="name" value={card.name} placeholder="Название" required minLength="2" maxLength="30" onChange={handleChangeInput}/>
          <span className="form__input-error input-name-error" />
        </label>
        <label>
          <input type="url" className="form__input form__input_name_image-link" name="link" value={card.link} placeholder="Ссылка на картинку" onChange={handleChangeInput} required />
          <span className="form__input-error input-link-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
