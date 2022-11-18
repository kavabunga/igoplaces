import logo from './images/header__logo_color_white.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="page">
    <header className="header page__element">
      <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
        {/* <%=require('./images/header__logo_color_white.svg')%> */}
    </header>
    <main className="content page__element">
      <section className="profile">
        <div className="profile__image-container">
          <img src="data:," alt="Grey Box" className="profile__image" />
          <button type="button" className="profile__image-edit-button" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <p className="profile__about">Исследователь океана</p>
          <button type="button" className="profile__edit-button" />
        </div>
        <button type="button" className="profile__add-button" />
      </section>
      <section className="section">
        <ul className="elements" />
      </section>
    </main>
    <footer className="footer page__element">
      <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
    </footer>
    <div className="popup popup_type_edit-profile">
      <div className="popup__container">
        <h2 className="popup__title">Редактировать профиль</h2>
        <form className="form form_type_edit-profile" name="form" novalidate>
          <fieldset className="form__fieldset">
            <label>
              <input type="text" className="form__input form__input_name_name" name="name" placeholder="Имя" required minlength="2" maxlength="40" />
              <span className="form__input-error input-name-error" />
            </label>
            <label>
              <input type="text" className="form__input form__input_name_about" name="about" placeholder="Профессия" required minlength="2" maxlength="200" />
              <span className="form__input-error input-about-error" />
            </label>
          </fieldset>
          <button type="submit" className="form__submit-button">Сохранить</button>
        </form>
        <button type="button" className="popup__close-button" />
      </div>
    </div>
    <div className="popup popup_type_edit-avatar">
      <div className="popup__container">
        <h2 className="popup__title">Обновить аватар</h2>
        <form className="form form_type_edit-avatar" name="form" novalidate>
          <fieldset className="form__fieldset">
            <label>
              <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
              <span className="form__input-error input-link-error" />
            </label>
          </fieldset>
          <button type="submit" className="form__submit-button">Сохранить</button>
        </form>
        <button type="button" className="popup__close-button" />
      </div>
    </div>
    <div className="popup popup_type_add-item">
      <div className="popup__container">
        <h2 className="popup__title">Новое место</h2>
        <form className="form form_type_add-item" name="form" novalidate>
          <fieldset className="form__fieldset">
            <label>
              <input type="text" className="form__input form__input_name_name" name="name" placeholder="Название" required minlength="2" maxlength="30" />
              <span className="form__input-error input-name-error" />
            </label>
            <label>
              <input type="url" className="form__input form__input_name_image-link" name="link" placeholder="Ссылка на картинку" required />
              <span className="form__input-error input-link-error" />
            </label>
          </fieldset>
          <button type="submit" className="form__submit-button">Создать</button>
        </form>
        <button type="button" className="popup__close-button" />
      </div>
    </div>
    <div className="popup popup_type_delete-confirmation">
      <div className="popup__container">
        <h2 className="popup__title">Вы уверены?</h2>
        <form className="form" name="form" novalidate>
          <button type="submit" className="form__submit-button">Да</button>
        </form>
        <button type="button" className="popup__close-button" />
      </div>
    </div>
    <div className="popup popup_type_preview">
      <div className="popup__preview-container">
        <img src="data:," alt="Alternative Text" className="popup__image" />
        <h2 className="popup__caption" />
        <button type="button" className="popup__close-button" />
      </div>
    </div>
  </div>
  );
}

export default App;
