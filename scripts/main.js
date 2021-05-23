let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupModal = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form-container');
let nameInput = formElement.querySelector('.popup__input_edit_name');
let jobInput = formElement.querySelector('.popup__input_edit_vocation');

let nameTitle = document.querySelector('.profile__title');
let jobTitle = document.querySelector('.profile__subtitle');



function ToggleClass() {
  if (popupModal.classList.contains('popup_opened') !== true) {
    popupModal.classList.add('popup_opened');
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    
  } else {
    popupModal.classList.remove('popup_opened')
  }
}

editButton.addEventListener('click', ToggleClass);
closeButton.addEventListener('click', ToggleClass);

function formSubmitHandler(evt) {
  
    evt.preventDefault();
  
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  
  ToggleClass()

}

formElement.addEventListener('submit', formSubmitHandler); 


