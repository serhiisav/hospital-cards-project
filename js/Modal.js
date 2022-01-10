export default class Modal {
  constructor(title, innerBody = "", login = false) {
    this.title = title;
    this.innerBody = innerBody;
    this.login = login;
    this.render();
  }

  render() {
    // Wrapper

    const modalWrapper = document.createElement("div");
    modalWrapper.classList.add("modal");
    modalWrapper.classList.add("fade");

    modalWrapper.id = "modal";
    modalWrapper.tabIndex = "-1";
    modalWrapper.setAttribute("aria-labelledby", "visitLabel");
    modalWrapper.ariaHidden = true;

    // Modal Dialog
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    // Modal Content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Modal Header
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = this.title;

    const btnCloseCross = document.createElement("button");
    btnCloseCross.classList.add("btn-close");
    btnCloseCross.setAttribute("data-bs-dismiss", "modal");
    btnCloseCross.setAttribute("aria-labe", "Close");

    modalHeader.append(modalTitle, btnCloseCross);

    // Modal Body
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.id = "modal-body";
    modalBody.append(this.innerBody);

    if (this.login) {
      modalContent.append(modalHeader, modalBody);

      modalDialog.append(modalContent);

      modalWrapper.append(modalDialog);

      this.newModal = new bootstrap.Modal(modalWrapper);

      this.newModal.show();

      modalWrapper.addEventListener("hidden.bs.modal", (e) => {
        modalWrapper.remove();
      });
    } else {
      // Modal Footer
      const modalFooter = document.createElement("div");
      modalFooter.classList.add("modal-footer");

      const btnSubmit = document.createElement("button");
      btnSubmit.type = "submit";
      btnSubmit.setAttribute("form", "visit-form");
      btnSubmit.classList.add("btn");
      btnSubmit.classList.add("btn-success");
      btnSubmit.innerHTML = "Submit";
      btnSubmit.id = "submit";

      const btnClose = document.createElement("button");
      btnClose.type = "button";
      btnClose.classList.add("btn");
      btnClose.classList.add("btn-secondary");
      btnClose.innerHTML = "Close";

      btnClose.setAttribute("data-bs-dismiss", "modal");

      modalFooter.append(btnSubmit, btnClose);

      modalContent.append(modalHeader, modalBody, modalFooter);

      modalDialog.append(modalContent);

      modalWrapper.append(modalDialog);

      this.newModal = new bootstrap.Modal(modalWrapper);

      this.newModal.show();

      modalWrapper.addEventListener("hidden.bs.modal", (e) => {
        modalWrapper.remove();
      });
    }
  }

  remove() {
    this.newModal.hide();
  }
}
