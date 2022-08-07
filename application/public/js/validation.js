/** Verification Helper Functions */

/**
 * verifies whether username starts with a character [a-zA-A],
 * has a length greater than and equal to 3, 
 * & if the rest of username only contains alphanumeric character 
 * 
 * @param {string} username
 * @returns whether password starts with letter, length >= 3 and only contains alphanumeric character 
 */
function verifyUsername(username) {
    // Checks if username starts with letter 
    if (!(/^[a-zA-Z]/.test(username))) {
        return false;
    }

    // if username length is than 3, return false
    if (username.length < 3) {
        return false;
    }

    return /^[a-zA-Z0-9]+$/.test(username);
}

/**
 * Checks length of input username
 * 
 * @param {string} username 
 * @returns 
 */
function verifyUsernameLength(username) {
    return username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
}

/**
 * Gets if username starts with a character
 * 
 * @param {string} username  input username 
 * @returns  true if starts with a character, false if it does not
 */
function verifyUsernameStartChar(username) {
    return /^[a-zA-Z]/.test(username);
}

/**
 * Verifies that password is correct
 * 
 * @param {string} password 
 * @returns 
 */
function verifyPassword(password) {
    if (password.length < 8) {
        return false;
    }

    let tempPass = password.toLowerCase();
    if (tempPass === password) {
        return false;
    }

    return /[*-+!@#$^&]/g.test(password) && /[0-9]/g.test(password);
}

/**
 * Gets whether the password length is greater than or equal to 8
 * 
 * @param {string} password   input password 
 * @returns true if greater or equal to 8, else returns false 
 */
function verifyPasswordLength(password) {
    return password.length >= 8;
}

/**
 * checks if password contains at least 1 upper case letter
 * 
 * @param {string} password current input password
 * @returns true if password contains an upper case letter, false if it does not 
 */
function passwordContainsUpperCase(password) { 
    
    return /[A-Z]/.test(password);
}

/**
 * Gets whether the input password contains a special character
 * 
 * @param {string} password 
 * @returns true if password contains a special character, else returns false
 */
function passwordContainsSpecialsChar(password) {
    return /[*-+!@#$^&]/g.test(password);
}

/**
 * Gets whether the input password contains a number
 * 
 * @param {string} password 
 * @returns true if password contains a number, else false
 */
function passwordContainsNumber(password) {
    return /[0-9]/g.test(password)
}

/**
 * Gets if password and confirm-password inputs are equal
 * 
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns true if identical, false if not identical
 */
function isMatching(password, confirmPassword) {
    return password === confirmPassword;
}

/**
 * checks whether the username, password and confirmpassword input
 * is correct for registration form
 * 
 * @returns true if registration input was correct, else false
 */
function registerSubmitValidation() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (username === null || password === null || confirmPassword === null) {
        return;
    }

    if (!verifyUsername(username)) {
        return false;
    }
    else if (!verifyPassword(password)) {
        return false;
    }
    else if (!isMatching(password, confirmPassword)) {
        return false;
    }

    return true;
}

const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener("submit", (e)=> {
        if (!registerSubmitValidation()) {
            e.preventDefault(); 
        }
    });
}

/** Register Page - Dispaly username requirements */
var usernameInput = document.getElementById('username');

const requirement1 = document.createElement("p");
var text1 = document.createTextNode("Username Begins with a character");

const requirement2 = document.createElement("p");
var text2 = document.createTextNode("Username has at least 3 alphanumeric characters");

/**
 * Displays password requirements to register form 
 */
function displayUsernameRequirements() {    
    requirement2.appendChild(text2);
    requirement2.style.marginLeft = "12%";
    usernameInput.insertAdjacentElement("afterend", requirement2);

    requirement1.appendChild(text1);
    requirement1.style.marginLeft = "12%"; 
    usernameInput.insertAdjacentElement("afterend", requirement1);   

    let username = document.getElementById('username').value;
    checkUsernameRequirements(username);
}

/**
 * Changes username requirement lists' color if requirement is met
 * GREEN if met
 * RED   if not met
 * 
 * @param {string} username username currently inside text input 
 */
function checkUsernameRequirements(username) {
    if (verifyUsernameStartChar(username)) {
        requirement1.style.color = "green";
    }
    else {
        requirement1.style.color = "red";
    }

    if (verifyUsernameLength(username)) {
        requirement2.style.color = "green";
    }
    else {
        requirement2.style.color = "red";
    }
}

/**
 * Stops displaying username requirements on registration form
 */
function removeUsernameRequirements() {
    if (text1 && text2) {
        text1.remove();
        text2.remove();
    }
}

if (usernameInput) {
    usernameInput.addEventListener("focusin", (e) => {
        displayUsernameRequirements();
    });
    usernameInput.addEventListener("focusout", (e) => {
        removeUsernameRequirements();
    });

    usernameInput.addEventListener("input", (e) => { 
        let username = document.getElementById('username').value;
        checkUsernameRequirements(username);
    });
}

