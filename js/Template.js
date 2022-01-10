import VisitForm from "./VisitForm.js";
import {
  Visit,
  VisitDentist,
  VisitCardiologist,
  VisitTherapist,
} from "./Visit.js";

// const modalBody = document.getElementById("visit-form");
// const selectDoctor = document.getElementById("selectDoctor");

// const login = document.getElementById("login");

// const modal = new Modal("Visit", visitForm.render());
// login.addEventListener("click", () => {
// });

class Templates {
  constructor() {
    this.root = document.getElementById("root");
  }
  loadHeader(newBtn) {
    const btnCreate = document.createElement("button");
    btnCreate.classList.add("btn", "btn-primary");
    btnCreate.id = "createVisit";
    btnCreate.textContent = "Create Visit";

    btnCreate.addEventListener("click", () => {
      // ТУТ вызывается модальное для вызова карточки

      const innerForm = new Visit();
      const visitForm = new VisitForm(innerForm.render());
      visitForm.render();

      const visitDentist = new VisitDentist();
      const visitCardiologist = new VisitCardiologist();
      const visitTherapist = new VisitTherapist();

      setTimeout(() => {
        const selectDoctor = document.getElementById("selectDoctor");
        const submit = document.querySelector("#submit");

        selectDoctor.addEventListener("change", (e) => {
          if (selectDoctor.value === "dentist") {
            const div = document.querySelector("#doctor-form");
            submit.disabled = false;

            div.replaceWith(visitDentist.render());
          } else if (selectDoctor.value === "cardiologist") {
            const div = document.querySelector("#doctor-form");
            submit.disabled = false;

            div.replaceWith(visitCardiologist.render());
          } else if (selectDoctor.value === "therapist") {
            const div = document.querySelector("#doctor-form");
            submit.disabled = false;

            div.replaceWith(visitTherapist.render());
          } else {
            const div = document.querySelector("#doctor-form");
            submit.disabled = true;

            div.replaceWith(innerForm.doctorForm());
          }
        });
      }, 200);
    });

    newBtn.after(btnCreate);
    newBtn.remove();
  }

  loadBody(data) {
    this.root.append(data);
  }
}

export default new Templates();
