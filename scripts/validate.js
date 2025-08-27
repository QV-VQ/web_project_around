// Function to show input error
function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    }
}

// Function to hide input error
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
    }
}

// Function to check input validity
function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}

// Function to check if form has invalid inputs
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

// Function to toggle button state
function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

// Function to set event listeners for form validation
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    // Set initial button state
    toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

// Function to enable validation for all forms
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        
        setEventListeners(formElement, config);
    });
}