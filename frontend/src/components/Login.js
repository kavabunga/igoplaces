import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from './Auth';
import { AppContext } from './AppContext';
import PopupWithForm from "./PopupWithForm";

export default function Login(props) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const loginContext = React.useContext(AppContext);
  const history = useHistory();

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault()
    const { email, password } = formData;
    if (!email || !password) {
        return;
    }
    auth.authorize(email, password)
    .then((data) => {
      if (data.token){
        setFormData({
          email: '',
          password: ''
        });
        loginContext.handleLogin();
        history.push('/');
      }
    })
    .catch(err => console.log(err));
  };

  return
}
