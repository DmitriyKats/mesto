let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupModal = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form-container');
let nameInput = formElement.querySelector('.popup__input_edit_name');
let jobInput = formElement.querySelector('.popup__input_edit_description');



function ToggleClass() {
  popupModal.classList.toggle('popup_opened');
}

editButton.addEventListener('click', ToggleClass);
closeButton.addEventListener('click', ToggleClass);

function formSubmitHandler(evt) {
  
  let nameTitle = document.querySelector('.profile__title');
  let jobTitle = document.querySelector('.profile__subtitle');

  evt.preventDefault();
  
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  
  ToggleClass()

}

formElement.addEventListener('submit', formSubmitHandler); 


