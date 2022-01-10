export default class FormCerate{

  constructor(){
    // this.element = element;
    // this.type = type;
    // this.placeholder = placeholder;
    // this.id = id;
  }

  inputCreate(element, type, text, id) {
    const inputWrap = document.createElement('div');
    inputWrap.classList.add('mb-3');

    const label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', id);
    label.textContent = text;

    this.input = document.createElement(element);
    this.input.classList.add('form-control');
    this.input.type = type;
    this.input.id = id;

    inputWrap.append(label, this.input);

    return inputWrap;
  }

  getValue() {
    console.log(this.input.value);
    
  }  
}