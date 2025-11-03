// // router.js
// import { apiRequest } from "/Assets/js/api/api.js";

// class Router {
//     constructor() {
//         this.routes = [];
//         this.currentUser = null;
//         this.isAuthenticated = false;
//         this.userPermissions = [];
//         this.userRoles = ['guest']; // Default role
//     }

//     // Define routes with roles and optional middleware
//     addRoute(path, roles = ['guest'], middleware = null) {
//         this.routes.push({
//             path,
//             roles: Array.isArray(roles) ? roles : [roles],
//             middleware
//         });
//     }

//     // Check if user has required role
//     hasRole(requiredRoles) {
//         if (!Array.isArray(requiredRoles)) {
//             requiredRoles = [requiredRoles];
//         }
        
//         // If any of user's roles match required roles
//         return this.userRoles.some(userRole => 
//             requiredRoles.includes(userRole)
//         );
//     }

//     // Check if path matches a route (supports parameters)
//     matchesRoute(currentPath, routePath) {
//         if (routePath === '*') return true;
//         if (routePath === currentPath) return true;
        
//         // Convert route path to regex for parameter matching
//         const routeRegex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$');
//         return routeRegex.test(currentPath);
//     }

//     // Get current route based on path
//     getCurrentRoute(path = window.location.pathname) {
//         return this.routes.find(route => this.matchesRoute(path, route.path));
//     }

//     // Check access for current path
//     canAccess(path = window.location.pathname) {
//         const route = this.getCurrentRoute(path);
        
//         if (!route) {
//             console.warn(`No route defined for: ${path}`);
//             return false;
//         }

//         return this.hasRole(route.roles);
//     }

//     // Initialize router and check authentication
//     async init() {
//         try {
//             // Try to get current user
//             const response = await apiRequest('/user', 'GET');
//             this.currentUser = response.data;
//             this.isAuthenticated = true;
//             this.userPermissions = response.data.permissions;
//             this.userRoles = response.data.roles || ['guest'];
            
//             console.log('User authenticated:', this.currentUser);
//             console.log('User roles:', this.userRoles);
//         } catch (error) {
//             // Not authenticated
//             this.currentUser = null;
//             this.isAuthenticated = false;
//             this.userRoles = ['guest'];
//             console.log('User not authenticated, defaulting to guest');
//         }

//         return this.checkAccess();
//     }

//     // Main access control function
//     async checkAccess() {
//         const currentPath = window.location.pathname;
//         const route = this.getCurrentRoute(currentPath);

//         if (!route) {
//             console.error(`No route defined for: ${currentPath}`);
//             this.redirectTo('/404.html');
//             return false;
//         }

//         // Check role-based access
//         if (!this.hasRole(route.roles)) {
//             console.warn(`Access denied for ${currentPath}. Required roles: ${route.roles.join(', ')}, User roles: ${this.userRoles.join(', ')}`);
            
//             if (this.isAuthenticated) {
//                 this.redirectTo('/403.html'); // Forbidden
//             } else {
//                 this.redirectTo('/'); // Not authenticated
//             }
//             return false;
//         }

//         // Run route-specific middleware if exists
//         if (route.middleware) {
//             const middlewareResult = await route.middleware(this.currentUser);
//             if (!middlewareResult) {
//                 this.redirectTo('/403.html');
//                 return false;
//             }
//         }

//         console.log(`Access granted to ${currentPath}`);
//         return true;
//     }

//     redirectTo(path) {
//         if (window.location.pathname !== path) {
//             window.location.href = path;
//         }
//     }

//     // Navigation helper
//     navigateTo(path) {
//         if (this.canAccess(path)) {
//             window.location.href = path;
//         } else {
//             console.warn(`Cannot navigate to ${path} - access denied`);
//         }
//     }

//     // Get user info
//     getUser() {
//         return this.currentUser;
//     }

//     // Check if user is authenticated
//     getIsAuthenticated() {
//         return this.isAuthenticated;
//     }

//     // Get user roles
//     getRoles() {
//         return this.userRoles;
//     }
//     getPermissions(){
//         return this.userPermissions;
//     }
// }

