const form = document.getElementById('contact-form');
const toast = document.getElementById('success-toast');

// Inputs
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

// Error Message spans
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const queryTypeError = document.getElementById('query-type-error');
const messageError = document.getElementById('message-error');
const consentError = document.getElementById('consent-error');

//they both map index to index.
const inputs = [firstName, lastName, email, message, consent];
const errorMessages = [firstNameError, lastNameError, emailError, messageError, consentError];

const clearErrors = () => {
    inputs.forEach(input => {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        input.removeAttribute('aria-describedby');
    });

    queryTypeInputs.forEach(input => {
        input.removeAttribute('aria-invalid');
    });

    errorMessages.forEach(error => {
        error.classList.remove('visible');
    });
    queryTypeError.classList.remove('visible');
}

//validates the form, returns true if the form is valid, false otherwise 
const validateForm = () => {

    // Reset errors
    clearErrors();

    let isValid = true;

    // Limits
    const MAX_NAME_LENGTH = 30;
    const MAX_EMAIL_LENGTH = 30;
    const MAX_MESSAGE_LENGTH = 100;

    // First Name Validation
    const firstNameValue = firstName.value.trim();
    if (firstNameValue === '' || /^\s+$/.test(firstName.value)) {
        firstNameError.textContent = 'This field is required';
        showError(firstName, firstNameError);
        isValid = false;
    } else if (firstNameValue.length > MAX_NAME_LENGTH) {
        firstNameError.textContent = `Name should be less than ${MAX_NAME_LENGTH} characters`;
        showError(firstName, firstNameError);
        isValid = false;
    } else if (!isValidName(firstNameValue)) {
        firstNameError.textContent = 'Name should not contain numbers';
        showError(firstName, firstNameError);
        isValid = false;
    } else {
        // Normalize: trim whitespace
        firstName.value = firstNameValue;
    }

    // Last Name Validation
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === '' || /^\s+$/.test(lastName.value)) {
        lastNameError.textContent = 'This field is required';
        showError(lastName, lastNameError);
        isValid = false;
    } else if (lastNameValue.length > MAX_NAME_LENGTH) {
        lastNameError.textContent = `Name should be less than ${MAX_NAME_LENGTH} characters`;
        showError(lastName, lastNameError);
        isValid = false;
    } else if (!isValidName(lastNameValue)) {
        lastNameError.textContent = 'Name should not contain numbers';
        showError(lastName, lastNameError);
        isValid = false;
    } else {
        // Normalize: trim whitespace
        lastName.value = lastNameValue;
    }

    // Email Validation
    const emailValue = email.value.trim();
    if (emailValue === '' || /^\s+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        showError(email, emailError);
        isValid = false;
    } else if (emailValue.length > MAX_EMAIL_LENGTH) {
        emailError.textContent = `Email should be less than ${MAX_EMAIL_LENGTH} characters`;
        showError(email, emailError);
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showError(email, emailError);
        isValid = false;
    } else {
        // Normalize: trim whitespace
        email.value = emailValue;
    }


    // Query Type Validation
    let queryTypeSelected = false;
    queryTypeInputs.forEach(input => {
        if (input.checked) queryTypeSelected = true;
    });
    if (!queryTypeSelected) {
        queryTypeError.classList.add('visible');
        queryTypeInputs.forEach(input => {
            input.setAttribute('aria-invalid', 'true'); // valid to put on radio
        });
        isValid = false;
    } else {
        queryTypeInputs.forEach(input => {
            input.removeAttribute('aria-invalid');
        });
    }

    // Message Validation
    const messageValue = message.value.trim();
    if (messageValue === '' || /^\s+$/.test(message.value)) {
        messageError.textContent = 'This field is required';
        showError(message, messageError);
        isValid = false;
    } else if (messageValue.length > MAX_MESSAGE_LENGTH) {
        messageError.textContent = `Message should be less than ${MAX_MESSAGE_LENGTH} characters`;
        showError(message, messageError);
        isValid = false;
    } else {
        // Normalize: trim whitespace
        message.value = messageValue;
    }

    // Consent Validation
    if (!consent.checked) {
        consentError.classList.add('visible');
        consent.setAttribute('aria-invalid', 'true');
        consent.setAttribute('aria-describedby', consentError.id);
        isValid = false;
    } else {
        consent.removeAttribute('aria-invalid');
        consent.removeAttribute('aria-describedby');
    }

    // Common Safety Check
    if (!checkAllInputsSafe()) {
        isValid = false;
    }

    return isValid;

}

//loop, check for scripts in input.
function checkAllInputsSafe() {
    let allSafe = true;
    inputs.forEach((input, index) => {
        // Skip checkboxes and radios if included
        if (input.type === 'checkbox' || input.type === 'radio') return;

        if (!isSafeInput(input.value.trim())) {
            const errorMsg = errorMessages[index];
            errorMsg.textContent = 'Input contains invalid characters';
            showError(input, errorMsg);
            allSafe = false;
        }
    });
    return allSafe;
}

function showError(input, errorMsg) {
    input.classList.add('error');
    errorMsg.classList.add('visible');


    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorMsg.id);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidName(name) {
    // Check if name contains any numbers
    const re = /^[^0-9]+$/;
    return re.test(name);
}

function isSafeInput(input) {
    // <script>, javascript:, etc.
    const re = /<script\b[^>]*>([\s\S]*?)<\/script>|javascript:|on\w+=/i;
    return !re.test(input);
}