// import router from '/Assets/js/router.js';

// // Keep the existing loader visible and hide content
// function initializeAuthCheck() {
//     // Hide the main content immediately
//     const appContainer = document.querySelector('.app');
//     if (appContainer) {
//         appContainer.style.visibility = 'hidden';
//         appContainer.style.opacity = '0';
//     }
    
//     // Ensure loader stays visible
//     const loader = document.querySelector('.loader')
//     if (loader) {
//         loader.style.display = 'flex';
    
// }
//     console.log('Authentication check started...');
// }

// function showContent() {
//     const loader = document.querySelector('.loader');
//     const appContainer = document.querySelector('.app');
//     // alert(loader);
//     if (loader) {
//         // Keep loader visible for 2 seconds before showing content
//         loader.style.display = 'none';
//     } 
//     if (appContainer) { 
//         appContainer.style.visibility = 'visible'; 
//         appContainer.style.opacity = '1'; 
//     }
// }


// function redirectToLogin() {
//     console.log('Redirecting to login...');
//     window.location.href = '/';
// }

// function redirectToForbidden() {
//     console.log('Access denied, redirecting...');
//     window.location.href = '/403.html';
// }

// // Initialize authentication check
// initializeAuthCheck();

// // Start the authentication process
// router.init().then(hasAccess => {
//     if (hasAccess) {
//         showContent();
//         initializePage();
//     } else {
//         // Access denied - redirect appropriately
//         if (router.getIsAuthenticated()) {
//             redirectToForbidden();
//         } else {
//             redirectToLogin();
//         }
//     }
// }).catch(error => {
//     console.error('Router initialization failed:', error);
//     // On error, redirect to login as fallback
//     if (!window.location.pathname.includes('/')) {
//         window.location.href = "/"
//     } else {
//         // If we're already on login page, show content
//         showContent();
//     }
// });

// function initializePage() {
//     console.log('Page initialized for:', window.location.pathname);
//     updateUIForUserRole();
//     initializePageSpecificFeatures();
// }

// function updateUIForUserRole() {
//     const user = router.getUser();
//     const roles = router.getRoles();
    
//     // Update user info in the header
//     const userProfileElements = document.querySelectorAll('.user-profile .text-white, .user-name');
//     userProfileElements.forEach(el => {
//         if (user && user.name) {
//             el.textContent = user.name;
//         }
//     });
    
//     const userEmailElements = document.querySelectorAll('.user-profile .text-white small');
//     userEmailElements.forEach(el => {
//         if (user && user.email) {
//             el.textContent = user.email;
//         }
//     });
    
//     // Show/hide menu items based on role
//     if (!router.hasRole(['admin', 'hr manager'])) {
//         // Hide admin-specific menu items
//         const adminMenuItems = document.querySelectorAll('.nav-item a[href*="users.html"], .nav-item a[href*="settings.html"]');
//         adminMenuItems.forEach(item => {
//             item.closest('.nav-item').style.display = 'none';
//         });
//     }
    
//     // Update user avatar if available
//     if (user && user.avatar) {
//         const avatar = document.querySelector('.user-profile img');
//         if (avatar) {
//             avatar.src = user.avatar;
//         }
//     }
// }

// function initializePageSpecificFeatures() {
//     const currentPath = window.location.pathname;
    
//     // Initialize features based on current page
//     switch(currentPath) {
//         case '/dashboard/data-encoder/personal_info.html':
//             initializePersonalInfoPage();
//             break;
//             case '/dashboard/users.html':
//                 if (router.hasRole(['admin', 'hr manager'])) {
//                     initializeUsersPage();
//                 }
//                 break;
//                 // Add more page-specific initializations as needed
//             case '/dashboard/data-encoder/employee.html':
//                 initializeEmployeePage();
//             case '/dashboard/data-encoder/index.html':
//                 initializeEncoderDashboard();
//             }


//         }
        
// function initializePersonalInfoPage() {
//     const permissions = router.getPermissions();
//     const pContainer = document.getElementById('p-container');
//     const pLink = document.getElementById('p-link')
    
