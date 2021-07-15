// Я понимаю, что в моей работе есть ошибки, но я хочу получить обратную связь, так как очень тяжёло всё даётся.
const config = {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';

}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }



const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    
    buttonElement.classList.add(config.inactiveButtonClass);
} else {
    
    buttonElement.classList.remove(config.inactiveButtonClass);
} 
}


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);

          toggleButtonState(inputList, buttonElement);
        });
      });  
  }


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
             evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};


enableValidation();