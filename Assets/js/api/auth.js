import { apiRequest,csrf } from "./api.js";

async function login(username,password) {
        console.log('Getting CSRF token...');
        const csrfSuccess = await csrf();
        
        if (!csrfSuccess) {
                throw new Error('Failed to get CSRF token');
        }
        
        console.log('CSRF token obtained');
        
        await new Promise(resolve => setTimeout(resolve, 100));

        const res = await apiRequest("/login","POST",{username,password});
        console.log(res);
        return res;
}

async function forgetPassword(email) {

        const res = await apiRequest('/forget-password','POST',{email});

        return res;
    
}
async function resetPassword(data) {
    
    
}
function logout(){ 
        apiRequest("/logout","get")
        .then(function(res){
                console.log(res.message);  
                alert(res.message);
                console.log("logged out successfully");
                document.cookie = "";
                window.location.href="/";
        }).catch(function(error){
                alert(error);
                console.log(error);    
        })
}
export {login,forgetPassword,logout}