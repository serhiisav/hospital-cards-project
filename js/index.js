
import alertMessage from './Alert.js';
import LoginForm from './LoginForm.js';

import request from './Requests.js';
import template from './Template.js';
import { Cards as Cards, getAllCards, renderNoDataExist } from "./Cards.js";

import { BASE_URL, CARDS_URL, ROOT } from "./Constants.js";
import Filter from "./Filter.js";


"use strict";
class App {
  constructor(loginBtn, root) {
    this.loginBtn = loginBtn;
    this.root = root;
    this.token = localStorage.token;
    this.loadPage();
  }

  loadPage() {
    if (this.token) {
      // const request = new Requests();
      template.loadHeader(this.loginBtn);

      let filterLoad = new Filter(this.root);
      filterLoad.createFilterForm();

      getAllCards();
      //       request
      //         .get()
      //         .then((resp) => resp.text())
      //         .then((data) => {
      //           template.loadHeader(this.loginBtn);
      //           getAllCards();
      //         })
      //         .catch((e) => console.log(e));
    } else {
      // renderNoDataExist();
      document.getElementById('login').addEventListener('click', () => {
        const login = new LoginForm();
      });
    }
  }
}


// import Requests from "./Requests.js";
//
//
// const constAllDataResponse = fetch(BASE_URL + CARDS_URL,
//     {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             'Accept': 'application/json',
//             'Authorization': 'Bearer ced8be37-1946-4c27-bef1-c539280ffb2c'
//         },
//     }).then(response => response.json()).then(answ => {
//     console.log(answ);
// })

const appBtn = document.getElementById('login');

const app = new App(appBtn, root);