// // Create and configure router instance
// const router = new Router();

// // Define all routes with required roles
// router.addRoute('/', ['guest', 'admin', 'data encoder', 'hr manager', 'employee']);
// router.addRoute('/login.html', ['guest']);
// router.addRoute('/reset-password.html', ['guest']);
// router.addRoute('/forget-password.html', ['guest']);

// // Dashboard routes with different access levels
// router.addRoute('/dashboard/', ['admin', 'hr manager', 'data encoder', 'employee']);
// router.addRoute('/dashboard/data-encoder/index.html',['data encoder']);
// router.addRoute('/dashboard/data-encoder/personal_info.html', ['data encoder']);
// router.addRoute('/dashboard/data-encoder/employee.html',['data encoder']);
// router.addRoute('/dashboard/data-encoder/index.html',['data encoder']);
// router.addRoute('/dashboard/users.html', ['admin', 'hr manager']);
// router.addRoute('/dashboard/settings.html', ['admin']);
// router.addRoute('/dashboard/reports.html', ['admin', 'hr manager']);

// // Admin only routes
// router.addRoute('/dashboard/admin/*', ['admin']);
// router.addRoute('/dashboard/admin/index.html',['admin']);
// router.addRoute('/dashboard/admin/user-account.html',['admin']);
// router.addRoute('/dashboard/data-encoder/*',['data-encoder']);
// // Error pages
// router.addRoute('/404.html', ['guest', 'admin', 'data encoder', 'hr manager', 'employee']);
// router.addRoute('/403.html', ['guest', 'admin', 'data encoder', 'hr manager', 'employee']);
// export default router;



// router.js
import { apiRequest } from "/Assets/js/api/api.js";

class Router {
    constructor() {
        this.routes = [];
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userPermissions = [];
        this.userRoles = ['guest']; // Default role
    }

    // Define routes with permissions and optional roles fallback
    addRoute(path, permissions = [], roles = ['guest']) {
        this.routes.push({
            path,
            permissions: Array.isArray(permissions) ? permissions : [permissions],
            roles: Array.isArray(roles) ? roles : [roles]
        });
    }

    // Check if user has required role
    hasRole(requiredRoles) {
        if (!Array.isArray(requiredRoles)) {
            requiredRoles = [requiredRoles];
        }
        
        return this.userRoles.some(userRole => 
            requiredRoles.includes(userRole)
        );
    }

    // Check if user has specific permission
    hasPermission(requiredPermission) {
        return this.userPermissions.includes(requiredPermission);
    }

    // Check if user has any of the required permissions
    hasAnyPermission(requiredPermissions) {
        if (!Array.isArray(requiredPermissions)) {
            requiredPermissions = [requiredPermissions];
        }
        return requiredPermissions.some(permission => 
            this.userPermissions.includes(permission)
        );
    }

    // Check if user has all required permissions
    hasAllPermissions(requiredPermissions) {
        if (!Array.isArray(requiredPermissions)) {
            requiredPermissions = [requiredPermissions];
        }
        return requiredPermissions.every(permission => 
            this.userPermissions.includes(permission)
        );
    }

    // Check if path matches a route (supports parameters)
    matchesRoute(currentPath, routePath) {
        if (routePath === '*') return true;
        if (routePath === currentPath) return true;
        
        // Convert route path to regex for parameter matching
        const routeRegex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$');
        return routeRegex.test(currentPath);
    }

    // Get current route based on path
    getCurrentRoute(path = window.location.pathname) {
        return this.routes.find(route => this.matchesRoute(path, route.path));
    }

    // Check access for current path
    canAccess(path = window.location.pathname) {
        const route = this.getCurrentRoute(path);
        
        if (!route) {
            console.warn(`No route defined for: ${path}`);
            return false;
        }

        // First check permissions if specified
        if (route.permissions && route.permissions.length > 0) {
            return this.hasAnyPermission(route.permissions);
        }
        
        // Fallback to role check
        return this.hasRole(route.roles);
    }

