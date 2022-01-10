import { ROOT, STATUS_OK } from "./Constants.js";
import request from "./Requests.js";
import alertMessage from "./Alert.js";
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js";
import VisitForm from "./VisitForm.js";

import Filter from "./Filter.js";

class Cards {
  constructor(visit) {
    this.visit = visit;
  }

  createCard() {
    let createdCard = this.createBodyOfCard();
    root.append(createdCard);
    this.cardElement = createdCard;
  }

  replaceCard(elementForReplace) {
    let createdCardForChange = this.createBodyOfCard();
    elementForReplace.replaceWith(createdCardForChange);
    this.cardElement = createdCardForChange;
  }

  createBodyOfCard() {
    const card = document.createElement("div");
    card.setAttribute("id", this.visit.id);
    card.className = "card border-primary text-black bg-light mb-3";
    this.createHeader(card);
    this.createBody(card);
    this.createButtons(card);
    return card;
  }

  createHeader(card) {
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    card.append(cardHeader);
    this.createTitle(cardHeader);
    this.createCloseIcon(cardHeader);
  }

  createTitle(cardHeader) {
    const cardHeaderTitle = document.createElement("span");
    cardHeaderTitle.className = "card-header__title";
    cardHeaderTitle.textContent = `Doctor: ${this.visit.selectDoctor}`;
    cardHeader.append(cardHeaderTitle);
  }

