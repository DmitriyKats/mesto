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

const popupModal = document.querySelector('.popup');
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
const cardElementTemplate = document.querySelector('.elements__template').content;

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

function handleEditPopup() {
  openPopup(popupModalEdit);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
}

function formSubmitEditHandler(evt) {
  
  evt.preventDefault();

nameTitle.textContent = nameInput.value;
jobTitle.textContent = jobInput.value;

closePopup(popupModalEdit);
}

function formSubmitAddCard(evt) {
  
  evt.preventDefault();
  
  const name = placeTitleInput.value; 
  const link = placeLinkInput.value;
  addCard(cardElements, createCard({name, link}), true);
  formElementAddPlace.reset();
  closePopup(popupModalAdd);

}

 
function handleLike(event) {
  event.target.classList.toggle('elements__heart-logo_active');
}

function likeEventListener(element) {
  element.querySelector('.elements__heart-logo').addEventListener('click', handleLike);
}

function handleDelete(event) {
  event.target.closest('.elements__element').remove();
}

function deleteEventListener(element) {
  element.querySelector('.elements__trash').addEventListener('click', handleDelete);
}

function createCard({name, link}) {
  const cardElement = cardElementTemplate.cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = name;
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__image').alt = name;

  cardElement.querySelector('.elements__image').addEventListener('click', function() {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageText.textContent = name;
    openPopup(popupModalImage);
    
  });

  deleteEventListener(cardElement);
  likeEventListener(cardElement);

  return cardElement;
     
}

function addCard(container, cardElement, isNewItem) {
  
  if (isNewItem) { 
    container.prepend(cardElement); 
  } else { 
    container.append(cardElement); 
  } 
  
}

editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', () => openPopup(popupModalAdd));

closeEditPopup.addEventListener('click', () => closePopup(popupModalEdit));
closeAddPopup.addEventListener('click', () => closePopup(popupModalAdd));

formElementDescription.addEventListener('submit', formSubmitEditHandler);
formElementAddPlace.addEventListener('submit', formSubmitAddCard);

closeImagePopup.addEventListener('click', () => closePopup(popupModalImage));


initialCards.forEach((card) => {
  addCard(cardElements, createCard(card), false);
});