    // Initialize router and check authentication
    async init() {
        try {
            // Try to get current user
            const response = await apiRequest('/user', 'GET');
            
            this.currentUser = response.data;
            this.isAuthenticated = true;
            this.userPermissions = response.data.permissions || [];
            this.userRoles = response.data.roles || ['guest'];
            
            console.log('User authenticated:', this.currentUser);
            console.log('User roles:', this.userRoles);
            console.log('User permissions:', this.userPermissions);
        } catch (error) {
            // Not authenticated
            this.currentUser = null;
            this.isAuthenticated = false;
            this.userPermissions = [];
            this.userRoles = ['guest'];
            console.log('User not authenticated, defaulting to guest');
        }

        return this.checkAccess();
    }

    // Main access control function
    async checkAccess() {
        const currentPath = window.location.pathname;
        const route = this.getCurrentRoute(currentPath);

        if (!route) {
            console.error(`No route defined for: ${currentPath}`);
            this.redirectTo('/404.html');
            return false;
        }

        // Check permission-based access first
        if (route.permissions && route.permissions.length > 0) {
            if (!this.hasAnyPermission(route.permissions)) {
                console.warn(`Access denied for ${currentPath}. Required permissions: ${route.permissions.join(', ')}, User permissions: ${this.userPermissions.join(', ')}`);
                
                if (this.isAuthenticated) {
                    this.redirectTo('/403.html'); // Forbidden
                } else {
                    this.redirectTo('/'); // Not authenticated
                }
                return false;
            }
        } 
        // Fallback to role-based access
        else if (!this.hasRole(route.roles)) {
            console.warn(`Access denied for ${currentPath}. Required roles: ${route.roles.join(', ')}, User roles: ${this.userRoles.join(', ')}`);
            if (this.isAuthenticated) {
                this.redirectTo('/403.html'); // Forbidden
            } else {
                this.redirectTo('/'); // Not authenticated
            }
            return false;
        }

        console.log(`Access granted to ${currentPath}`);
        return true;
    }

    redirectTo(path) {
        if (window.location.pathname !== path) {
            window.location.href = path;
        }
    }

    // Navigation helper
    navigateTo(path) {
        if (this.canAccess(path)) {
            window.location.href = path;
        } else {
            console.warn(`Cannot navigate to ${path} - access denied`);
        }
    }

    // Get user info
    getUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    // Get user roles
    getRoles() {
        return this.userRoles;
    }

    // Get user permissions
    getPermissions() {
        return this.userPermissions;
    }
}

// Create and configure router instance
const router = new Router();

// Define all routes with required permissions
// Public routes
router.addRoute('/', [],['admin','data encoder']);
router.addRoute('/login.html', []);
router.addRoute('/reset-password.html', []);
router.addRoute('/forget-password.html', []);

// Dashboard routes with permission-based access
router.addRoute('/dashboard/', []);

// Employee management routes
router.addRoute('/dashboard/data-encoder/index.html', [],'data encoder');
router.addRoute('/dashboard/data-encoder/personal_info.html', ['view employees','create employees']);
router.addRoute('/dashboard/data-encoder/employee.html', ['view employees','view employee records']);

// Management routes
router.addRoute('/dashboard/users.html', ['manage users']);
router.addRoute('/dashboard/settings.html', ['system configuration']);
router.addRoute('/dashboard/reports.html', ['view reports']);

// Admin routes (keep role-based as fallback for admin-specific areas)
router.addRoute('/dashboard/admin/*', [], ['admin']);
router.addRoute('/dashboard/admin/index.html', [], ['admin']);
router.addRoute('/dashboard/admin/user-account.html', [], ['admin']);
router.addRoute('/dashboard/admin/role-management.html',[],['admin']);

// Data encoder specific routes
router.addRoute('/dashboard/data-encoder/*', ['view employees']);
router.addRoute('/dashboard/data-encoder/index.html',['view employees','view employee records'])

// Error pages (no permissions required)
router.addRoute('/404.html', []);
router.addRoute('/403.html', []);

export default router;