/** Register Page - Password Verification */

/**
 * Checks input password
 * if password fits a requirement, then that requirement's text is changed to green
 * 
 * @param {string} password  input password
 */
function checkPasswordRequirements(password) {
    // checks if password length is greater than 8
    if (verifyPasswordLength(password)) {
        passRequirement1.style.color = "green";
    } 
    else {
        passRequirement1.style.color = "red";
    }

    // checks if password contains at least 1 uppcase letter
    if (passwordContainsUpperCase(password)) {
        passRequirement2.style.color = "green";
    }
    else {
        passRequirement2.style.color = "red";
    }

    // checks if password contains at least 1 special character
    if (passwordContainsSpecialsChar(password)) {
        passRequirement3.style.color = "green";
    } 
    else {
        passRequirement3.style.color = "red";
    }

    // checks if password contains at least 1 number
    if (passwordContainsNumber(password)) {
        passRequirement4.style.color = "green";
    }
    else {
        passRequirement4.style.color = "red";
    }
}

/**
 * Removes new password requirement from registration form
 */
function removePasswordRequirements() {
    if (passRequirement1 && passRequirement2 && passRequirement3 && passRequirement4) {
        passRequirement1.remove();
        passRequirement2.remove();
        passRequirement3.remove();
        passRequirement4.remove();
    }
}

const passwordInput = document.getElementById('password');

const passRequirement1 = document.createElement('p');
var passText1 = document.createTextNode("Password contains 8 or more characters");

const passRequirement2 = document.createElement('p');
var passText2 = document.createTextNode("Password contains at least 1 upper case letter");

const passRequirement3 = document.createElement('p');
var passText3 = document.createTextNode("Password contains at least 1 special character [*-+!@#$^&]");

const passRequirement4 = document.createElement('p');
var passText4 = document.createTextNode("Password contains at least 1 number");

/**
 * Displays password requirements in register form
 */
function displayPasswordRequirements() {
    passRequirement4.appendChild(passText4);
    passRequirement4.style.marginLeft = "12%";
    passwordInput.insertAdjacentElement("afterend", passRequirement4);

    passRequirement3.appendChild(passText3);
    passRequirement3.style.marginLeft = "12%";
    passwordInput.insertAdjacentElement("afterend", passRequirement3);

    passRequirement2.appendChild(passText2);
    passRequirement2.style.marginLeft = "12%";
    passwordInput.insertAdjacentElement("afterend", passRequirement2);

    passRequirement1.appendChild(passText1);
    passRequirement1.style.marginLeft = "12%";
    passwordInput.insertAdjacentElement("afterend", passRequirement1);   

    let password = document.getElementById('password').value;
    checkPasswordRequirements(password);
}

if (passwordInput) {
    passwordInput.addEventListener("focusin", (e)=> {
        displayPasswordRequirements();
    });
    passwordInput.addEventListener("focusout", (e) => {
        removePasswordRequirements();
    });

    passwordInput.addEventListener("input", (e) =>  {
        let password = document.getElementById('password').value;
        checkPasswordRequirements(password);
    });
}

/** Register Page - Confirm password */
const confirmPassInput = document.getElementById('confirm-password');

const confirmPassRequirement = document.createElement('p');
var confirmText = document.createTextNode("Password and Confirm Password match");

/**
 * Removes confirm password requirement from registration form
 */
function removeConfirmPassRequirement() {
    if (confirmText) {
        confirmText.remove();
    }
}

/**
 * Checks if Password and Confirm-Password match
 * Style GREEN if True
 * Style RED   if False
 * 
 * @param {string} password 
 * @param {string} confirmPassword 
 */
function checkConfirmPassRequirement(password, confirmPassword) {
    if (isMatching(password, confirmPassword)) {
        confirmPassRequirement.style.color = "green";
    }
    else {
        confirmPassRequirement.style.color = "red";
    }
}

/**
 * Displays Confirm Password Input Requirement
 */
function displayConfirmPassRequirement() {
    confirmPassRequirement.appendChild(confirmText);
    confirmPassRequirement.style.marginLeft = "12%";
    confirmPassInput.insertAdjacentElement("afterend", confirmPassRequirement);   

    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    checkConfirmPassRequirement(password, confirmPassword);
}

if (confirmPassInput) {
    confirmPassInput.addEventListener("focusin", (e)=> {
        displayConfirmPassRequirement();
    });
    confirmPassInput.addEventListener("focusout", (e) => {
        removeConfirmPassRequirement();
    });

    confirmPassInput.addEventListener("input", (e) =>  {
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        checkConfirmPassRequirement(password, confirmPassword);
    });
}