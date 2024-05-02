document.addEventListener("DOMContentLoaded", function () {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmerMdp');
    const submitButton = document.querySelector('button');

    submitButton.addEventListener('click', function () {
        if (validateForm()) {
            alert('Formulaire soumis avec succès');
        }
    });
    const body = document.querySelector('body');
    const bubblesContainer = document.createElement('div');
    bubblesContainer.classList.add('bubbles');
    body.appendChild(bubblesContainer);

    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random()}s`;
        bubblesContainer.appendChild(bubble);
    }

    /* ---------------------------------- Implémentation des fonctions --------------------------------- */


    /* --- Fonction de vérification d'erreur dans le formulaire --- */
    /* Start Function */
    function validateForm() {
        resetStyles();
        resetErrorMessages();
        /* --------- Declaration des variables & constantes ----------- */
        const nom = nomInput.value.trim();
        const prenom = prenomInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        let hasError = false;
        /* -------------- Error Check  -------------- */
        if (nom === '') {
            setError(nomInput, "Veuillez saisir votre nom");
            hasError = true;
        } else if (nom.length < 5 || nom.length > 30) {
            setError(nomInput, "Votre nom doit contenir entre 5 et 30 caractères");
            hasError = true;
        }
        if (prenom === '') {
            setError(prenomInput, "Veuillez saisir votre prénom");
            hasError = true;
        } else if (prenom.length < 5 || prenom.length > 30) {
            setError(prenomInput, "Votre prénom doit contenir entre 5 et 30 caractères");
            hasError = true;
        }
        if (email === '') {
            setError(emailInput, "Veuillez saisir votre email");
            hasError = true;
        } else if (!validateEmail(email)) {
            setError(emailInput, 'Veuillez saisir une adresse e-mail valide');
            hasError = true;
        }
        if (password === '') {
            setError(passwordInput, "Veuillez saisir votre mot de passe");
            hasError = true;
        } else if (password.length < 8 || password.length > 50) {
            setError(passwordInput, "Votre mot de passe doit contenir entre 8 et 50 caractères");
            hasError = true;
        }
        if (confirmPassword === '') {
            setError(confirmPasswordInput, "Veuillez confirmer le mot de passe");
            hasError = true;
        }
        if (password !== confirmPassword) {
            setError(passwordInput, "Les mots de passe ne correspondent pas");
            setError(confirmPasswordInput, "Les mots de passe ne correspondent pas");
            hasError = true;
        }
        /* End Error Check */
        if (hasError) {
            return false;
        }

        return true;
        /* End function*/
    }
    /* --- Fonction d'affichage d'erreur dans le formulaire --- */
    /* Start Function */
    function setError(input, errorMessageText) {
        input.classList.add('error');
        const errorMessageID = input.id + '-error';
        const errorMessageElement = document.getElementById(errorMessageID);
        errorMessageElement.textContent = errorMessageText;
        setTimeout(() => {
            input.classList.remove('error');
            errorMessageElement.textContent = '';
        }, 5000);
        /* End Function */
    }
    /* --- Fonction de réinitialisation des erreurs dans le formulaire --- */
    /* Start Function */
    function resetErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = '';
        });
        /* End Function */
    }
    /* --- Fonction de réinitialisation des styles dans le formulaire --- */
    /* Start Function */
    function resetStyles() {
        const input = document.querySelectorAll('.champ input');
        input.forEach(function (input) {
            input.classList.remove('error');
        });
        /* End Function */
    }
    /* --- Fonction de vérification de l'adresse email --- */
    /* Start Function */
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
        /* End Function */
    }
});




