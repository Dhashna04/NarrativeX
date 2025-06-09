/**
 * Login and Registration Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const loginError = document.getElementById('login-error');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const signupPasswordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const passwordStrengthBar = document.querySelector('.progress-bar');
    const passwordStrengthText = document.getElementById('password-strength-text');
    
    // Initialize Bootstrap modal
    const signupModal = new bootstrap.Modal(document.getElementById('signup-modal'));
    
    // Show signup modal
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.show();
        });
    }
    
    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            eyeIcon.classList.toggle('bi-eye');
            eyeIcon.classList.toggle('bi-eye-slash');
        });
    }
    
    // Password strength meter
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update progress bar
            passwordStrengthBar.style.width = strength.score + '%';
            passwordStrengthBar.className = 'progress-bar';
            passwordStrengthBar.classList.add('bg-' + strength.class);
            
            // Update text
            passwordStrengthText.textContent = strength.text;
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Simple validation
            if (!email || !password) {
                showLoginError('Please enter both email and password.');
                return;
            }
            
            // Simulate login process
            simulateLogin(email, password, rememberMe);
        });
    }
    
    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            if (!termsAccepted) {
                alert('Please accept the Terms of Service and Privacy Policy.');
                return;
            }
            
            // Simulate registration process
            simulateRegistration(name, email, password);
        });
    }
    
    /**
     * Calculate password strength
     */
    function calculatePasswordStrength(password) {
        let score = 0;
        let text = 'Weak';
        let colorClass = 'danger';
        
        // Length check
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 10;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score += 15; // Uppercase
        if (/[a-z]/.test(password)) score += 15; // Lowercase
        if (/[0-9]/.test(password)) score += 15; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) score += 25; // Special characters
        
        // Determine text and color based on score
        if (score >= 80) {
            text = 'Very Strong';
            colorClass = 'success';
        } else if (score >= 60) {
            text = 'Strong';
            colorClass = 'success';
        } else if (score >= 40) {
            text = 'Medium';
            colorClass = 'warning';
        } else if (score >= 20) {
            text = 'Weak';
            colorClass = 'danger';
        } else {
            text = 'Very Weak';
            colorClass = 'danger';
        }
        
        return {
            score: score,
            text: text,
            class: colorClass
        };
    }
    
    /**
     * Show login error message
     */
    function showLoginError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 5000);
    }
    
    /**
     * Simulate login process
     */
    function simulateLogin(email, password, rememberMe) {
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...';
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, accept any login
            // In a real app, you would validate against a backend
            
            // Store user info if remember me is checked
            if (rememberMe) {
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_logged_in', 'true');
                localStorage.setItem('user_name', email.split('@')[0]); // Use part of email as name
            } else {
                sessionStorage.setItem('user_email', email);
                sessionStorage.setItem('user_logged_in', 'true');
                sessionStorage.setItem('user_name', email.split('@')[0]); // Use part of email as name
            }
            
            // Set a flag to indicate this is a fresh login
            sessionStorage.setItem('fresh_login', 'true');
            
            // Redirect to main page
            console.log('Login successful, redirecting to main page');
            window.location.href = 'index.html';
            
        }, 1500); // Simulate 1.5 second delay for API call
    }
    
    /**
     * Simulate registration process
     */
    function simulateRegistration(name, email, password) {
        // Show loading state
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, always succeed
            // In a real app, you would send this data to a backend
            
            // Store user info
            localStorage.setItem('user_name', name);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_logged_in', 'true');
            
            // Hide modal
            signupModal.hide();
            
            // Show success message
            alert('Account created successfully! You will now be redirected to the main page.');
            
            // Set a flag to indicate this is a fresh login
            sessionStorage.setItem('fresh_login', 'true');
            
            // Redirect to main page
            console.log('Registration successful, redirecting to main page');
            window.location.href = 'index.html';
            
        }, 2000); // Simulate 2 second delay for API call
    }
    
    /**
     * Check if user is already logged in
     */
    function checkLoggedInStatus() {
        const isLoggedIn = localStorage.getItem('user_logged_in') === 'true' || 
                          sessionStorage.getItem('user_logged_in') === 'true';
        
        if (isLoggedIn) {
            // Redirect to main page if already logged in
            window.location.href = 'index.html';
        }
    }
    
    // Check login status on page load
    checkLoggedInStatus();
});