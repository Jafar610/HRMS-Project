import { forgetPassword, login,logout } from "./auth.js";
import {  validatePassword,passwordConfirmation} from "./validation.js";
import { apiRequest } from "./api.js";
document.getElementById("forgetPasswordForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
   
    const email = document.getElementById("email").value;
   const spinner = e.currentTarget.querySelector(".spinner-border");
    if (spinner) spinner.classList.remove("d-none");
    try {
        const res = await forgetPassword(email);
        showSuccess(" Email is sent! Check your inbox.");
        // alert("Reset link sent to your email!");
        console.log("API Response:", res);
    } catch (err) {
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('email').nextElementSibling.textContent = "could not send the email"
        console.log(err.message);
        showSuccess("could not send the email");
    }
    if (spinner) spinner.classList.add("d-none");
});

document.getElementById("loginForm")?.addEventListener("submit", async(e)=>{
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  let is_valid = true;
  
  is_valid = validatePassword(password);
  if(!is_valid){
    return
  }

  const spinner = e.currentTarget.querySelector('.spinner-border');
  
  
  if (spinner){
    spinner.classList.remove("d-none");
    // spinner.parentNode.disabled = true;
  } 
  login(username,password).then(res=>{
    console.log('suc');
    
    showSuccess("login successfull");
    const role = res.data.user.roles[0].replaceAll(" ", "-")
    if(res.data.user.first_time === "true"){
      window.location.href = '/changePassword.html';
    }else{
      window.location.href = `/dashboard/${role}/index.html`;
    }
    
  }).catch(error=>{
    console.log('fail');
    
    if (spinner) spinner.classList.add("d-none");
    // spinner.parentNode.disabled = false;
    document.getElementById("password").classList.add('is-invalid');
    document.getElementById("password").nextElementSibling.textContent= "wrong username or password"//['password'][0] 

  })
})

// Client-side validation for Reset Password form
    document.getElementById('resetPasswordForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = this;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;

    // Reset previous validation states
    form.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
    });

    // Validate password length
    isValid = validatePassword(password);
    
    isValid = passwordConfirmation(password,confirmPassword);
    
  
    if(!isValid){
        return;
    }
    

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const email = urlParams.get("email");

        const data = {
            token,
            email,
            password: password,
            password_confirmation: confirmPassword
        };
        
        apiRequest("/reset-password","POST",data)
        .then(function(res){

        alert("Password reset successfully!");
        form.reset();
        window.location.href = "/";
        })
        .catch(function(error){
           let er = JSON.parse(JSON.stringify(error));
    
           if(er?.errors?.password){
            document.getElementById("password").classList.add('is-invalid');
            document.getElementById("password").nextElementSibling.textContent= er['errors']['password'][0]
           }else{
            alert(er.message);
           }
        });
    }
);

   



function showSuccess(message) {
  const alertContainer = document.getElementById("alertContainer");
  const alert = document.createElement("div");
  alert.className = "alert alert-success alert-dismissible fade show";
  alert.role = "alert";
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  alertContainer.appendChild(alert);

  // Auto remove after 5 seconds
  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hide");
    setTimeout(() => alert.remove(), 500);
  }, 5000);
}

document.getElementById('logout').addEventListener('click',function(e){
  alert('logout');
  logout();
});
