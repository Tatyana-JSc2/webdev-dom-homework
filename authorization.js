import { authorizationRequest, registrationRequest, UserName, setUserName, token, setToken } from './api.js';
import { nameInputElement } from './main.js';

const startAuthorizationElement = document.getElementById("start-authorization");
const authorizationInvisibleElement = document.getElementById("authorization-invisible");
const addFormInvisibleElement = document.getElementById("add-form-invisible");
const formAuthorizationElement = document.getElementById("form-authorization");

//const myStorage = window.lokalStorage;





export function authorization() {
  const authorizationFormHtml = `<div class="add-form authorization" id="">
      <p class="authorization">Форма входа</p>
      <input type="text" class="add-form-text" id="login-input" placeholder="Введите ваш логин (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="password-input" placeholder="Введите ваш пароль (не менее 3-х знаков)" />
      <button class="add-form-button" id="authorization-button">Войти</button>
      <p class="authorization" id="authorization-click">Зарегистрироваться</p>
    </div>`;
  formAuthorizationElement.innerHTML = authorizationFormHtml;
  authorizationInvisibleElement.classList.add("loading-none");
  addFormInvisibleElement.classList.add("loading-none");

  const authorizationClickElement = document.getElementById("authorization-click");
  authorizationClickElement.addEventListener('click', registration);

  const authorizationButtonElement = document.getElementById("authorization-button");
  authorizationButtonElement.addEventListener('click', authorizationEntrance);
}
startAuthorizationElement.addEventListener('click', authorization);




function authorizationEntrance() {
  authorizationRequest()
    .then((responseData) => {
      console.log(token);
      setToken(responseData.user.token);
      console.log(token);
      setUserName(responseData.user.name);
      let Token = responseData.user.token;
      localStorage.setItem("token", Token);
      authorizationsuccess();
    }).catch((error) => {
      if (error.message === "неправильный логин или пароль") {
        alert("Неправильный логин или пароль. Попробуйте еще раз!");
      } else if (error.message === "Сервер упал.") {
        authorizationRequest();
        //alert("Сервер упал. Попробуйте позже...");
      } else {
        alert("Что-то пошло не так, попробуйте позже...");
      };
      console.warn(error);
      authorization();
    });
}

export function authorizationsuccess() {
  authorizationInvisibleElement.classList.remove("loading-none");
  addFormInvisibleElement.classList.remove("loading-none");
  startAuthorizationElement.classList.add("loading-none");
  formAuthorizationElement.classList.add("loading-none");
  nameInputElement.value = UserName;
}



function registration() {
  const authorizationFormHtml = `<div class="add-form authorization" id="">
      <p class="authorization">Форма регистрации</p>
      <input type="text" class="add-form-text" id="name-input" placeholder="Введите ваше имя (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="login-input" placeholder="Введите ваш логин (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="password-input" placeholder="Введите ваш пароль (не менее 3-х знаков)" />
      <button class="add-form-button" id="registration-button">Зарегистрироваться</button>
      <p class="authorization" id="registration-click">Войти</p>
    </div>`;
  ;
  formAuthorizationElement.innerHTML = authorizationFormHtml;
  authorizationInvisibleElement.classList.add("loading-none");
  addFormInvisibleElement.classList.add("loading-none");

  const registrationClickElement = document.getElementById("registration-click");
  registrationClickElement.addEventListener('click', authorization);

  const registrationButtonElement = document.getElementById("registration-button");
  registrationButtonElement.addEventListener('click', registrationEntrance);
}




function registrationEntrance() {
  registrationRequest().then((responseData) => {
    console.log(token);
    setToken(responseData.user.token);
    console.log(token);
    setUserName(responseData.user.name);
    console.log(UserName);
    registrationsuccess();
  }).catch((error) => {
    if (error.message === "неправильный логин или пароль") {
      alert("Пользователь с таким логином уже сущетсвует. Попробуйте еще раз!");
    } else if (error.message === "Сервер упал.") {
      registrationRequest();
      //alert("Сервер упал. Попробуйте позже...");
    } else {
      alert("Что-то пошло не так, попробуйте позже...");
    };
    console.warn(error);
    registration();
  });
}

function registrationsuccess() {
  const authorizationFormHtml = `<div class="add-form authorization" id="">
  <p class="authorization">${UserName}, Вы успешно зарегистрировались! Теперь Вы можете войти!</p>
  <button class="add-form-button" id="authorization-button">Войти</button>
</div>`;
  formAuthorizationElement.innerHTML = authorizationFormHtml;
  authorizationInvisibleElement.classList.add("loading-none");
  addFormInvisibleElement.classList.add("loading-none");

  const authorizationButtonElement = document.getElementById("authorization-button");
  authorizationButtonElement.addEventListener('click', authorizationsuccess);

}