import Modal from "./Modal.js";
import request from "./Requests.js";
import alertMessage from "./Alert.js";
import { Cards as Cards, getAllCards } from "./Cards.js";
import template from "./Template.js";

import { BASE_URL, CARDS_URL, ROOT } from "./Constants.js";
import Filter from "./Filter.js";

export default class LoginForm {
  constructor() {
    this.render();
  }

  // creates input
  inputCreate(element, type, placeholder, id) {
    const input = document.createElement(element);
    input.classList.add("form-control", "my-4");
    input.type = type;
    input.placeholder = placeholder;
    input.id = id;

    // inputWrap.append(label, input);

    return input;
  }

  render() {
    const form = document.createElement("form");

    // fields
    const email = this.inputCreate(
      "input",
      "email",
      "Email address",
      "input_email"
    );
    const password = this.inputCreate(
      "input",
      "password",
      "Password",
      "input_password"
    );

    const submit = document.createElement("button");
    submit.classList.add("btn", "btn-primary");
    submit.textContent = "Войти";

    form.append(email, password, submit);

    this.loginModal = new Modal("Login", form, true);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitHandler(email.value, password.value);
    });
  }

  submitHandler(email, password) {
    // придумать лучший способ вытягивать данные
    request
      .login({ email: email, password: password })
      .then((resp) => {
        if (resp.status !== 200) {
          resp.text().then((data) => {
            alertMessage(data, "alert-danger");
          });
          throw { code: resp };
        }

        resp.text().then((data) => {
          // сохраняем данные
          // console.log(data);
          localStorage.token = data;
          let filter1 = new Filter(ROOT);
          filter1.createFilterForm();
          getAllCards();
          template.loadHeader(document.getElementById("login"));
          // загрузка страницы залогиненого пользователя
          // fetch за всеми карточками
          // request.posts()
          // request
          //   .get()
          //   .then((resp) => resp.text())
          //   .then((data) => {
          //     localStorage.cards = JSON.stringify(data);
          //     template.loadHeader(document.getElementById('login'));
          //     template.loadBody(data);
          //
          //   })
          //   .catch((e) => console.log(e));

          // скрываем модальное
          this.loginModal.remove();
        });
      })
      .catch((e) => console.log(e));
  }
}

// вынести в отдельный метод загрузку всех элементов
