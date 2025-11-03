function validatePassword(password){
    if(password.length < 8){
        document.getElementById("password").classList.add('is-invalid');
        document.getElementById("password").nextElementSibling.textContent= "Password must be at least 8 characters long."
        return false
    }
    return true
}

function passwordConfirmation(password,confirmPassword){  
    if(password != confirmPassword){
        document.getElementById("confirmPassword").classList.add("is-invalid");
        document.getElementById("confirmPassword").nextElementSibling.textContent= "Passwords do not match."
        return false
        return false
    }
    return true
}

export {validatePassword,passwordConfirmation}