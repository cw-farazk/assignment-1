

import { validateForm } from './error.config.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('success-toast');

    // Inputs
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    // const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');


    document.querySelector('body').onclick = function (e) {
        if (e.target != document.getElementsByClassName('container')[0]) {
            // alert('You clicked outside');
            // validateForm();
        } else {
            // console.log('You clicked inside');
        }
    }



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        let isValid = validateForm();

        if (isValid) {
            showSuccessToast();
            form.reset();
        }
    });



    function showSuccessToast() {
        toast.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Prefill form from URL query parameters
    function prefillForm() {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('firstName')) firstName.value = urlParams.get('firstName');
        if (urlParams.has('lastName')) lastName.value = urlParams.get('lastName');
        if (urlParams.has('email')) email.value = urlParams.get('email');
        if (urlParams.has('message')) message.value = urlParams.get('message');

        if (urlParams.has('queryType')) {
            const type = urlParams.get('queryType');
            const radio = document.querySelector(`input[name="query-type"][value="${type}"]`);
            if (radio) radio.checked = true;
        }

    }

    prefillForm();
});
