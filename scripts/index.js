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
const profileName = document.querySelector('.nav__name');
const profileDescription = document.querySelector('.nav__job-title');
const profileEditButton = document.querySelector('.nav__button-edit');
const profileAddButton = document.querySelector('.nav__button-add');
const articlesContainer = document.querySelector('.articles');
const cardTemplate = document.querySelector('#card-template').content;
const editProfilePopup = document.querySelector('#edit-profile-popup');
const addCardPopup = document.querySelector('#add-place-popup');
const imagePopup = document.querySelector('#popup__img-zoom');
const editProfileForm = document.forms['edit-form'];
const addCardForm = document.forms['edit-form'];
const nameInput = document.querySelector('#popup-input-name');
const aboutInput = document.querySelector('#popup-input-description');
const cardTitleInput = document.querySelector('#popup-input-title');
const cardLinkInput = document.querySelector('#form-img-src');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');

// Functions
function openPopup(popupElement) {
    popupElement.classList.remove('popup_hidden');
    document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popupElement) {
    popupElement.classList.add('popup_hidden');
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup:not(.popup_hidden)');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function handleCardLike(evt) {
    const likeIcon = evt.currentTarget.querySelector('.card__like-icon');
    likeIcon.classList.toggle('card__like-icon_active');
    if (likeIcon.getAttribute('data-is-liked') === 'false') {
        likeIcon.setAttribute('data-is-liked', 'true');
        likeIcon.src = './images/heart-active.svg';
    } else {
        likeIcon.setAttribute('data-is-liked', 'false');
        likeIcon.src = './images/heart.svg';
    }
}

function handleCardDelete(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

function handleCardClick(cardData) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__figcaption');
    
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    
    openPopup(imagePopup);
}

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__place-title');
    const likeButton = cardElement.querySelector('.card__icon-container');
    const deleteButton = cardElement.querySelector('.card__delete-icon');
    
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

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    
    closePopup(editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    
    const newCard = {
        name: cardTitleInput.value,
        link: cardLinkInput.value
    };
    
    renderCard(newCard, articlesContainer);
    addCardForm.reset();
    closePopup(addCardPopup);
}

function renderInitialCards() {
    initialCards.forEach(cardData => {
        renderCard(cardData, articlesContainer);
    });
}

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
}

// Event Listeners
profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openPopup(editProfilePopup);
});

profileAddButton.addEventListener('click', () => openPopup(addCardPopup));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

popups.forEach(popup => {
    popup.addEventListener('mousedown', handleOverlayClick);
});

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Initialize page
renderInitialCards();

// Enable validation
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit:disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});