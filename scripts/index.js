// Constants
const initialCards = [
    {
        name: "Berlin",
        link: "./images/berlin.jpg"
    },
    {
        name: "Stuttgart",
        link: "./images/stuttgart.jpg"
    },
    {
        name: "Japan",
        link: "./images/japan.jpg"
    },
    {
        name: "Nagoyan",
        link: "./images/nagoyan.jpg"
    },
    {
        name: "CDMX",
        link: "./images/cdmx.jpg"
    },
    {
        name: "Chichenitza",
        link: "./images/chichenitza.jpg"
    }
];

// DOM Elements
const profileAddButton = document.querySelector('.profile__add-button');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');
const addCardForm = document.forms.addCardForm;
const cardTitleInput = addCardForm.elements.title;
const cardLinkInput = addCardForm.elements.link;
const closeButtons = document.querySelectorAll('.popup__close-button');

// Functions
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleOverlayClick);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('mousedown', handleOverlayClick);
}

function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function handleCardLike(evt) {
    evt.target.classList.toggle('card__like-icon_active');
}

function handleCardDelete(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

function handleCardClick(cardData) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    
    openPopup(imagePopup);
}

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    cardImage.addEventListener('click', () => handleCardClick(cardData));
    likeButton.addEventListener('click', handleCardLike);
    deleteButton.addEventListener('click', handleCardDelete);
    
    return cardElement;
}

function renderCard(cardData, container) {
    const cardElement = createCard(cardData);
    container.prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    
    const newCard = {
        name: cardTitleInput.value,
        link: cardLinkInput.value
    };
    
    renderCard(newCard, elementsList);
    addCardForm.reset();
    closePopup(addCardPopup);
}

function renderInitialCards() {
    initialCards.forEach(cardData => {
        renderCard(cardData, elementsList);
    });
}

// Event Listeners
profileAddButton.addEventListener('click', () => openPopup(addCardPopup));

closeButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Initialize page
renderInitialCards();