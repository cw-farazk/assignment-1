const form = document.getElementById('contact-form');
const toast = document.getElementById('success-toast');

// Inputs
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

// Error Messages
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const queryTypeError = document.getElementById('query-type-error');
const messageError = document.getElementById('message-error');
const consentError = document.getElementById('consent-error');

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

//validates the form, then returns true if the form is valid, false otherwise 
const validateForm = () => {

    // Reset errors
    clearErrors();

    let isValid = true;

    // First Name Validation
    // First Name Validation
    if (firstName.value.trim() === '') {
        firstNameError.textContent = 'This field is required';
        showError(firstName, firstNameError);
        isValid = false;
    } else if (!isValidName(firstName.value.trim())) {
        firstNameError.textContent = 'Name should not contain numbers';
        showError(firstName, firstNameError);
        isValid = false;
    }

    // Last Name Validation
    if (lastName.value.trim() === '') {
        lastNameError.textContent = 'This field is required';
        showError(lastName, lastNameError);
        isValid = false;
    } else if (!isValidName(lastName.value.trim())) {
        lastNameError.textContent = 'Name should not contain numbers';
        showError(lastName, lastNameError);
        isValid = false;
    }

    // Email Validation
    if (!isValidEmail(email.value.trim())) {
        showError(email, emailError);
        isValid = false;
    }

    // Query Type Validation
    let queryTypeSelected = false;
    queryTypeInputs.forEach(input => {
        if (input.checked) queryTypeSelected = true;
    });
    if (!queryTypeSelected) {
        queryTypeError.classList.add('visible');
        // Add aria-invalid to the entire group container or inputs?
        // Simple approach: Add to inputs
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
    // Message Validation
    if (message.value.trim() === '') {
        messageError.textContent = 'This field is required';
        showError(message, messageError);
        isValid = false;
    } else if (!isSafeMessage(message.value.trim())) {
        messageError.textContent = 'Message contains invalid characters';
        showError(message, messageError);
        isValid = false;
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

    return isValid;

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

function isSafeMessage(msg) {
    // Check for common malicious script patterns
    // <script>, javascript:, etc.
    const re = /<script\b[^>]*>([\s\S]*?)<\/script>|javascript:|on\w+=/i;
    return !re.test(msg);
}

export { validateForm };