//     if(!permissions.includes('create employees')){
//         pContainer.style.display = "none";
//         pLink.style.display = "none";
//     }
//     console.log('Permissions:', permissions); // Debug log
//     console.log('Form display set to none:', !permissions.includes('create_employees'));
//     console.log('Initializing personal info page...');
// }
// function initializeEmployeePage(){
//     const permissions = router.getPermissions();
//     const pLink = document.getElementById('p-link');
//     const pEdit = document.getElementsByClassName('p-edit');
//     const pDelete = document.getElementsByClassName('p-delete');
//     if(!permissions.includes('create employees')){
//         pLink.style.display = "none";
//     }
//     if(!permissions.includes('update employees')){
//         const elements = Object.keys(pEdit).map((key) => [key, pEdit[key]]);
//         elements.forEach(e => {
//             (e[1].style.display = "none");
//         });
//     }
//     if(!permissions.includes('delete employees')){
//         const elements = Object.keys(pDelete).map((key) => [key, pDelete[key]]);
//         elements.forEach(e => {
//             (e[1].style.display = "none");
//         });
//     }
// }
// function initializeEncoderDashboard(){
//     const permissions = router.getPermissions();
//     const pLink = document.getElementById('p-link')
//     if(!permissions.includes('create employees')){
//         pLink.style.display = "none";
//     }
// }

// function initializeUsersPage() {
//     console.log('Initializing users page...');
//     // Add your users page specific JavaScript here
// }

// // Add logout handler



// export { router };




// auth.js
import router from '/Assets/js/router.js';

// Keep the existing loader visible and hide content
function initializeAuthCheck() {
    // Hide the main content immediately
    const appContainer = document.querySelector('.app');
    if (appContainer) {
        appContainer.style.visibility = 'hidden';
        appContainer.style.opacity = '0';
    }
    
    // Ensure loader stays visible
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'flex';
    }
    
    console.log('Authentication check started...');
}

function showContent() {
    const loader = document.querySelector('.loader');
    const appContainer = document.querySelector('.app');
    
    if (loader) {
        loader.style.display = 'none';
    } 
    if (appContainer) { 
        appContainer.style.visibility = 'visible'; 
        appContainer.style.opacity = '1'; 
    }
}

function redirectToLogin() {
    console.log('Redirecting to login...');
    window.location.href = '/';
}

function redirectToForbidden() {
    console.log('Access denied, redirecting...');
    window.location.href = '/403.html';
}

// Initialize authentication check
initializeAuthCheck();

// Start the authentication process
router.init().then(hasAccess => {
    if (hasAccess) {
        showContent();
        initializePage();
    } else {
        // Access denied - redirect appropriately
        if (router.getIsAuthenticated()) {
            redirectToForbidden();
        } else {
            redirectToLogin();
        }
    }
}).catch(error => {
    console.error('Router initialization failed:', error);
    // On error, redirect to login as fallback
    if (!window.location.pathname.includes('/')) {
        window.location.href = "/";
    } else {
        // If we're already on login page, show content
        showContent();
    }
});

function initializePage() {
    console.log('Page initialized for:', window.location.pathname);
    updateUIForUserRole();
    initializePageSpecificFeatures();
}

