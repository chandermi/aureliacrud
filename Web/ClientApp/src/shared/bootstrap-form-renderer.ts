import { ValidateResult, RenderInstruction } from "aurelia-validation";

export class BootstrapFormRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    const formcontrol = element.closest('.form-control') === null ? element : element.closest('.form-control');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (!formcontrol.classList.contains('has-error')) {
        formcontrol.classList.add('has-success');
      }
    } else {
      // add the has-error class to the enclosing form-group div
      formcontrol.classList.remove('has-success');
      formcontrol.classList.add('has-error');

      // add help-block
      const message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    const formcontrol = element.closest('.form-control') === null ? element : element.closest('.form-control');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (formcontrol.classList.contains('has-success')) {
        formcontrol.classList.remove('has-success');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);

        // remove the has-error class from the enclosing form-group div
        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formcontrol.classList.remove('has-error');
        }
      }
    }
  }
}

