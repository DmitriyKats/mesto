
const config = {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

class FormValidator {

    constructor(formElement, config) {
      this._formElement = formElement;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    }
        

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }
      
    _hasInvalidInput() {
          return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      }); 
      }

    _submitButtonActive() {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.removeAttribute("disabled");
      }
    
    submitButtonInactive() {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.setAttribute("disabled", true);
      }

    toggleButtonState() {

        if (this._hasInvalidInput()) {
          this.submitButtonInactive();
         
        } else { 
          this._submitButtonActive();
        } 
      }

    deleteErrors() {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
      });
    }  
    

    _setEventListeners() {
            
          this.toggleButtonState();
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
    
              this.toggleButtonState();
            });
          });  
      }
    
    
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
      }
    
}

export {config, FormValidator}