  createCloseIcon(cardHeader) {
    const cardHeaderCloseCard = document.createElement("span");
    cardHeaderCloseCard.className = "card-header__close-card";
    const cardHeaderCloseCardIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    cardHeaderCloseCardIcon.setAttribute("height", "24px");
    cardHeaderCloseCardIcon.setAttribute("viewBox", "0 0 24 24");
    cardHeaderCloseCardIcon.setAttribute("width", "24px");
    cardHeaderCloseCard.append(cardHeaderCloseCardIcon);
    const cardHeaderCloseCardIconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    cardHeaderCloseCardIconPath.setAttribute("d", "M0 0h24v24H0z");
    cardHeaderCloseCardIconPath.setAttribute("fill", "none");
    cardHeaderCloseCardIcon.append(cardHeaderCloseCardIconPath);
    const cardHeaderCloseCardIconPathSecond = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    cardHeaderCloseCardIconPathSecond.setAttribute(
      "d",
      "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    );
    cardHeaderCloseCardIcon.append(cardHeaderCloseCardIconPathSecond);
    cardHeader.append(cardHeaderCloseCard);
    cardHeaderCloseCardIcon.addEventListener(
      "click",
      this.deleteCardExecuted.bind(event, this)
    );
  }

  createBody(card) {
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const cardBodyTitle = document.createElement("h5");
    cardBodyTitle.className = "card-body__title";
    cardBodyTitle.textContent = `Patient: ${this.visit.fullname}`;
    cardBody.append(cardBodyTitle);
    this.createAdditionalInfo(cardBody);
    card.append(cardBody);
  }

  createButtons(card) {
    this.createOneBtn(
      "btn btn-primary",
      "Show More",
      this.showAdditionalInfo,
      card
    );
    this.createOneBtn("btn btn-warning", "Edit", this.editCard, card);
  }

  createOneBtn(className, textContent, functionForListener, card) {
    const showMoreBtn = document.createElement("button");
    showMoreBtn.type = "button";
    showMoreBtn.className = className;
    showMoreBtn.textContent = textContent;
    showMoreBtn.addEventListener(
      "click",
      functionForListener.bind(event, this)
    );
    card.append(showMoreBtn);
  }

  showAdditionalInfo(element) {
    element.additionalInfo.classList.replace("hide-element", "show-element");
  }

  deleteCardExecuted(element) {
    request
      .delete(element.visit.id)
      .then((response) => {
        if (response.status === STATUS_OK) {
          element.cardElement.remove();
          deleteCardFromStorage(element.visit.id);
          if (checkStorage()) {
            renderNoDataExist();
          }
          alertMessage(`Card was deleted successfully`, "alert-info");
        }
      })
      .catch((error) => {
        alertMessage(`Technical error`, "alert-danger");
      });
  }

  createAdditionalInfo(cardBody) {
    const additionalInfo = document.createElement("span");
    additionalInfo.className = "additional-info hide-element";
    const allKeys = Object.keys(this.visit);
    additionalInfo.textContent = this.mapAdditionalData(allKeys);
    cardBody.append(additionalInfo);
    this.additionalInfo = additionalInfo;
  }

  mapAdditionalData(allKeys) {
    const br = document.createElement("br");
    const mySet = new Set();
    allKeys.forEach((el) => {
      mySet.add(el);
    });
    let totalAnswer = "";
    const separator = "\n";
    if (mySet.has("age")) {
      totalAnswer += `Age : ${this.visit.age}` + separator;
    }
    if (mySet.has("purpose")) {
      totalAnswer += `Purpose of the Visit : ${this.visit.purpose}` + separator;
    }
    if (mySet.has("shortDesc")) {
      totalAnswer +=
        `Short description of the Visit : ${this.visit.shortDesc}` + separator;
    }
    if (mySet.has("urgency")) {
      totalAnswer +=
        `How urgent is the visit : ${this.visit.urgency}` + separator;
    }
    if (mySet.has("date")) {
      totalAnswer +=
        `Last Visit to the Doctor : ${this.visit.date}` + separator;
    }
    if (mySet.has("bloodPresure")) {
      totalAnswer +=
        `Your regular blood pressure : ${this.visit.bloodPresure}` + separator;
    }
    if (mySet.has("index")) {
      totalAnswer += `Body mass index : ${this.visit.index}` + separator;
    }
    if (mySet.has("pastDes")) {
      totalAnswer +=
        `Past diseases of the cardiovascular system : ${this.visit.pastDes}` +
        separator;
    }
    if (mySet.has("appointmentDate")) {
      totalAnswer +=
        `Appointment Date : ${this.visit.appointmentDate}` + separator;
    }
    return totalAnswer;
  }

  editCard(element) {
    let visitForm;
    if (element.visit.selectDoctor === "dentist") {
      const visitDentist = new VisitDentist();
      visitForm = new VisitForm(visitDentist.render(element.visit));
    } else if (element.visit.selectDoctor === "cardiologist") {
      const visitCardiologist = new VisitCardiologist();
      visitForm = new VisitForm(visitCardiologist.render(element.visit));
    } else if (element.visit.selectDoctor === "therapist") {
      const visitTherapist = new VisitTherapist();
      visitForm = new VisitForm(visitTherapist.render(element.visit));
    }
    visitForm.render(element.visit.id, element.visit.selectDoctor);
  }
}

function addOneCard(response) {
  addOneCardForStorage(response);
  let cars = new Cards(response);
  cars.createCard();
  const pToDelete = document.getElementById("no-data");
  if (pToDelete) {
    pToDelete.remove();
  }
  const filter = new Filter(ROOT);
  filter.filterData();
}

function updateOneCard(response) {
  updateOneCardInStorage(response);
  const cardSelected = document.getElementById(response.id);
  let card = new Cards(response);
  card.replaceCard(cardSelected);
  const filter = new Filter(ROOT);
  filter.filterData();
}

function updateOneCardInStorage(response) {
  const listOfCards = JSON.parse(localStorage.getItem("cards"));
  const newArray = listOfCards.map((el) => {
    if (el.id === response.id) {
      return response;
    } else {
      return el;
    }
  });
  localStorage.setItem("cards", JSON.stringify(newArray));
}

function getAllCards() {
  request
    .get()
    .then((response) => response.json())
    .then((answ) => {
      if (answ.length > 0) {
        alertMessage(`Received ${answ.length} card(s)`, "alert-info");
        addCardForStorage(answ);
        answ.forEach((el) => {
          const noData = document.getElementById("no-data");
          if (noData) {
            noData.remove();
          }
          let cars = new Cards(el);
          cars.createCard();
        });
      } else {
        alertMessage(`There are no cards`, "alert-info");
        renderNoDataExist();
      }
    })
    .catch((error) => {
      alertMessage(`Technical error`, "alert-danger");
    });
}

function deleteCardFromStorage(elId) {
  const listOfCards = JSON.parse(localStorage.getItem("cards"));
  const newArray = listOfCards.filter((el) => el.id !== elId);
  addCardForStorage(newArray);
}

function addCardForStorage(data) {
  localStorage.setItem("cards", JSON.stringify(data));
}

function addOneCardForStorage(data) {
  const listOfCards = JSON.parse(localStorage.getItem("cards"));
  if (listOfCards && listOfCards.length > 0) {
    const listOfCardsParsed = JSON.parse(localStorage.getItem("cards"));
    listOfCardsParsed.push(data);
    localStorage.setItem("cards", JSON.stringify(listOfCardsParsed));
  } else {
    const array = [];
    array.push(data);
    localStorage.setItem("cards", JSON.stringify(array));
  }
}

function checkStorage() {
  const listOfCards = JSON.parse(localStorage.getItem("cards"));
  return listOfCards && listOfCards.length === 0;
}

function renderNoDataExist() {
  const nodataInfo = document.createElement("p");
  nodataInfo.setAttribute("id", "no-data");
  nodataInfo.className = "col-12 text-center";
  nodataInfo.textContent = "No items have been added";
  ROOT.append(nodataInfo);
}

export { Cards, getAllCards, renderNoDataExist, addOneCard, updateOneCard };
