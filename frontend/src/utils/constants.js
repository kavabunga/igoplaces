const nameElementSelector = '.profile__name';
const aboutElementSelector = '.profile__about';
const userImageElementSelector = '.profile__image';
const popupAvatarSelector = '.popup_type_edit-avatar';
const popupProfileSelector = '.popup_type_edit-profile';
const popupAddItemSelector = '.popup_type_add-item';
const popupConfirmationDeleteSelector = '.popup_type_delete-confirmation';
const popupPreviewSelector = '.popup_type_preview';
const popupPreviewImageSelector = '.popup__image';
const popupPreviewCaptionSelector = '.popup__caption';
const popupCloseButtonSelector = '.popup__close-button';
const formProfileSelector = '.form_type_edit-profile';
const formAddItemSelector = '.form_type_add-item';
const formAvatarSelector = '.form_type_edit-avatar';
const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image-edit-button');
const cardsContainerSelector = '.elements';
const formSelector = '.form';
const formInputSelector = '.form__input';
const popupToggleClass = 'popup_opened';

const postTemplate = {
  templateSelector: '.card-template',
  elementSelector: '.element',
  imageSelector: '.element__image',
  nameSelector: '.element__name',
  deleteButtonSelector: '.element__delete-button',
  likeButtonSelector: '.element__heart-button',
  likeCountSelector: '.element__heart-counter',
  likeToggleClass: 'element__heart-button_active'
};

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
};

const serverUrl = 'https://api.nostromo.nomoredomainsclub.ru';
// const serverToken = 'fffac5cb-2beb-4c6d-b998-0bdeed4853fd';

export {
  nameElementSelector,
  aboutElementSelector,
  userImageElementSelector,
  popupAvatarSelector,
  popupProfileSelector,
  popupAddItemSelector,
  popupConfirmationDeleteSelector,
  popupPreviewSelector,
  popupPreviewImageSelector,
  popupPreviewCaptionSelector,
  popupCloseButtonSelector,
  formProfileSelector,
  formAddItemSelector,
  formAvatarSelector,
  profileEditButton,
  postAddButton,
  avatarEditButton,
  cardsContainerSelector,
  formSelector,
  formInputSelector,
  popupToggleClass,
  postTemplate,
  validationConfig,
  serverUrl
};