function updateUIForUserRole() {
    const user = router.getUser();
    const roles = router.getRoles();
    const permissions = router.getPermissions();
    
    // Update user info in the header
    const userProfileElements = document.querySelectorAll('.user-profile .text-white, .user-name');
    userProfileElements.forEach(el => {
        if (user && user.name) {
            el.textContent = user.name;
        }
    });
    
    const userEmailElements = document.querySelectorAll('.user-profile .text-white small');
    userEmailElements.forEach(el => {
        if (user && user.email) {
            el.textContent = user.email;
        }
    });
    
    // Show/hide menu items based on permissions
    if (!router.hasPermission('manage_users')) {
        const userMenuItems = document.querySelectorAll('.nav-item a[href*="users.html"]');
        userMenuItems.forEach(item => {
            item.closest('.nav-item').style.display = 'none';
        });
    }
    
    if (!router.hasPermission('system_configuration')) {
        const settingsMenuItems = document.querySelectorAll('.nav-item a[href*="settings.html"]');
        settingsMenuItems.forEach(item => {
            item.closest('.nav-item').style.display = 'none';
        });
    }
    
    if (!router.hasPermission('view_reports')) {
        const reportsMenuItems = document.querySelectorAll('.nav-item a[href*="reports.html"]');
        reportsMenuItems.forEach(item => {
            item.closest('.nav-item').style.display = 'none';
        });
    }
    
    // Update user avatar if available
    if (user && user.avatar) {
        const avatar = document.querySelector('.user-profile img');
        if (avatar) {
            avatar.src = user.avatar;
        }
    }
}

function initializePageSpecificFeatures() {
    const currentPath = window.location.pathname;
    
    // Initialize features based on current page
    switch(currentPath) {
        case '/dashboard/data-encoder/personal_info.html':
            initializePersonalInfoPage();
            break;
        case '/dashboard/users.html':
            if (router.hasPermission('manage_users')) {
                initializeUsersPage();
            }
            break;
        case '/dashboard/data-encoder/employee.html':
            initializeEmployeePage();
            break;
        case '/dashboard/data-encoder/index.html':
            initializeEncoderDashboard();
            break;
    }
}

function initializePersonalInfoPage() {
    const permissions = router.getPermissions();
    const pContainer = document.getElementById('p-container');
    const pLink = document.getElementById('p-link');
    
    if (!permissions.includes('create employees')) {
        if (pContainer) pContainer.style.display = "none";
        if (pLink) pLink.style.display = "none";
    }
    
    console.log('Personal Info Page Permissions:', permissions);
    console.log('Create employees permission:', permissions.includes('create employees'));
}

function initializeEmployeePage() {
    const permissions = router.getPermissions();
    const pLink = document.getElementById('p-link');
    
    // Hide create button if no permission
    if (!permissions.includes('create employees') && pLink) {
        pLink.style.display = "none";
    }
    
    // Use MutationObserver to handle dynamically loaded edit/delete buttons
    if (!permissions.includes('update employees') || !permissions.includes('delete employees') || !permissions.includes('update employee records')) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    // Check for edit buttons
                    if (!permissions.includes('update employees')) {
                        const editButtons = document.querySelectorAll('.p-edit');
                        editButtons.forEach(button => {
                            button.style.display = "none";
                        });
                    }
                    
                    // Check for delete buttons
                    if (!permissions.includes('delete employees')) {
                        const deleteButtons = document.querySelectorAll('.p-delete');
                        deleteButtons.forEach(button => {
                            button.style.display = "none";
                        });
                    }
                    if (!permissions.includes('update employee records')) {
                        const deleteButtons = document.querySelectorAll('.r-edit');
                        deleteButtons.forEach(button => {
                            button.style.display = "none";
                        });
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Also check immediately in case buttons are already there
        setTimeout(() => {
            if (!permissions.includes('update employees')) {
                const editButtons = document.querySelectorAll('.p-edit');
                editButtons.forEach(button => {
                    button.style.display = "none";
                });
            }
            
            if (!permissions.includes('delete employees')) {
                const deleteButtons = document.querySelectorAll('.p-delete');
                deleteButtons.forEach(button => {
                    button.style.display = "none";
                });
            }
            if (!permissions.includes('update employee records')) {
                const deleteButtons = document.querySelectorAll('.r-edit');
                deleteButtons.forEach(button => {
                    button.style.display = "none";
                });
            }
        }, 100);
    }
}

function initializeEncoderDashboard() {
    const permissions = router.getPermissions();
    const pLink = document.getElementById('p-link');
    
    if (!permissions.includes('create employees') && pLink) {
        pLink.style.display = "none";
    }
}

function initializeUsersPage() {
    console.log('Initializing users page...');
    // Add your users page specific JavaScript here
}

// Export the router for use in other files
export { router };