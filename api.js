

//переменные для работы

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
let myDate = new Date();
let originalComment = document.getElementById("comment-original");


const host = 'https://wedev-api.sky.pro/api/v2/tatyana/comments'
const hostReg = 'https://wedev-api.sky.pro/api/user'


export let token;
export function setToken(newToken) {
  token = newToken;
}

export let UserName;
export function setUserName(newName) {
  UserName = newName;
}


//GET запрос в API
export function getComments() {
  return fetch(host, {
    method: "GET",
    headers: {
      Autorisation: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 200) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}


//POST запрос в API
export function postComments() {
  /*return fetch(hostReg, {
    method: "GET",
  }).then((response) => {
    return response.json();
  }).then((responseData) => {
    return responseData; 
  }).then(() => {*/
  return fetch(host, {
    method: "POST",
    headers: {
      Autorisation: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
        ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
      text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      likesCounter: 0,
      itLikes: false,
      original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
      answer: '',
      isLikeLoading: false,

    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Введенные имя или комментарий короче 3-х знаков");
    } else if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 201) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}


//GET запрос на регистрацию
export function registrationRequest() {
  const NameInputElement = document.getElementById("name-input");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  return fetch(hostReg, {
    method: "POST",
    body: JSON.stringify({
      login: loginInputElement.value,
      name: NameInputElement.value,
      password: passwordInputElement.value,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status === 400) {
      throw new Error("неправильный логин или пароль");
    } else if (response.status !== 201) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}

//GET запрос на авторизацию
export function authorizationRequest(/*login, password*/) {
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  return fetch(`https://wedev-api.sky.pro/api/user/login`, {
    method: "POST",
    body: JSON.stringify({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status === 400) {
      throw new Error("неправильный логин или пароль");
    } else if (response.status !== 201) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  }).then((responseData) => {
    console.log(token);
    setToken(responseData.user.token);
    setUserName(responseData.user.name);
    console.log(token);
    console.log(UserName);

  });
}


