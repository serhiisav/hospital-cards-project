import request from "./Requests.js";
import Modal from "./Modal.js";
import {Cards as Cards, getAllCards, renderNoDataExist, addOneCard, updateOneCard} from "./Cards.js";
import alertMessage from "./Alert.js";

export default class VisitForm {
    constructor(innerForm) {
        this.innerForm = innerForm;
    }

    render(id = null, selectDoctor = null) {
        const form = document.createElement("form");
        form.id = "visit-form";
        form.append(this.innerForm);
        const div = document.createElement("div");
        div.id = "doctor-form";
        form.append(div);

        this.VisitFormModal = new Modal("Visit", form);

        if (id !== null) {
            setTimeout(() => {
                const submit = document.querySelector("#submit");
                submit.disabled = false;
            }, 200);
        } else {
            setTimeout(() => {
                const submit = document.querySelector("#submit");
                submit.disabled = true;
            }, 200);
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let obj = {};
            if (form.reportValidity()) {
                for (const i of e.target.elements) {
                    if (i.id === "pastDesease") {
                        obj[i.id] = i.checked;
                    } else {
                        obj[i.id] = i.value.toLowerCase();
                    }
                }
                delete obj.submit;

                this.VisitFormModal.remove();
                if (id === null) {
                    request.post(obj)
                        .then((response) => {
                            return response.json();
                        })
                        .then((response) => {
                            alertMessage(`Card has been created`, 'alert-info');
                            addOneCard(response)
                        }).catch(error=>{
                        alertMessage(`Card has not been created`, 'alert-danger');
                    });
                } else {
                    obj.id = id;
                    obj.selectDoctor = selectDoctor;
                    request.put(id, obj)
                        .then((response) => {
                            return response.json();
                        })
                        .then((response) => {
                            alertMessage(`Card has been updated`, 'alert-info');
                            updateOneCard(response)
                        }).catch(error=>{
                        alertMessage(`Card has not been updated`, 'alert-danger');
                    });
                }

            }
        });
    }
}
