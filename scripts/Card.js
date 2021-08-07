 import {openPopup, popupImage, popupModalImage, popupImageText} from './index.js';

 
class Card {
    constructor({name, link}, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);

        return cardElement;
    }

    
    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__title').textContent = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._link;

        

        this._setEventListeners();

  
        return this._element;

    }

    _handleLike(event) {
        event.target.classList.toggle('elements__heart-logo_active');
    }

    _handleDelete(event) {
        event.target.closest('.elements__element').remove();
    }    

    _setEventListeners() {
        this._element.querySelector('.elements__trash').addEventListener('click', (event) => {
            this._handleDelete(event);
        });
        
        this._element.querySelector('.elements__heart-logo').addEventListener('click', (event) => {
            this._handleLike(event);
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
          popupImage.src = this._link;
          popupImage.alt = this._name;
          popupImageText.textContent = this._name;
          openPopup(popupModalImage);
        });

    }

}


export {Card};

