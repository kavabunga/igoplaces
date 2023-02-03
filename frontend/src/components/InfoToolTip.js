import imageSuccess from '../images/tooltip__image_type_success.svg';
import imageReject from '../images/tooltip__image_type_reject.svg';

export default function InfoTooltip({ isOpen, onClose, isRegistrationSuccess }) {
  return (
    <div className={`popup popup_type_tooltip tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container tooltip__container">
        <img src={isRegistrationSuccess ? imageSuccess : imageReject} alt={isRegistrationSuccess ? 'Знак успешной регистрации' : 'Знак неудавшейся регистрации'} className="tooltip__image" />
        <p className="tooltip__text">{isRegistrationSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button type="button" className="popup__close-button" onClick={onClose}/>
      </div>
    </div>
  )
}
