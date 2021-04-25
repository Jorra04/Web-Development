const validateEntry = () => {
    let validEntry = true;
    let nameField = document.getElementById("name-field");
    let emailField = document.getElementById("email-field");
   

    if(nameField.value.length < 1) {
        nameField.style.borderColor = "red";
        validEntry = false;
    }
    if(!isValidEmail(emailField.value)) {
        emailField.style.borderColor = "red";
        validEntry = false;
    }

    return validEntry;
}


const isValidEmail = (email_address) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address)
}
