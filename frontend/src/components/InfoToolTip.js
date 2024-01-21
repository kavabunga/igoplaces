import imageSuccess from '../images/tooltip__image_type_success.svg';
import imageReject from '../images/tooltip__image_type_reject.svg';

export default function InfoTooltip({ isOpen, onClose, isRegistrationSuccess }) {
  return (
    <div className={`popup popup_type_tooltip tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container tooltip__container">
        <img
          src={isRegistrationSuccess ? imageSuccess : imageReject}
          alt={
            isRegistrationSuccess
              ? 'Sign of successfull registration'
              : 'Sign of unsuccessfull registration'
          }
          className="tooltip__image"
        />
        <p className="tooltip__text">
          {isRegistrationSuccess
            ? 'Registration successfull!'
            : 'Something was wrong. Try one more time, please!'}
        </p>
        <button type="button" className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  );
}
