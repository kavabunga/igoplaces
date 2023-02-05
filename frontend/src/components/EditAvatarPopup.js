import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = React.useRef()

  React.useEffect(() => {
    avatarInputRef.current.value = ''
  }, [isOpen])

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })
  }

  return (
    <PopupWithForm name='edit-avatar' title='Обновить аватар' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label>
          <input ref={avatarInputRef} type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
          <span className="form__input-error input-link-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
