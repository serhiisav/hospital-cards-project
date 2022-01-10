class Visit {
    constructor() {
        this.purpose = "Purpose of the Visit";
        this.shortDesc = "Short description of the Visit";
        this.urgency = "How urgent is the visit";
        this.personalInfo = "Full Name";
        this.date = "When to schedule the appointment";
        this.fullname = "Your full name";
        this.comments = "*(Optional) Your coments";
    }

    render(visit) {
        const select = document.createElement("select");
        select.id = "selectDoctor";
        select.classList.add("form-select");

        const docs = [
            "--- Select a Doctor ---",
            "Dentist",
            "Cardiologist",
            "Therapist",
        ];

        docs.forEach((e) => {
            const option = document.createElement("option");
            option.value = e.toLowerCase();
            option.innerText = e;
            select.append(option);
        });

        return select;
    }

    standardQuestions(div, visit) {
        this.repeat(div, this.fullname, "text", "fullname", visit !== undefined ? visit.fullname : null);
        this.repeat(div, this.purpose, "text", "purpose", visit !== undefined ? visit.purpose : null);
        this.repeatTextArea(
            div,
            this.shortDesc,
            "shortDesc",
            visit !== undefined ? visit.shortDesc : null,
            "form-control",
            "textarea",
        );

        //

        // Select

        this.label(div, "urgency", "form-label", this.urgency);

        const select = document.createElement("select");
        select.id = "urgency";
        const low = document.createElement("option");
        const medium = document.createElement("option");
        const high = document.createElement("option");

        low.innerHTML = "Low";
        medium.innerHTML = "Medium";
        high.innerHTML = "High";

        select.append(low);
        select.append(medium);
        select.append(high);

        select.required = true;
        select.classList.add("form-select");

        div.append(select);
        if (visit !== undefined && visit.urgency) {
            select.value = visit.urgency[0].toUpperCase() + visit.urgency.substr(1);
        }
        this.br(div);
        // Date

        this.label(div, "appointmentDate", "form-label", this.date);

        const input = document.createElement("input");
        input.type = "date";
        input.id = "appointmentDate";

        let date = new Date();
        let nowDate =
                date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        input.setAttribute("min", nowDate);
        input.required = true;
        input.classList.add("form-control");
        if (visit !== undefined && visit.appointmentDate !== undefined) {
            input.value = visit.appointmentDate;
        }
        div.append(input);
        this.br(div);

        this.repeatTextArea(
            div,
            this.comments,
            "comments",
            visit !== undefined ? visit.comments : null,
            "form-control",
            "textarea",
            false
        );
    }

    doctorForm() {
        const div = document.createElement("div");
        div.id = "doctor-form";

        return div;
    }

    label(div, key, form, element) {
        const label = document.createElement("label");
        const br = document.createElement("br");
        label.innerHTML = element;
        label.classList.add(form);
        label.setAttribute("for", key);

        div.append(label);
    }

    br(div) {
        const br = document.createElement("br");
        div.append(br);
    }

    repeat(
        div,
        phrase,
        typeInp,
        elementsValue,
        value        = null,
        classParm    = "form-control",
        item         = "input",
        requiredElem = true,
    ) {
        const label = document.createElement("label");
        const br = document.createElement("br");
        label.innerHTML = phrase;
        label.classList.add("form-label");
        label.setAttribute("for", elementsValue);

        div.append(label);

        const input = document.createElement(item);
        input.type = typeInp;
        input.id = elementsValue;
        if (typeInp !== 'checkbox' && value !== null) {
            input.value = value
        }
        if (typeInp === 'checkbox' && value !== null) {
            if (value === true) {
                input.checked = "true";
            }
        }
        input.required = requiredElem;
        input.classList.add(classParm);
        label.classList.add("me-3");

        div.append(input);
        div.append(br);
    }

    repeatTextArea(
        div,
        phrase,
        elementsValue,
        value        = null,
        classParm    = "form-control",
        item         = "input",
        requiredElem = true
    ) {
        const label = document.createElement("label");
        const br = document.createElement("br");
        label.innerHTML = phrase;
        label.classList.add("form-label");
        label.setAttribute("for", elementsValue);

        div.append(label);

        const input = document.createElement(item);
        input.id = elementsValue;
        if (value !== null) {
            input.value = value
        }
        input.required = requiredElem;
        input.classList.add(classParm);
        label.classList.add("me-3");

        div.append(input);
        div.append(br);
    }
}

class VisitDentist extends Visit {
    constructor(purpose, shortDesc, urgency, personalInfo, date) {
        super(purpose, shortDesc, urgency, personalInfo, date);
        this.dateLastVisit = "Last Visit to the Doctor";
    }

    render(visit) {
        const div = document.createElement("div");
        div.id = "doctor-form";

        this.standardQuestions(div, visit);

        this.repeat(
            div,
            this.dateLastVisit,
            "date",
            "date",
            visit !== undefined ? visit.date : null,
            "form-control",
            "input",
        );

        return div;
    }
}

class VisitCardiologist extends Visit {
    constructor(purpose, shortDesc, urgency, personalInfo, date) {
        super(purpose, shortDesc, urgency, personalInfo, date);
        this.bloodPresure = "Your regular blood pressure";
        this.index = "Body mass index";
        this.pastDes = "Past diseases of the cardiovascular system";
        this.age = "Your age";
    }

    render(visit) {
        const div = document.createElement("div");
        div.id = "doctor-form";

        this.standardQuestions(div, visit);

        const label = document.createElement("label");

        this.repeat(div, this.bloodPresure, "number", "bloodPresure", visit !== undefined ? visit.bloodPresure : null);
        this.repeat(div, this.index, "number", "fatIndex", visit !== undefined ? visit.fatIndex : null);
        this.repeat(
            div,
            this.pastDes,
            "checkbox",
            "pastDesease",
            visit !== undefined ? visit.pastDesease : null,
            "form-check-input",
            "input",
            false
        );
        this.repeat(div, this.age, "number", "age", visit !== undefined ? visit.age : null);

        return div;
    }
}

class VisitTherapist extends Visit {
    constructor(purpose, shortDesc, urgency, personalInfo, date) {
        super(purpose, shortDesc, urgency, personalInfo, date);
        this.age = "Your age";
    }

    render(visit) {
        const div = document.createElement("div");
        div.id = "doctor-form";

        this.standardQuestions(div, visit);

        this.repeat(div, this.age, "number", "age", visit !== undefined ? visit.age : null, "form-control", "input");

        return div;
    }
}

export {Visit, VisitDentist, VisitCardiologist, VisitTherapist};
