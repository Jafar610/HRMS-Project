const API_BASE_URI = "http://human_resource_management_system.test/api/v1";

async function csrf() {
    try {
        let response = await fetch('http://human_resource_management_system.test/sanctum/csrf-cookie', {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

function getCsrfToken() {
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }
    return null;
}

async function apiRequest(endpoint, method = "GET", data = null, token = null,file=false) {
    const headers = {
        "Accept": "application/json",
    };
    if(!file) headers['Content-Type'] = "application/json"

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Add CSRF token for non-GET requests
    if (method !== 'GET') {
        const csrfToken = getCsrfToken(); // This should be the actual token string
        if (csrfToken) {
            headers['X-XSRF-TOKEN'] = csrfToken;
            console.log('Adding CSRF token to request');
        } else {
            console.warn('No CSRF token found for', method, 'request');
        }
    }

    const options = {
        method,
        headers,
        credentials: 'include',
    };

    if (data) {
        if(file){
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            
            options.body = formData;
            delete headers['Content-Type'];
        }else{
            options.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(`${API_BASE_URI}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw result;
        }
        return result;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export { apiRequest, csrf, getCsrfToken };