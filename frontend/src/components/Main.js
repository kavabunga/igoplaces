export default function Main(props) {
  return (
    <main className="content page__element">
      <section className="profile">
        <div className="profile__image-container">
          <img src="data:," alt="Grey Box" className="profile__image" />
          <button type="button" className="profile__image-edit-button" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <p className="profile__about">Исследователь океана</p>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddItem} />
      </section>
      <section className="section">
        <ul className="elements" />
      </section>
    </main>
  )
}
