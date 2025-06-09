/**
 * Main entry point for the AI Story Generator application
 * Handles initial authentication check and redirection
 */

// Check if the user is logged in
const isLoggedIn = localStorage.getItem('user_logged_in') === 'true' || 
                  sessionStorage.getItem('user_logged_in') === 'true';

// Redirect to the appropriate page
if (!isLoggedIn) {
    // If not logged in, redirect to login page
    window.location.href = 'login.html';
} else {
    // If logged in, redirect to the main application
    window.location.href = 'index.html';
}