// ----- Initial cards -----
const initialCards = [
  { title: "Yosemite Valley", link: "./images/yosemite.jpg" },
  { title: "Lake Louise", link: "./images/lake-louise.jpg" },
  { title: "Bald Mountains", link: "./images/bald-mountains.jpg" },
  { title: "Latemar", link: "./images/latemar.jpg" },
  { title: "Vanoise National Park", link: "./images/vanoise.jpg" },
  { title: "Lago di Braies", link: "./images/lago.jpg" }
];

// ----- Selectors -----
const cardsContainer = document.querySelector("#cards");
const cardTemplate = document.querySelector("#card-template").content;

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-about");

const editProfileBtn = document.querySelector(".profile__edit-button");
const addPlaceBtn = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImage = document.querySelector(".popup_type_image");

const formProfile = document.forms["edit-profile"];
const formAddCard = document.forms["add-card"];

const popupImageEl = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close");

// ----- Popup functions -----
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

// Close by overlay click
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Close buttons
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closePopup(popup);
  });
});

// ----- Card creation -----
function createCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.title;
  cardTitle.textContent = data.title;

  // Like
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Delete
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Image zoom
  cardImage.addEventListener("click", () => {
    popupImageEl.src = data.link;
    popupImageEl.alt = data.title;
    popupCaption.textContent = data.title;
    openPopup(popupImage);
  });

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card));
  });
}

// ----- Form handlers -----
formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = formProfile.name.value;
  profileAbout.textContent = formProfile.about.value;
  closePopup(popupProfile);
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    title: formAddCard.title.value,
    link: formAddCard.link.value,
  };
  cardsContainer.prepend(createCard(newCard));
  formAddCard.reset();
  closePopup(popupAddCard);
});

// ----- Button listeners -----
editProfileBtn.addEventListener("click", () => {
  formProfile.name.value = profileName.textContent;
  formProfile.about.value = profileAbout.textContent;
  openPopup(popupProfile);
});

addPlaceBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
});

// ----- Render cards on load -----
renderInitialCards();

// ----- Enable validation (from validate.js) -----
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
});
