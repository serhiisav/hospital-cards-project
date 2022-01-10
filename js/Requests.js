

const CARDS_URL = 'https://ajax.test-danit.com/api/v2/cards';
const LOGIN_URL = 'https://ajax.test-danit.com/api/v2/cards/login';

class Requests {
  constructor() {
    this.url = CARDS_URL;
  }

  // добавляет authorization когда нужно
  // в логине он нам не нужен
  // authorization добавится только если есть token
  setHeaders(headers) {
    if (localStorage.token) {
      return {
        ...headers,
        Authorization: `Bearer ${localStorage.token}`,
      };
    }
    return headers;
  }

  // убираем и добавляем body в завимимости от наличия data
  // fetch не срабатывает если body есть, а он нам не нужен
  // например для получения карточек
  setOptions(method, data) {
    const options = {
      method: method,
      headers: this.setHeaders({ 'Content-Type': 'application/json' }),
    };
    if (data !== null) {
      options.body = JSON.stringify(data);
      return options;
    }
    return options;
  }



  login(data) {
    this.url = LOGIN_URL;
    return this.fetchMethod('POST', '', data);
  }

  delete(id) {
    this.url = CARDS_URL;

    return this.fetchMethod('delete', id);
  }
  put(id, obj) {
    this.url = CARDS_URL;
    return this.fetchMethod('put',id, obj);
  }

  post(obj) {
    this.url = CARDS_URL;

    return this.fetchMethod('post', '', obj);
  }

  get(id = '') {
    this.url = CARDS_URL;
    return this.fetchMethod('get', id);
  }

  fetchMethod(method, id, data = null) {
    return fetch(this.url + '/' + id, this.setOptions(method, data));
  }
}

export default new Requests();

// нужно сделать  url для login динамическим
