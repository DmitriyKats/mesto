 import {Card} from './Card.js';
 import { FormValidator, config} from './FormValidator.js';

const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');

const popupModalEdit = document.querySelector('.popup_type_profile');
const popupModalAdd = document.querySelector('.popup_type_add-card');
const popupModalImage = document.querySelector('.popup_type_image');

const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-title');

const formElementDescription = document.querySelector('.popup__form-container_edit-description');
const formElementAddPlace = document.querySelector('.popup__form-container_add-place');

const nameInput = formElementDescription.querySelector('.popup__input_edit_name');
const jobInput = formElementDescription.querySelector('.popup__input_edit_vocation');

const placeTitleInput = formElementAddPlace.querySelector('.popup__input_add_place');
const placeLinkInput = formElementAddPlace.querySelector('.popup__input_add_link');

const closeEditPopup = document.querySelector('.popup_type_profile .popup__close-button');
const closeAddPopup = document.querySelector('.popup_type_add-card .popup__close-button ');
const closeImagePopup = document.querySelector('.popup_type_image .popup__close-button');

const cardElements = document.querySelector('.elements');


function openPopup(popupName) {
  
  popupName.classList.add('popup_opened');
  document.addEventListener("keyup", closePopupByClickOnEsc);
    
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener("keyup", closePopupByClickOnEsc);
  
}

function closePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return
  }
  
  const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
}

function closePopupByClickOnEsc(event) {
  if (event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}


function handleEditPopup() {

  openPopup(popupModalEdit);

  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  formEditValidator.deleteErrors(); 
}

function formSubmitEditHandler(evt) {
  
  evt.preventDefault();

  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;

  closePopup(popupModalEdit);
}

function addCard(container, cardElement, isNewItem) {
  
  if (isNewItem) { 
    container.prepend(cardElement);
  } else { 
    container.append(cardElement); 
  } 
 }
 
function formSubmitAddCard(evt) {
  
  evt.preventDefault();
  
  const name = placeTitleInput.value; 
  const link = placeLinkInput.value;

  const cardInstance = new Card({name, link}, '.elements__template');
  const cardElement = cardInstance.generateCard();

  addCard(cardElements, cardElement, true);
  formElementAddPlace.reset();
    
  
  formAddPlaceValidator.submitButtonInactive();
  closePopup(popupModalAdd);
}


editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', () => {
  openPopup(popupModalAdd)
  formAddPlaceValidator.deleteErrors();

});

closeEditPopup.addEventListener('click', () => closePopup(popupModalEdit));
closeAddPopup.addEventListener('click', () => closePopup(popupModalAdd));

formElementDescription.addEventListener('submit', formSubmitEditHandler);
formElementAddPlace.addEventListener('submit', formSubmitAddCard);

popupModalEdit.addEventListener('click', closePopupByClickOnOverlay);
popupModalAdd.addEventListener('click', closePopupByClickOnOverlay);
popupModalImage.addEventListener('click', closePopupByClickOnOverlay);

closeImagePopup.addEventListener('click', () => closePopup(popupModalImage));


initialCards.forEach((card) => {
  const cardInstance = new Card(card, '.elements__template');
  const cardElement = cardInstance.generateCard();
  addCard(cardElements, cardElement, false);
  
});

const formEditValidator = new FormValidator(formElementDescription, config);
formEditValidator.enableValidation();

const formAddPlaceValidator = new FormValidator(formElementAddPlace, config);
formAddPlaceValidator.enableValidation();


 export {openPopup, closePopup, closePopupByClickOnEsc, popupImage, popupModalImage, popupImageText};



